import { Pass } from "postprocessing";
import { Texture, WebGLRenderTarget, type WebGLRenderer } from "three";
/**
 * A pass that copies normal buffer contents to a render target.
 */
export declare class RenderTargetCopyPass extends Pass {
    private _renderTarget;
    private _material;
    private _autoResize;
    constructor(renderTarget: WebGLRenderTarget, autoResize?: boolean);
    get texture(): Texture;
    get autoResize(): boolean;
    set autoResize(value: boolean);
    setTexture(texture: Texture): void;
    setDepthTexture(texture: Texture): void;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    dispose(): void;
}
