import { Loader, Texture } from "three";
export declare class AbortableTextureLoader extends Loader {
    loadAsyncWithAbort(url: string, abort?: AbortController, onProgress?: (event: ProgressEvent) => void): Promise<Texture>;
    load(url: string, onLoad: (data: Texture) => void, onProgress?: (event: ProgressEvent) => void, onError?: (err: unknown, isAborted?: boolean) => void, abort?: AbortController): Texture;
}
