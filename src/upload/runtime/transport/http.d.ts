import type { UploadTransport, TransportContext } from "../core/types.js";
import { type HTTPOptions, type RequestOptions } from "./request.js";
/** Single-request uploads retry the entire file. The server must honor the request key if duplicate uploads matter. */
export declare function httpTransport(options: HTTPOptions & RequestOptions & {
    formField?: string;
    progress?: boolean;
    parseResponse?(value: unknown, context: TransportContext): unknown | Promise<unknown>;
}): UploadTransport;
