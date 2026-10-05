import type { UploadPersistence } from "./types.js";
/** The namespace should include the application's current user identity. No files or credentials are stored. */
export declare function indexedDBPersistence(namespace: string): UploadPersistence;
