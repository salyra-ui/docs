export * from "./types.js";
export { createUploader } from "./store.js";
export { indexedDBPersistence } from "./persistence.js";
export { TransferError, retryAfter } from "./errors.js";
export declare function formatBytes(bytes: number, options?: {
    locale?: string;
    base?: 1000 | 1024;
    maximumFractionDigits?: number;
}): string;
/** Available actions from one item. Root disabled/readOnly flags also apply to the controls. */
export declare function uploadActions(item: import("./types.js").UploadItem): {
    canStart: boolean;
    canPause: boolean;
    canResume: boolean;
    canRetry: boolean;
    canCancel: boolean;
    canReset: boolean;
    canRemove: boolean;
    canForget: boolean;
};
