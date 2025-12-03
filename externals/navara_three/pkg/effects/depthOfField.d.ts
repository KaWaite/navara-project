import { DepthOfFieldEffect } from "postprocessing";
import type { Camera } from "three";
import { Effect, type EffectOptions } from "./effect";
export type DepthOfFieldOptions = {
    /** Normalized focus distance that defines where the focus plane is, Range is [0.0, 1.0]. */
    focusDistance?: number;
    /** Virtual lens focal length that controls how quickly sharpness falls off around the focus plane, Range is [0.0, 1.0]. */
    focalLength?: number;
    /** Multiplier applied to the blur kernel that scales the apparent size of bokeh highlights. */
    bokehScale?: number;
} & EffectOptions;
export declare const DEFAULT_DEPTH_OF_FIELD_OPTIONS: Required<DepthOfFieldOptions>;
export declare class DepthOfField extends Effect<DepthOfFieldEffect, DepthOfFieldOptions> {
    constructor(camera: Camera, options?: DepthOfFieldOptions);
    protected onMounted(): void;
    get focusDistance(): number;
    set focusDistance(v: number);
    get focalLength(): number;
    set focalLength(v: number);
    get bokehScale(): number;
    set bokehScale(v: number);
}
