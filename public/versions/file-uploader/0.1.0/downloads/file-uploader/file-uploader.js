"use strict";
var SalyraFileUploader = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/file-uploader/src/vanilla/browser.ts
  var browser_exports = {};
  __export(browser_exports, {
    TransferError: () => TransferError,
    chunkedTransport: () => chunkedTransport,
    createUploader: () => createUploader,
    formatBytes: () => formatBytes,
    httpTransport: () => httpTransport,
    indexedDBPersistence: () => indexedDBPersistence,
    mountUploader: () => mountUploader,
    retryAfter: () => retryAfter,
    uploadActions: () => uploadActions
  });

  // packages/file-uploader/src/core/errors.ts
  var TransferError = class extends Error {
    constructor(message, code = "NETWORK", status, retryAfter2) {
      super(message);
      this.code = code;
      this.status = status;
      this.retryAfter = retryAfter2;
      this.name = "TransferError";
    }
  };
  var abortError = () => new DOMException("The operation was stopped", "AbortError");
  var isAbort = (error) => error instanceof Error && error.name === "AbortError";
  function errorValue(error) {
    return {
      message: error instanceof Error ? error.message : String(error),
      code: error instanceof TransferError ? error.code : "UNKNOWN",
      ...error instanceof TransferError && error.status ? { status: error.status } : {}
    };
  }
  function retryable(error) {
    return !isAbort(error) && error instanceof TransferError && (error.code === "NETWORK" || error.code === "TIMEOUT" || error.status === 408 || error.status === 429 || error.status !== void 0 && [500, 502, 503, 504].includes(error.status));
  }
  function retryAfter(value, now = Date.now()) {
    if (!value) return void 0;
    if (/^\d+$/.test(value)) return Number(value) * 1e3;
    const date = Date.parse(value);
    return Number.isFinite(date) ? Math.max(0, date - now) : void 0;
  }
  function delay(ms, signal) {
    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(abortError());
        return;
      }
      const timer = setTimeout(() => {
        signal.removeEventListener("abort", stop);
        resolve();
      }, ms);
      function stop() {
        clearTimeout(timer);
        signal.removeEventListener("abort", stop);
        reject(abortError());
      }
      signal.addEventListener("abort", stop, { once: true });
    });
  }
  var RequestPool = class {
    constructor(limit) {
      this.limit = limit;
      this.active = 0;
      this.waiters = [];
    }
    async run(signal, task) {
      signal.throwIfAborted();
      while (this.active >= this.limit) {
        await new Promise((resolve, reject) => {
          const ready = () => {
            signal.removeEventListener("abort", stop);
            resolve();
          };
          const stop = () => {
            this.waiters = this.waiters.filter((w) => w !== ready);
            reject(abortError());
          };
          this.waiters.push(ready);
          signal.addEventListener("abort", stop, { once: true });
        });
        signal.throwIfAborted();
      }
      this.active++;
      try {
        return await task();
      } finally {
        this.active--;
        this.waiters.shift()?.();
      }
    }
  };
  async function digest(blob) {
    const bytes = await blob.arrayBuffer();
    const hash = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(
      new Uint8Array(hash),
      (value) => value.toString(16).padStart(2, "0")
    ).join("");
  }

  // packages/file-uploader/src/core/store.ts
  var uid = () => crypto.randomUUID();
  var metadataOf = (file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  });
  function positive(name, value) {
    if (!Number.isSafeInteger(value) || value < 1)
      throw new RangeError(`${name} must be a positive integer`);
    return value;
  }
  function accepts(file, rule) {
    return !rule || rule.split(",").some((value) => {
      const token = value.trim().toLowerCase();
      return token === "*/*" || token === "*" ? true : token.startsWith(".") ? file.name.toLowerCase().endsWith(token) : token.endsWith("/*") ? file.type.toLowerCase().startsWith(token.slice(0, -1)) : file.type.toLowerCase() === token;
    });
  }
  function createUploader(options) {
    const transport = options.transport;
    for (const [name, value] of Object.entries({
      maxFileSize: options.maxFileSize,
      maxTotalSize: options.maxTotalSize,
      maxFiles: options.maxFiles,
      requestTimeout: options.requestTimeout,
      progressInterval: options.progressInterval,
      baseDelay: options.retry?.baseDelay,
      maxDelay: options.retry?.maxDelay
    })) {
      if (value !== void 0 && (!Number.isSafeInteger(value) || value < 0))
        throw new RangeError(`${name} must be a non-negative integer`);
    }
    const chunkSize = positive("chunkSize", options.chunkSize ?? 5 * 1024 * 1024);
    const maxFiles = positive(
      "maxConcurrentFiles",
      options.maxConcurrentFiles ?? 2
    );
    const maxChunks = positive(
      "maxConcurrentChunks",
      options.maxConcurrentChunks ?? 1
    );
    if (maxChunks > 1 && !transport.capabilities.parallelParts)
      throw new Error("The transport does not support parallel parts");
    const pool = new RequestPool(
      positive("maxConcurrentRequests", options.maxConcurrentRequests ?? 4)
    );
    const attempts = positive(
      "retry.maxAttempts",
      options.retry?.maxAttempts ?? 4
    );
    const interval = Math.max(0, options.progressInterval ?? 100);
    let state = {
      items: [],
      cleanups: [],
      disabled: options.disabled ?? false,
      readOnly: options.readOnly ?? false,
      restored: false
    };
    const listeners = /* @__PURE__ */ new Set(), itemListeners = /* @__PURE__ */ new Map();
    const runs = /* @__PURE__ */ new Map(), generations = /* @__PURE__ */ new Map(), validation = /* @__PURE__ */ new Map();
    const auxiliary = /* @__PURE__ */ new Set();
    let destroyed = false, active = 0, saveChain = Promise.resolve(), restoreTask;
    let idsSnapshot = "";
    function assertAlive() {
      if (destroyed) throw new Error("Uploader is destroyed");
    }
    const itemIndexes = /* @__PURE__ */ new Map();
    const getItem = (id) => {
      const index = itemIndexes.get(id);
      return index === void 0 ? void 0 : state.items[index];
    };
    const mutable = () => !state.disabled && !state.readOnly && !destroyed;
    function notify(id, collection2 = false) {
      if (destroyed) return;
      if (id) itemListeners.get(id)?.forEach((fn) => fn());
      listeners.forEach((fn) => fn());
    }
    function reportError(error, item) {
      try {
        if (!destroyed)
          void Promise.resolve(options.onError?.(error, item)).catch(() => {
          });
      } catch {
      }
    }
    function persist() {
      if (!options.persistence || destroyed || !state.restored) return;
      const adapter = options.persistence;
      const snapshot = {
        version: 1,
        items: state.items.map(
          ({ file, bytesPerSecond, etaSeconds, ...item }) => ({
            ...item,
            session: item.session && {
              id: item.session.id,
              chunkSize: item.session.chunkSize,
              expiresAt: item.session.expiresAt
            }
          })
        ),
        cleanups: state.cleanups.map((cleanup2) => ({
          ...cleanup2,
          session: cleanup2.session && {
            id: cleanup2.session.id,
            chunkSize: cleanup2.session.chunkSize,
            expiresAt: cleanup2.session.expiresAt
          }
        }))
      };
      saveChain = saveChain.then(() => adapter.save(snapshot)).catch((error) => {
        if (!destroyed) {
          state = { ...state, persistenceError: errorValue(error) };
          notify();
        }
      });
    }
    function patch(id, update, durable = false, visual = false) {
      const item = getItem(id);
      if (!item || destroyed) return;
      const updated = { ...item, ...update };
      const items = state.items.slice();
      items[itemIndexes.get(id)] = updated;
      state = { ...state, items };
      if (durable) persist();
      const run = runs.get(id);
      if (visual && run && Date.now() - run.lastNotice < interval) {
        run.noticeTimer ??= setTimeout(
          () => {
            run.noticeTimer = void 0;
            run.lastNotice = Date.now();
            notify(id);
          },
          interval - (Date.now() - run.lastNotice)
        );
      } else {
        if (run?.noticeTimer) {
          clearTimeout(run.noticeTimer);
          run.noticeTimer = void 0;
        }
        if (run) run.lastNotice = Date.now();
        notify(id);
      }
    }
    function collection(items) {
      itemIndexes.clear();
      items.forEach((item, index) => itemIndexes.set(item.id, index));
      state = { ...state, items };
      const ids = items.map((item) => item.id).join("|");
      if (ids !== idsSnapshot) {
        idsSnapshot = ids;
        notify(void 0, true);
      }
      persist();
    }
    const baseItem = (id, metadata, file) => ({
      id,
      requestKey: uid(),
      metadata,
      file,
      status: "idle",
      parts: [],
      uploadedBytes: 0,
      transferredBytes: 0,
      totalBytes: metadata.size,
      remainingBytes: metadata.size,
      progress: transport.capabilities.progress ? 0 : null,
      bytesPerSecond: null,
      etaSeconds: null,
      activeMilliseconds: 0,
      attempt: 0,
      nextRetryAt: null,
      removing: false
    });
    state = {
      ...state,
      items: Array.from(
        new Map(
          (options.initialFiles ?? []).map((item) => [
            item.id,
            {
              ...baseItem(item.id, item.metadata),
              status: "completed",
              result: item.result,
              uploadedBytes: item.metadata.size,
              transferredBytes: item.metadata.size,
              remainingBytes: 0,
              progress: 100
            }
          ])
        ).values()
      )
    };
    state.items.forEach((item, index) => itemIndexes.set(item.id, index));
    idsSnapshot = state.items.map((item) => item.id).join("|");
    function current(id, run) {
      return !destroyed && runs.get(id) === run && (generations.get(id) ?? 0) === run.generation && !run.controller.signal.aborted;
    }
    function context(item, signal) {
      return { signal, metadata: item.metadata, requestKey: item.requestKey };
    }
    async function request2(id, run, operation) {
      if (!current(id, run)) throw abortError();
      const item = getItem(id);
      return pool.run(run.controller.signal, async () => {
        const ctl = new AbortController();
        const stop2 = () => ctl.abort(run.controller.signal.reason);
        run.controller.signal.addEventListener("abort", stop2, { once: true });
        let timedOut = false;
        const timer = options.requestTimeout ? setTimeout(() => {
          timedOut = true;
          ctl.abort();
        }, options.requestTimeout) : void 0;
        try {
          const result = await operation(context(item, ctl.signal));
          if (!current(id, run)) throw abortError();
          return result;
        } catch (error) {
          if (timedOut && !run.controller.signal.aborted)
            throw new TransferError("Upload request timed out", "TIMEOUT");
          throw error;
        } finally {
          clearTimeout(timer);
          run.controller.signal.removeEventListener("abort", stop2);
        }
      });
    }
    async function retryOperation(id, run, status, operation, reconcile) {
      for (let attempt = 1; attempt <= attempts; attempt++) {
        if (!current(id, run)) throw abortError();
        patch(id, { status, attempt, nextRetryAt: null });
        try {
          return await operation();
        } catch (error) {
          if (!current(id, run) || isAbort(error)) throw error;
          if (reconcile && (options.retry?.shouldRetry ?? retryable)(error)) {
            const result = await reconcile();
            if (result.found) return result.value;
          }
          if (attempt >= attempts || !(options.retry?.shouldRetry ?? retryable)(error))
            throw error;
          const local = Math.min(
            options.retry?.maxDelay ?? 3e4,
            (options.retry?.baseDelay ?? 1e3) * 2 ** (attempt - 1)
          );
          const wait = Math.max(
            error instanceof TransferError ? error.retryAfter ?? 0 : 0,
            local * (options.retry?.jitter === false ? 1 : 0.5 + Math.random() * 0.5)
          );
          patch(id, {
            status: "retrying",
            bytesPerSecond: null,
            etaSeconds: null,
            error: errorValue(error),
            attempt,
            nextRetryAt: Date.now() + wait
          });
          await delay(wait, run.controller.signal);
        }
      }
      throw new Error("Retry exhausted");
    }
    function checkpoint(item, value) {
      if (!value || !Array.isArray(value.parts) || !["open", "finalizing", "completed", "canceled", "expired"].includes(
        value.status
      ))
        throw new TransferError(
          "Server returned an invalid checkpoint",
          "CHECKPOINT"
        );
      if (value.status === "expired")
        throw new TransferError("Upload session expired", "EXPIRED", 410);
      if (value.status === "canceled")
        throw new TransferError("Upload session was canceled", "CANCELED", 409);
      const size = item.session.chunkSize, count = Math.max(1, Math.ceil(item.totalBytes / size)), seen = /* @__PURE__ */ new Set();
      for (const part of value.parts) {
        if (!Number.isInteger(part.index) || part.index < 0 || part.index >= count || seen.has(part.index) || part.size !== Math.min(size, item.totalBytes - part.index * size) || !/^[a-f0-9]{64}$/.test(part.sha256))
          throw new TransferError(
            "Server returned an invalid checkpoint",
            "CHECKPOINT"
          );
        seen.add(part.index);
      }
      return value.parts.slice().sort((a, b) => a.index - b.index);
    }
    function scheduleMetrics(id, run) {
      const elapsed = Date.now() - run.lastMetrics;
      if (elapsed >= interval) metrics(id, run);
      else
        run.metricsTimer ??= setTimeout(() => {
          run.metricsTimer = void 0;
          metrics(id, run);
        }, interval - elapsed);
    }
    function metrics(id, run, parts) {
      clearTimeout(run.metricsTimer);
      run.metricsTimer = void 0;
      run.lastMetrics = Date.now();
      const item = getItem(id);
      if (!item || !current(id, run)) return;
      const receipts = parts ?? item.parts, durable = receipts.reduce((sum, part) => sum + part.size, 0), confirmed = new Set(receipts.map((p) => p.index));
      const transferred = Math.min(
        item.totalBytes,
        durable + [...run.inflight].reduce(
          (sum, [index, bytes]) => sum + (confirmed.has(index) ? 0 : bytes),
          0
        )
      );
      const now = Date.now();
      run.samples.push([now, transferred]);
      run.samples = run.samples.filter(([time]) => time >= now - 5e3);
      const oldest = run.samples[0], span = now - oldest[0];
      const speed = span >= 500 && transferred > oldest[1] ? (transferred - oldest[1]) / (span / 1e3) : null;
      patch(
        id,
        {
          parts: receipts,
          uploadedBytes: durable,
          transferredBytes: transferred,
          remainingBytes: Math.max(0, item.totalBytes - durable),
          progress: transport.capabilities.progress ? item.totalBytes ? transferred / item.totalBytes * 100 : 100 : null,
          bytesPerSecond: speed,
          etaSeconds: speed ? (item.totalBytes - transferred) / speed : null,
          activeMilliseconds: run.initialActive + now - run.started
        },
        !!parts,
        !parts
      );
    }
    async function probe(id, run) {
      const item = getItem(id);
      const value = await retryOperation(
        id,
        run,
        "verifying",
        () => request2(id, run, (ctx) => transport.probe(item.session, ctx))
      );
      metrics(id, run, checkpoint(item, value));
      return value;
    }
    async function execute(id, run) {
      let item = getItem(id);
      if (!item.session) {
        if (options.persistence) await saveChain;
        if (!current(id, run)) throw abortError();
        const session = await retryOperation(
          id,
          run,
          "uploading",
          () => request2(
            id,
            run,
            (ctx) => transport.create({
              ...ctx,
              chunkSize: transport.capabilities.resume ? chunkSize : Math.max(1, item.totalBytes)
            })
          )
        );
        if (typeof session?.id !== "string" || !session.id || !Number.isSafeInteger(session.chunkSize) || session.chunkSize < 1)
          throw new TransferError(
            "Server returned an invalid upload session",
            "SESSION"
          );
        patch(id, { session }, true);
        item = getItem(id);
      }
      if (!transport.capabilities.resume && item.parts.length) {
        run.inflight.clear();
        patch(
          id,
          {
            parts: [],
            uploadedBytes: 0,
            transferredBytes: 0,
            progress: transport.capabilities.progress ? 0 : null
          },
          true
        );
      }
      if (transport.capabilities.resume) {
        const remote = await probe(id, run);
        item = getItem(id);
        for (const part of item.parts) {
          run.controller.signal.throwIfAborted();
          const hash = await digest(
            item.file.slice(
              part.index * item.session.chunkSize,
              part.index * item.session.chunkSize + part.size
            )
          );
          if (hash !== part.sha256)
            throw new TransferError(
              "This file does not match the saved upload. Choose the original file or reset the transfer.",
              "FILE_MISMATCH"
            );
        }
        if (!current(id, run)) throw abortError();
        if (remote.status === "completed") {
          finish(id, run, remote.result);
          return;
        }
      }
      item = getItem(id);
      const size = item.session.chunkSize, count = Math.max(1, Math.ceil(item.totalBytes / size));
      const done = new Set(item.parts.map((p) => p.index));
      let cursor = 0;
      async function worker() {
        while (cursor < count) {
          const index = cursor++;
          if (done.has(index)) continue;
          if (!current(id, run)) throw abortError();
          const item2 = getItem(id), blob = item2.file.slice(
            index * size,
            Math.min(item2.totalBytes, (index + 1) * size)
          );
          const sha256 = transport.capabilities.checksums ? await digest(blob) : "";
          const receipt = await retryOperation(
            id,
            run,
            "uploading",
            () => request2(
              id,
              run,
              (ctx) => transport.upload(item2.session, {
                ...ctx,
                blob,
                index,
                sha256,
                onProgress(bytes) {
                  if (!current(id, run)) return;
                  run.inflight.set(
                    index,
                    Math.max(0, Math.min(blob.size, bytes))
                  );
                  scheduleMetrics(id, run);
                }
              })
            ),
            transport.capabilities.resume ? async () => {
              const remote = await probe(id, run);
              const receipt2 = remote.parts.find((p) => p.index === index);
              if (receipt2 && (receipt2.sha256 !== sha256 || receipt2.size !== blob.size))
                throw new TransferError(
                  "Saved chunk does not match this file",
                  "FILE_MISMATCH"
                );
              return { found: !!receipt2, value: receipt2 };
            } : void 0
          );
          if (receipt.index !== index || receipt.size !== blob.size || transport.capabilities.checksums && receipt.sha256 !== sha256)
            throw new TransferError(
              "Server returned an invalid part receipt",
              "CHECKPOINT"
            );
          run.inflight.delete(index);
          metrics(
            id,
            run,
            [
              ...getItem(id).parts.filter((p) => p.index !== index),
              receipt
            ].sort((a, b) => a.index - b.index)
          );
        }
      }
      const tasks = Array.from(
        { length: Math.min(maxChunks, count - done.size) },
        worker
      );
      try {
        await Promise.all(tasks);
      } catch (error) {
        run.controller.abort();
        await Promise.allSettled(tasks);
        throw error;
      }
      const result = await retryOperation(
        id,
        run,
        "finalizing",
        () => request2(
          id,
          run,
          (ctx) => transport.complete(getItem(id).session, ctx)
        ),
        transport.capabilities.resume ? async () => {
          const remote = await probe(id, run);
          return {
            found: remote.status === "completed",
            value: remote.result
          };
        } : void 0
      );
      finish(id, run, result);
    }
    function finish(id, run, result) {
      if (!current(id, run)) return;
      const item = getItem(id);
      patch(
        id,
        {
          status: "completed",
          result,
          progress: 100,
          uploadedBytes: item.totalBytes,
          transferredBytes: item.totalBytes,
          remainingBytes: 0,
          bytesPerSecond: null,
          etaSeconds: null,
          error: void 0,
          nextRetryAt: null
        },
        true
      );
      try {
        void Promise.resolve(options.onCompleted?.(getItem(id))).catch(
          (error) => reportError(errorValue(error), getItem(id))
        );
      } catch (error) {
        reportError(errorValue(error), getItem(id));
      }
    }
    function pump() {
      if (destroyed) return;
      while (active < maxFiles) {
        const item = state.items.find(
          (item2) => item2.status === "queued" && !runs.has(item2.id)
        );
        if (!item) return;
        const run = {
          generation: generations.get(item.id) ?? 0,
          controller: new AbortController(),
          started: Date.now(),
          initialActive: item.activeMilliseconds,
          inflight: /* @__PURE__ */ new Map(),
          samples: [],
          lastNotice: 0,
          lastMetrics: 0
        };
        runs.set(item.id, run);
        active++;
        const work = () => execute(item.id, run);
        const locks = typeof navigator !== "undefined" ? navigator.locks : void 0;
        const task = locks ? locks.request(
          `salyra-upload:${item.requestKey}`,
          { signal: run.controller.signal },
          work
        ) : work();
        void task.catch((error) => {
          if ((generations.get(item.id) ?? 0) !== run.generation || destroyed || isAbort(error))
            return;
          patch(
            item.id,
            {
              status: error instanceof TransferError && (error.code === "EXPIRED" || error.status === 410) ? "expired" : "failed",
              error: errorValue(error),
              nextRetryAt: null,
              bytesPerSecond: null,
              etaSeconds: null
            },
            true
          );
          reportError(errorValue(error), getItem(item.id));
        }).finally(() => {
          clearTimeout(run.noticeTimer);
          clearTimeout(run.metricsTimer);
          if (runs.get(item.id) === run) runs.delete(item.id);
          active--;
          pump();
        });
      }
    }
    function stop(id) {
      const run = runs.get(id);
      generations.set(id, (generations.get(id) ?? 0) + 1);
      validation.get(id)?.abort();
      validation.delete(id);
      if (run) {
        run.controller.abort();
        clearTimeout(run.noticeTimer);
        clearTimeout(run.metricsTimer);
        patch(id, {
          activeMilliseconds: run.initialActive + Date.now() - run.started,
          transferredBytes: getItem(id)?.uploadedBytes,
          progress: transport.capabilities.progress ? getItem(id).totalBytes ? getItem(id).uploadedBytes / getItem(id).totalBytes * 100 : 0 : null,
          bytesPerSecond: null,
          etaSeconds: null,
          nextRetryAt: null
        });
      }
    }
    async function cleanup(record) {
      const ctl = new AbortController();
      auxiliary.add(ctl);
      const timer = options.requestTimeout ? setTimeout(() => ctl.abort(), options.requestTimeout) : void 0;
      state = {
        ...state,
        cleanups: state.cleanups.map(
          (c) => c.id === record.id ? { ...c, status: "pending", error: void 0 } : c
        )
      };
      notify();
      persist();
      try {
        const handler = options.onCancel ?? transport.terminate?.bind(transport);
        if (!handler)
          throw new TransferError(
            "Configure onCancel or a transport with termination to clean up this session",
            "CLEANUP_UNSUPPORTED"
          );
        let session = record.session;
        if (!session) {
          session = await pool.run(
            ctl.signal,
            () => transport.create({
              signal: ctl.signal,
              metadata: record.metadata,
              requestKey: record.requestKey,
              chunkSize: record.chunkSize
            })
          );
          record = { ...record, session };
          state = {
            ...state,
            cleanups: state.cleanups.map(
              (c) => c.id === record.id ? record : c
            )
          };
          persist();
        }
        await pool.run(
          ctl.signal,
          () => handler(session, {
            signal: ctl.signal,
            metadata: record.metadata,
            requestKey: record.requestKey
          })
        );
        if (destroyed) return;
        state = {
          ...state,
          cleanups: state.cleanups.filter((c) => c.id !== record.id)
        };
      } catch (error) {
        if (destroyed) return;
        state = {
          ...state,
          cleanups: state.cleanups.map(
            (c) => c.id === record.id ? { ...c, status: "failed", error: errorValue(error) } : c
          )
        };
      } finally {
        clearTimeout(timer);
        auxiliary.delete(ctl);
        notify();
        persist();
      }
    }
    function scheduleCleanup(item) {
      if (!item.session && (!transport.capabilities.resume || ["idle", "validating", "awaiting-file"].includes(item.status)))
        return Promise.resolve();
      const record = {
        id: uid(),
        itemId: item.id,
        session: item.session,
        requestKey: item.requestKey,
        chunkSize,
        metadata: item.metadata,
        status: "pending"
      };
      state = { ...state, cleanups: [...state.cleanups, record] };
      persist();
      return cleanup(record);
    }
    const store = {
      getSnapshot: () => state,
      getItem,
      subscribe(fn) {
        listeners.add(fn);
        return () => listeners.delete(fn);
      },
      subscribeItem(id, fn) {
        let set = itemListeners.get(id);
        if (!set) itemListeners.set(id, set = /* @__PURE__ */ new Set());
        set.add(fn);
        return () => {
          set.delete(fn);
          if (!set.size) itemListeners.delete(id);
        };
      },
      async add(files) {
        assertAlive();
        if (options.persistence && !state.restored) await store.restore();
        if (!mutable()) return [];
        const ids = [];
        for (const file of files) {
          const id = uid(), item = {
            ...baseItem(id, metadataOf(file), file),
            status: "validating"
          };
          collection([...state.items, item]);
          ids.push(id);
          const ctl = new AbortController();
          validation.set(id, ctl);
          try {
            const fail = !accepts(file, options.accept) ? "File format is not accepted" : options.maxFileSize !== void 0 && file.size > options.maxFileSize ? "File exceeds the size limit" : options.maxFiles !== void 0 && state.items.filter((i) => i.status !== "failed").length > options.maxFiles ? "File count exceeds the limit" : options.maxTotalSize !== void 0 && state.items.filter((i) => i.status !== "failed").reduce((sum, i) => sum + i.totalBytes, 0) > options.maxTotalSize ? "Total file size exceeds the limit" : await options.validateFile?.(file, ctl.signal);
            ctl.signal.throwIfAborted();
            if (destroyed || !getItem(id)) continue;
            if (fail) throw new TransferError(fail, "VALIDATION");
            patch(id, { status: options.autoUpload ? "queued" : "idle" }, true);
            pump();
          } catch (error) {
            if (!isAbort(error) && !destroyed) {
              patch(id, { status: "failed", error: errorValue(error) }, true);
              reportError(errorValue(error), getItem(id));
            }
          } finally {
            validation.delete(id);
          }
        }
        return ids;
      },
      addExisting(items) {
        assertAlive();
        const seen = new Set(state.items.map((item) => item.id));
        const fresh = items.filter((item) => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        }).map((item) => ({
          ...baseItem(item.id, item.metadata),
          status: "completed",
          result: item.result,
          uploadedBytes: item.metadata.size,
          transferredBytes: item.metadata.size,
          remainingBytes: 0,
          progress: 100
        }));
        collection([...state.items, ...fresh]);
      },
      async loadHistory(cursor) {
        assertAlive();
        if (!options.loadHistory)
          throw new Error("Configure loadHistory to load remote records");
        const ctl = new AbortController();
        auxiliary.add(ctl);
        try {
          const page = await options.loadHistory(cursor, ctl.signal);
          if (!destroyed) store.addExisting(page.items);
          return page.nextCursor;
        } finally {
          auxiliary.delete(ctl);
        }
      },
      async restore() {
        assertAlive();
        if (restoreTask) return restoreTask;
        restoreTask = (async () => {
          try {
            const saved = options.persistence && await options.persistence.load();
            if (destroyed) return;
            if (saved) {
              if (saved.version !== 1 || !Array.isArray(saved.items) || !Array.isArray(saved.cleanups))
                throw new TransferError(
                  "Invalid persistence snapshot",
                  "PERSISTENCE"
                );
              const restored = saved.items.filter((item) => !getItem(item.id)).map((item) => ({
                ...item,
                file: void 0,
                status: item.status === "completed" || item.status === "canceled" ? item.status : "awaiting-file",
                bytesPerSecond: null,
                etaSeconds: null,
                nextRetryAt: null,
                removing: false
              }));
              state = {
                ...state,
                cleanups: [
                  ...state.cleanups,
                  ...saved.cleanups.map((c) => ({
                    ...c,
                    status: "failed"
                  }))
                ]
              };
              collection([...state.items, ...restored]);
            }
            state = { ...state, restored: true };
            notify();
            persist();
          } catch (error) {
            if (!destroyed) {
              state = {
                ...state,
                restored: true,
                persistenceError: errorValue(error)
              };
              notify();
            }
          }
        })();
        return restoreTask;
      },
      async attach(id, file) {
        assertAlive();
        if (!mutable()) return;
        const item = getItem(id);
        if (!item) throw new Error("Unknown upload");
        if (runs.has(id))
          throw new Error("Pause the transfer before replacing its file");
        if (file.name !== item.metadata.name || file.size !== item.totalBytes)
          throw new TransferError("Select the original file", "FILE_MISMATCH");
        patch(id, { file, status: "paused", error: void 0 }, true);
      },
      start(id) {
        assertAlive();
        if (!mutable()) return;
        for (const item of state.items)
          if ((!id || item.id === id) && item.file && ["idle", "paused", "failed", "awaiting-file"].includes(item.status) && (!runs.has(item.id) || runs.get(item.id).generation !== (generations.get(item.id) ?? 0)) && item.error?.code !== "VALIDATION")
            patch(item.id, { status: "queued", error: void 0 }, true);
        pump();
      },
      pause(id) {
        if (!mutable()) return;
        const item = getItem(id);
        if (!item || ![
          "uploading",
          "verifying",
          "retrying",
          "queued",
          "finalizing"
        ].includes(item.status))
          return;
        stop(id);
        patch(id, { status: "paused" }, true);
      },
      resume(id) {
        store.start(id);
      },
      retry(id) {
        store.start(id);
      },
      async cancel(id) {
        if (!mutable()) return;
        const item = getItem(id);
        if (!item || item.status === "completed") return;
        stop(id);
        patch(id, { status: "canceled" }, true);
        await scheduleCleanup(item);
      },
      async reset(id) {
        if (!mutable()) return;
        const item = getItem(id);
        if (!item || item.status === "completed") return;
        stop(id);
        patch(
          id,
          {
            ...baseItem(id, item.metadata, item.file),
            status: item.file ? "idle" : "awaiting-file"
          },
          true
        );
        await scheduleCleanup(item);
      },
      async remove(id) {
        if (!mutable()) return;
        const item = getItem(id);
        if (!item || item.removing || item.status !== "completed") return;
        if (!options.onRemove) {
          patch(id, {
            removeError: {
              code: "REMOVE_UNSUPPORTED",
              message: "Configure onRemove to delete a completed file"
            }
          });
          return;
        }
        const ctl = new AbortController();
        auxiliary.add(ctl);
        patch(id, { removing: true, removeError: void 0 });
        try {
          await options.onRemove(item, ctl.signal);
          if (!destroyed) {
            stop(id);
            collection(state.items.filter((current2) => current2.id !== id));
            itemListeners.get(id)?.forEach((fn) => fn());
          }
        } catch (error) {
          if (!destroyed)
            patch(id, { removing: false, removeError: errorValue(error) });
        } finally {
          auxiliary.delete(ctl);
        }
      },
      forget(id) {
        if (!mutable()) return;
        stop(id);
        collection(state.items.filter((item) => item.id !== id));
        itemListeners.get(id)?.forEach((fn) => fn());
      },
      async retryCleanup(id) {
        if (!mutable()) return;
        const record = state.cleanups.find((c) => c.id === id);
        if (record && record.status === "failed") await cleanup(record);
      },
      setOptions(next) {
        assertAlive();
        state = { ...state, ...next };
        notify();
      },
      destroy() {
        if (destroyed) return;
        for (const id of runs.keys()) stop(id);
        destroyed = true;
        validation.forEach((ctl) => ctl.abort());
        auxiliary.forEach((ctl) => ctl.abort());
        listeners.clear();
        itemListeners.clear();
      }
    };
    return store;
  }

  // packages/file-uploader/src/core/persistence.ts
  function indexedDBPersistence(namespace) {
    if (!namespace.trim()) throw new Error("A persistence namespace is required");
    async function db() {
      return new Promise((resolve, reject) => {
        const open = indexedDB.open("salyra-uploader", 1);
        open.onupgradeneeded = () => open.result.createObjectStore("sessions");
        open.onerror = () => reject(open.error);
        open.onsuccess = () => resolve(open.result);
      });
    }
    return {
      async load() {
        const database = await db();
        try {
          return await new Promise(
            (resolve, reject) => {
              const tx = database.transaction("sessions", "readonly");
              const req = tx.objectStore("sessions").get(namespace);
              req.onsuccess = () => resolve(req.result ?? null);
              req.onerror = () => reject(req.error);
            }
          );
        } finally {
          database.close();
        }
      },
      async save(value) {
        const database = await db();
        try {
          await new Promise((resolve, reject) => {
            const tx = database.transaction("sessions", "readwrite");
            tx.objectStore("sessions").put(value, namespace);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error);
          });
        } finally {
          database.close();
        }
      }
    };
  }

  // packages/file-uploader/src/core/index.ts
  function formatBytes(bytes, options = {}) {
    const base = options.base ?? 1024, units = base === 1024 ? ["B", "KiB", "MiB", "GiB", "TiB"] : ["B", "kB", "MB", "GB", "TB"];
    const exponent = bytes <= 0 ? 0 : Math.min(
      units.length - 1,
      Math.floor(Math.log(bytes) / Math.log(base))
    );
    return `${new Intl.NumberFormat(options.locale, { maximumFractionDigits: options.maximumFractionDigits ?? 1 }).format(bytes / base ** exponent)} ${units[exponent]}`;
  }
  function uploadActions(item) {
    return {
      canStart: !!item.file && ["idle", "paused", "failed", "awaiting-file"].includes(item.status) && item.error?.code !== "VALIDATION",
      canPause: [
        "queued",
        "verifying",
        "uploading",
        "retrying",
        "finalizing"
      ].includes(item.status),
      canResume: !!item.file && ["paused", "awaiting-file"].includes(item.status),
      canRetry: !!item.file && item.status === "failed" && item.error?.code !== "VALIDATION",
      canCancel: !["completed", "canceled"].includes(item.status),
      canReset: item.status !== "completed",
      canRemove: item.status === "completed" && !item.removing,
      canForget: true
    };
  }

  // packages/file-uploader/src/vanilla/index.ts
  function mountUploader(root, source, options = {}) {
    const owned = !("getSnapshot" in source), store = owned ? createUploader(source) : source;
    const disposers = [], rows = /* @__PURE__ */ new Map();
    const nativeDisabled = /* @__PURE__ */ new WeakMap();
    function listen(element, name, listener) {
      element.addEventListener(name, listener);
      disposers.push(() => element.removeEventListener(name, listener));
    }
    const local = (selector) => Array.from(root.querySelectorAll(selector)).filter(
      (element) => !element.parentElement?.closest("[data-upload-root]") || element.closest("[data-upload-root]") === root
    );
    root.dataset.uploadRoot = "";
    function itemBindings(element, id) {
      let url, file;
      const cleanups = [];
      const bind = (target, event, fn) => {
        target.addEventListener(event, fn);
        cleanups.push(() => target.removeEventListener(event, fn));
      };
      element.dataset.uploadId = id;
      element.querySelectorAll("[data-upload-action]").forEach(
        (button) => bind(button, "click", (event) => {
          if (event.defaultPrevented) return;
          const action = button.dataset.uploadAction;
          if (action && [
            "start",
            "pause",
            "resume",
            "retry",
            "cancel",
            "reset",
            "remove",
            "forget"
          ].includes(action))
            void store[action](id);
        })
      );
      const update2 = () => {
        const item = store.getItem(id);
        if (!item) return;
        element.dataset.state = item.status;
        element.querySelectorAll("[data-upload-name]").forEach(
          (el) => el.textContent = options.renderName?.(item) ?? item.metadata.name
        );
        element.querySelectorAll("[data-upload-metadata]").forEach(
          (el) => el.textContent = options.renderMetadata?.(item) ?? ""
        );
        element.querySelectorAll("[data-upload-status]").forEach(
          (el) => el.textContent = options.renderStatus?.(item) ?? item.status
        );
        element.querySelectorAll("[data-upload-progress]").forEach((el) => {
          el.setAttribute("role", "progressbar");
          el.setAttribute("aria-valuemin", "0");
          el.setAttribute("aria-valuemax", "100");
          if (item.progress === null) el.removeAttribute("aria-valuenow");
          else el.setAttribute("aria-valuenow", String(item.progress));
          options.renderProgress?.(el, item);
        });
        if (file !== item.file) {
          if (url) URL.revokeObjectURL(url);
          file = item.file;
          url = file ? URL.createObjectURL(file) : void 0;
        }
        element.querySelectorAll("[data-upload-preview]").forEach((el) => options.renderPreview?.(el, item, url));
      };
      update2();
      cleanups.push(store.subscribeItem(id, update2));
      return () => {
        cleanups.forEach((dispose) => dispose());
        if (url) URL.revokeObjectURL(url);
      };
    }
    local("[data-upload-input]").forEach((input) => {
      input.type = "file";
      listen(input, "change", (event) => {
        if (event.defaultPrevented) return;
        void store.add(Array.from(input.files ?? []));
        input.value = "";
      });
    });
    local("[data-upload-trigger]").forEach(
      (button) => listen(button, "click", (event) => {
        if (!event.defaultPrevented)
          local("[data-upload-input]").find((input) => !input.disabled)?.click();
      })
    );
    local("[data-upload-dropzone]").forEach((zone) => {
      const blocked = () => store.getSnapshot().disabled || store.getSnapshot().readOnly;
      listen(zone, "dragover", (event) => {
        if (!blocked() && !event.defaultPrevented) event.preventDefault();
      });
      listen(zone, "dragenter", (event) => {
        if (!blocked() && !event.defaultPrevented) zone.dataset.dragging = "true";
      });
      listen(zone, "dragleave", (event) => {
        if (!zone.contains(event.relatedTarget))
          delete zone.dataset.dragging;
      });
      listen(zone, "drop", (event) => {
        delete zone.dataset.dragging;
        if (event.defaultPrevented || blocked()) return;
        event.preventDefault();
        void store.add(
          Array.from(event.dataTransfer?.files ?? [])
        );
      });
    });
    local("[data-upload-start]").forEach(
      (button) => listen(button, "click", (event) => {
        if (!event.defaultPrevented) store.start();
      })
    );
    local("[data-upload-action]").filter((button) => !button.closest("[data-upload-id]")).forEach(
      (button) => listen(button, "click", (event) => {
        if (event.defaultPrevented) return;
        const action = button.dataset.uploadAction, id = button.dataset.uploadItemId;
        if (action === "start") store.start(id);
        else if (id && action && [
          "pause",
          "resume",
          "retry",
          "cancel",
          "reset",
          "remove",
          "forget"
        ].includes(action))
          void store[action](id);
      })
    );
    const update = () => {
      const snapshot = store.getSnapshot();
      root.dataset.disabled = String(snapshot.disabled);
      root.dataset.readonly = String(snapshot.readOnly);
      const ids = new Set(snapshot.items.map((item) => item.id));
      for (const [id, row] of rows)
        if (!ids.has(id)) {
          row.dispose();
          row.element.remove();
          rows.delete(id);
        }
      const list = local("[data-upload-list]")[0];
      if (list) {
        for (const item of snapshot.items)
          if (!rows.has(item.id)) {
            const existing = Array.from(list.children).find(
              (el) => el.dataset.uploadId === item.id
            );
            const element = existing ?? options.renderItem?.(item);
            if (element) {
              if (!existing) list.append(element);
              rows.set(item.id, {
                element,
                dispose: itemBindings(element, item.id)
              });
            }
          }
      }
      local(
        "[data-upload-input],[data-upload-trigger],[data-upload-start],[data-upload-action]"
      ).forEach((control) => {
        if (!nativeDisabled.has(control))
          nativeDisabled.set(control, control.disabled);
        control.disabled = nativeDisabled.get(control) || snapshot.disabled || snapshot.readOnly;
      });
      local("[data-upload-output]").forEach((element) => {
        if (options.renderOutput) options.renderOutput(element, snapshot);
        else
          element.textContent = JSON.stringify(
            snapshot.items.map(({ id, metadata, status, result }) => ({
              id,
              metadata,
              status,
              result
            })),
            null,
            2
          );
      });
      options.onSnapshot?.(snapshot);
    };
    update();
    disposers.push(store.subscribe(update));
    void store.restore();
    return {
      store,
      destroy() {
        disposers.splice(0).forEach((dispose) => dispose());
        for (const row of rows.values()) row.dispose();
        rows.clear();
        if (owned) store.destroy();
      }
    };
  }

  // packages/file-uploader/src/transport/request.ts
  async function request(endpoint, context, options, body, headers = {}, onProgress) {
    const url = typeof endpoint.url === "function" ? await endpoint.url(context) : endpoint.url;
    const authorization = typeof options.headers === "function" ? await options.headers(context) : options.headers;
    context.signal.throwIfAborted();
    const allHeaders = { ...authorization, ...headers };
    function decode(status, text2, retry) {
      let value2;
      try {
        value2 = text2 ? JSON.parse(text2) : null;
      } catch {
        value2 = text2;
      }
      if (status < 200 || status >= 300)
        throw new TransferError(
          typeof value2 === "object" && value2 && "message" in value2 ? String(value2.message) : `Upload request failed (${status})`,
          status === 410 ? "EXPIRED" : typeof value2 === "object" && value2 && "code" in value2 && typeof value2.code === "string" ? value2.code : "HTTP",
          status,
          retryAfter(retry)
        );
      return value2;
    }
    if (onProgress && typeof XMLHttpRequest !== "undefined" && !options.fetch) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const stop = () => xhr.abort();
        const clean = () => context.signal.removeEventListener("abort", stop);
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) onProgress(event.loaded);
        });
        xhr.open(endpoint.method ?? "GET", url);
        xhr.withCredentials = options.credentials === "include";
        for (const [key, value2] of Object.entries(allHeaders))
          xhr.setRequestHeader(key, value2);
        xhr.onload = () => {
          clean();
          try {
            resolve(
              decode(
                xhr.status,
                xhr.responseText,
                xhr.getResponseHeader("Retry-After")
              )
            );
          } catch (error) {
            reject(error);
          }
        };
        xhr.onerror = () => {
          clean();
          reject(
            new TransferError("Could not reach the upload server", "NETWORK")
          );
        };
        xhr.onabort = () => {
          clean();
          reject(new DOMException("Request stopped", "AbortError"));
        };
        context.signal.addEventListener("abort", stop, { once: true });
        if (context.signal.aborted) {
          clean();
          reject(new DOMException("Request stopped", "AbortError"));
          return;
        }
        xhr.send(body);
      });
    }
    let response;
    try {
      response = await (options.fetch ?? fetch)(url, {
        method: endpoint.method ?? "GET",
        body,
        headers: allHeaders,
        credentials: options.credentials,
        signal: context.signal
      });
    } catch (error) {
      if (context.signal.aborted) throw error;
      throw new TransferError("Could not reach the upload server", "NETWORK");
    }
    let text;
    try {
      text = await response.text();
    } catch (error) {
      if (context.signal.aborted) throw error;
      throw new TransferError("Upload response was interrupted", "NETWORK");
    }
    const value = decode(
      response.status,
      text,
      response.headers.get("Retry-After")
    );
    if (onProgress && body instanceof Blob) onProgress(body.size);
    return value;
  }

  // packages/file-uploader/src/transport/http.ts
  function httpTransport(options) {
    const results = /* @__PURE__ */ new WeakMap();
    return {
      capabilities: {
        resume: false,
        progress: options.progress ?? !options.fetch,
        parallelParts: false,
        checksums: false,
        terminate: false
      },
      async create(ctx) {
        return { id: ctx.requestKey, chunkSize: Math.max(1, ctx.metadata.size) };
      },
      async probe() {
        throw new Error("Single-request uploads do not support resume");
      },
      async upload(session, ctx) {
        let body = ctx.blob;
        if (options.formField) {
          body = new FormData();
          body.append(options.formField, ctx.blob, ctx.metadata.name);
        }
        const value = await request(
          { url: options.url, method: options.method ?? "POST" },
          { ...ctx, session },
          options,
          body,
          { "Idempotency-Key": ctx.requestKey },
          (bytes) => ctx.onProgress(Math.min(ctx.blob.size, bytes))
        );
        const parsed = options.parseResponse ? await options.parseResponse(value, ctx) : value;
        ctx.signal.throwIfAborted();
        results.set(session, parsed);
        return { index: 0, size: ctx.blob.size, sha256: "" };
      },
      async complete(session) {
        const value = results.get(session);
        results.delete(session);
        return value;
      }
    };
  }

  // packages/file-uploader/src/transport/chunked.ts
  function chunkedTransport(options) {
    const base = (options.baseURL ?? "/uploads").replace(/\/$/, "");
    const routes = {
      create: { url: base, method: "POST" },
      probe: {
        url: (ctx) => `${base}/${encodeURIComponent(ctx.session.id)}`,
        method: "GET"
      },
      upload: {
        url: (ctx) => `${base}/${encodeURIComponent(ctx.session.id)}/parts/${ctx.index}`,
        method: "PUT"
      },
      complete: {
        url: (ctx) => `${base}/${encodeURIComponent(ctx.session.id)}/complete`,
        method: "POST"
      },
      terminate: {
        url: (ctx) => `${base}/${encodeURIComponent(ctx.session.id)}`,
        method: "DELETE"
      },
      ...options.routes
    };
    return {
      capabilities: {
        resume: true,
        progress: true,
        parallelParts: true,
        checksums: true,
        terminate: true
      },
      async create(ctx) {
        return await request(
          routes.create,
          ctx,
          options,
          JSON.stringify({
            protocol: "salyra-upload/1",
            ...ctx.metadata,
            chunkSize: ctx.chunkSize
          }),
          {
            "Content-Type": "application/json",
            "Idempotency-Key": ctx.requestKey
          }
        );
      },
      async probe(session, ctx) {
        return await request(
          routes.probe,
          { ...ctx, session },
          options
        );
      },
      async upload(session, ctx) {
        return await request(
          routes.upload,
          { ...ctx, session },
          options,
          ctx.blob,
          {
            "Content-Type": "application/octet-stream",
            "Upload-Checksum": ctx.sha256
          },
          ctx.onProgress
        );
      },
      async complete(session, ctx) {
        return await request(
          routes.complete,
          { ...ctx, session },
          options
        );
      },
      async terminate(session, ctx) {
        await request(routes.terminate, { ...ctx, session }, options);
      }
    };
  }
  return __toCommonJS(browser_exports);
})();
