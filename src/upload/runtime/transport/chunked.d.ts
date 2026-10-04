import type { UploadTransport } from "../core/types.js";
import { type HTTPOptions, type RequestOptions } from "./request.js";
export interface ChunkedOptions extends HTTPOptions {
    baseURL?: string;
    routes?: Partial<Record<"create" | "probe" | "upload" | "complete" | "terminate", RequestOptions>>;
}
export declare function chunkedTransport(options: ChunkedOptions): UploadTransport;
