import type { TransportContext, UploadSession } from "../core/types.js";
export type RequestOptions = {
    url: string | ((context: TransportContext & {
        session?: UploadSession;
        index?: number;
    }) => string | Promise<string>);
    method?: string;
};
export interface HTTPOptions {
    headers?: Record<string, string> | ((context: TransportContext) => Record<string, string> | Promise<Record<string, string>>);
    credentials?: RequestCredentials;
    fetch?: typeof globalThis.fetch;
}
export declare function request(endpoint: RequestOptions, context: TransportContext & {
    session?: UploadSession;
    index?: number;
}, options: HTTPOptions, body?: BodyInit, headers?: Record<string, string>, onProgress?: (bytes: number) => void): Promise<unknown>;
