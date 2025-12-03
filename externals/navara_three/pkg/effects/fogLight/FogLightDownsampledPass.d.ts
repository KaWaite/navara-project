import { Pass, Resolution } from "postprocessing";
import { Texture, WebGLRenderTarget, type Camera, type WebGLRenderer, type DepthPackingStrategies, type TextureDataType } from "three";
import { FogLightEffect } from "./FogLightEffect";
export type FogLightDownsampledOptions = {
    /** 1: full-res, 2: half, 4: quarter */
    downsample: number;
};
export declare class FogLightDownsampledPass extends Pass {
    private options;
    private inner;
    private effect;
    private lowRT;
    private compositeMat;
    readonly resolution: Resolution;
    constructor(camera: Camera, effect: FogLightEffect, opts: FogLightDownsampledOptions);
    setDepthTexture(depthTexture: Texture, depthPacking?: DepthPackingStrategies): void;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget | null, deltaTime: number, stencilTest?: boolean): void;
    setSize(width: number, height: number): void;
    initialize(renderer: WebGLRenderer, alpha: boolean, frameBufferType: TextureDataType): void;
    dispose(): void;
    get downsample(): number;
    set downsample(value: number);
}
