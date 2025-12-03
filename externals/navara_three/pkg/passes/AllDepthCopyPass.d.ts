import { Pass } from "postprocessing";
import { DepthTexture, Texture, WebGLRenderTarget, type DepthPackingStrategies, type WebGLRenderer } from "three";
/**
 * A pass that copies and optionally merges depth buffers.
 * This is used to accumulate depths from multiple render stages.
 */
export declare class AllDepthCopyPass extends Pass {
    private _renderTarget;
    private _material;
    private _merge;
    private _copyPassRenderTarget;
    private _copyPass;
    constructor(renderTarget?: WebGLRenderTarget);
    get texture(): Texture;
    /**
     * Set the depth texture to copy from.
     */
    setDepthTexture(texture: DepthTexture | Texture | null, packing?: DepthPackingStrategies): void;
    /**
     * Copy depth buffer, optionally merging with existing depth.
     * @param merge - If true, merge with existing depth by keeping the minimum (closest) depth
     */
    copyDepth(merge?: boolean): void;
    setSize(width: number, height: number): void;
    render(renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    dispose(): void;
}
