import type { UploadError } from "./types.js";
export declare class TransferError extends Error {
    code: string;
    status?: number | undefined;
    retryAfter?: number | undefined;
    constructor(message: string, code?: string, status?: number | undefined, retryAfter?: number | undefined);
}
export declare const abortError: () => DOMException;
export declare const isAbort: (error: unknown) => boolean;
export declare function errorValue(error: unknown): UploadError;
export declare function retryable(error: unknown): boolean;
export declare function retryAfter(value: string | null, now?: number): number | undefined;
export declare function delay(ms: number, signal: AbortSignal): Promise<void>;
/** Per-request permits include probe, create and finish, not just data requests. */
export declare class RequestPool {
    private limit;
    private active;
    private waiters;
    constructor(limit: number);
    run<T>(signal: AbortSignal, task: () => Promise<T>): Promise<T>;
}
export declare function digest(blob: Blob): Promise<string>;
