import {
  TransferError,
  type UploadTransport,
  type UploadSession,
  type FileMetadata,
} from "./runtime/core/index.js";
interface DemoSession {
  id: string;
  key: string;
  metadata: FileMetadata;
  chunkSize: number;
  expiresAt: number;
  status: "open" | "completed" | "canceled";
  parts: Array<{ index: number; size: number; sha256: string }>;
  result?: { id: string; size: number; name: string };
}
const namespace = "salyra-upload-documentation:0.1.0";
const read = (): DemoSession[] =>
  JSON.parse(localStorage.getItem(namespace) ?? "[]");
const write = (items: DemoSession[]) =>
  localStorage.setItem(namespace, JSON.stringify(items));
const find = (id: string) => {
  const item = read().find((value) => value.id === id);
  if (!item)
    throw new TransferError("The simulated session was not found", "HTTP", 404);
  return item;
};
const update = (item: DemoSession) =>
  write([...read().filter((value) => value.id !== item.id), item]);
const failures = new Set<string>();
function wait(signal: AbortSignal, milliseconds: number) {
  return new Promise<void>((resolve, reject) => {
    signal.throwIfAborted();
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException("Stopped", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", abort);
      resolve();
    }, milliseconds);
    signal.addEventListener("abort", abort, { once: true });
  });
}
export function demoTransport(
  example: string,
  progress = true,
  resume = true,
): UploadTransport {
  return {
    capabilities: {
      resume,
      progress,
      parallelParts: resume,
      checksums: resume,
      terminate: true,
    },
    async create(context) {
      context.signal.throwIfAborted();
      const existing = read().find((item) => item.key === context.requestKey);
      if (existing) return existing;
      const item: DemoSession = {
        id: crypto.randomUUID(),
        key: context.requestKey,
        metadata: context.metadata,
        chunkSize: resume
          ? context.chunkSize
          : Math.max(1, context.metadata.size),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        status: "open",
        parts: [],
      };
      update(item);
      return item;
    },
    async probe(session, context) {
      context.signal.throwIfAborted();
      return find(session.id);
    },
    async upload(session: UploadSession, context) {
      if (failures.delete(example))
        throw new TransferError(
          "Simulated temporary server error",
          "HTTP",
          503,
          2000,
        );
      const digest = Array.from(
        new Uint8Array(
          await crypto.subtle.digest(
            "SHA-256",
            await context.blob.arrayBuffer(),
          ),
        ),
        (value) => value.toString(16).padStart(2, "0"),
      ).join("");
      for (let step = 1; step <= 4; step++) {
        await wait(context.signal, 100);
        if (progress) context.onProgress((context.blob.size * step) / 4);
      }
      const item = find(session.id);
      if (!resume && item.status === "completed") {
        const existing = item.parts.find(
          (part) => part.index === context.index,
        );
        if (existing?.sha256 === digest) return existing;
      }
      if (item.status !== "open")
        throw new TransferError(
          "The simulated session is no longer open",
          "HTTP",
          409,
        );
      if (resume && digest !== context.sha256)
        throw new TransferError("Chunk checksum does not match", "HTTP", 422);
      const part = {
        index: context.index,
        size: context.blob.size,
        sha256: digest,
      };
      item.parts = [
        ...item.parts.filter((value) => value.index !== part.index),
        part,
      ];
      update(item);
      return part;
    },
    async complete(session, context) {
      await wait(context.signal, 180);
      const item = find(session.id);
      if (item.status === "canceled")
        throw new TransferError(
          "The simulated upload was canceled",
          "HTTP",
          409,
        );
      if (
        item.parts.reduce((size, part) => size + part.size, 0) !==
        item.metadata.size
      )
        throw new TransferError(
          "The simulated upload is incomplete",
          "HTTP",
          409,
        );
      item.status = "completed";
      item.result ??= {
        id: item.id,
        size: item.metadata.size,
        name: item.metadata.name,
      };
      update(item);
      return item.result;
    },
    async terminate(session, context) {
      context.signal.throwIfAborted();
      const item = find(session.id);
      if (item.status === "completed")
        throw new TransferError(
          "The simulated file is already completed",
          "HTTP",
          409,
        );
      item.status = "canceled";
      item.parts = [];
      update(item);
    },
  };
}
export async function demoFetch(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  const value = new URL(input, location.href),
    example = (init?.headers as Record<string, string> | undefined)?.[
      "X-Demo-Example"
    ];
  if (value.pathname === "/demo/fail-next") {
    failures.add(example ?? "retry");
    return Response.json({});
  }
  if (value.pathname === "/demo/fail-next-remove") { failures.add('remove'); return Response.json({}); }
  if (value.pathname === "/demo/history")
    return Response.json(
      read()
        .filter((item) => item.status === "completed")
        .map((item) => ({
          id: item.id,
          metadata: item.metadata,
          result: item.result,
        })),
    );
  if (value.pathname.startsWith("/demo/files/") && init?.method === "DELETE") {
    if (failures.delete('remove')) return Response.json({}, {status:503});
    const id = decodeURIComponent(value.pathname.split("/").at(-1)!);
    write(read().filter((item) => item.id !== id));
    return Response.json({});
  }
  throw new Error(
    "This documentation example does not have that simulated route",
  );
}
