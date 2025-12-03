import { LensFlareEffect } from "@takram/three-geospatial-effects";
import type { Camera } from "three";
import { Effect, type EffectOptions } from "./effect";
export { ToneMappingMode } from "postprocessing";
export type LensFlareOptions = {
    intensity?: number;
} & EffectOptions;
export declare const DEFAULT_LENS_FLARE_OPTIONS: Required<LensFlareOptions>;
export declare class LensFlare extends Effect<LensFlareEffect, LensFlareOptions> {
    constructor(camera: Camera, options?: LensFlareOptions);
    protected onMounted(): void;
    get intensity(): number;
    set intensity(v: number);
}
