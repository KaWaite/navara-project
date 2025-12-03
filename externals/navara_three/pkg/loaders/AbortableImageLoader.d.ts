import { Loader } from "three";
export declare class AbortableImageLoader extends Loader<HTMLImageElement> {
    loadAsyncWithAbort(url: string, abort?: AbortController, onProgress?: (event: ProgressEvent) => void): Promise<HTMLImageElement>;
    load(url: string, onLoad: (data: HTMLImageElement) => void, _onProgress?: (event: ProgressEvent) => void, onError?: (err: unknown, isAborted?: boolean) => void, abort?: AbortController, timeout?: number): HTMLImageElement;
}
