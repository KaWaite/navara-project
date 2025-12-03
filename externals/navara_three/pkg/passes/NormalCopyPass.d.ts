import { Pass } from "postprocessing";
import { Texture, WebGLRenderTarget, type WebGLRenderer } from "three";
/**
 * A pass that copies normal buffer contents to a render target.
 */
export declare class NormalCopyPass extends Pass {
    private _renderTarget;
    private _material;
    private _autoResize;
    constructor(renderTarget?: WebGLRenderTarget, autoResize?: boolean);
    get texture(): Texture;
    get autoResize(): boolean;
    set autoResize(value: boolean);
    set unpackNormal(v: boolean);
    setNormalTexture(texture: Texture): void;
    setSize(width: number, height: number): void;
    render(renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    dispose(): void;
}
