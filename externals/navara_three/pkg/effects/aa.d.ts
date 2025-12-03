import { FXAAEffect, SMAAEffect } from "postprocessing";
import type { Camera } from "three";
import type { Quality } from "../quality";
import { Effect, type EffectOptions } from "./effect";
export { ToneMappingMode } from "postprocessing";
export type EdgeDetectionMode = "color" | "depth" | "luma";
export type AntialiasOptions = {
    enabled?: boolean;
    quality?: Quality;
    edgeDetectionMode?: EdgeDetectionMode;
} & EffectOptions;
export declare const DEFAULT_ANTIALIAS_OPTIONS: AntialiasOptions;
export declare class FXAA extends Effect<FXAAEffect, AntialiasOptions> {
    constructor(camera: Camera, options?: AntialiasOptions);
}
export declare class SMAA extends Effect<SMAAEffect, AntialiasOptions> {
    constructor(camera: Camera, options?: AntialiasOptions);
    protected onMounted(): void;
    get quality(): AntialiasOptions["quality"];
    set quality(v: AntialiasOptions["quality"]);
    get edgeDetectionMode(): AntialiasOptions["edgeDetectionMode"];
    set edgeDetectionMode(v: AntialiasOptions["edgeDetectionMode"]);
}
