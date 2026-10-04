import { type UploadItem, type UploaderOptions, type UploaderStore, type UploaderSnapshot } from "../core/index.js";
export * from "../core/index.js";
export interface MountOptions {
    renderItem?(item: UploadItem): HTMLElement;
    renderName?(item: UploadItem): string;
    renderMetadata?(item: UploadItem): string;
    renderStatus?(item: UploadItem): string;
    renderProgress?(element: HTMLElement, item: UploadItem): void;
    renderPreview?(element: HTMLElement, item: UploadItem, url?: string): void;
    renderOutput?(element: HTMLElement, snapshot: UploaderSnapshot): void;
    onSnapshot?(snapshot: UploaderSnapshot): void;
}
/** App-owned markup is connected through data-upload-* attributes. Return value disposes all bindings. */
export declare function mountUploader(root: HTMLElement, source: UploaderStore | UploaderOptions, options?: MountOptions): {
    store: UploaderStore;
    destroy(): void;
};
