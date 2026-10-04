import type { UploaderOptions, UploaderStore } from "./types.js";
/** No browser I/O occurs until add, restore or start. Create one store per SSR tree. */
export declare function createUploader(options: UploaderOptions): UploaderStore;
