import { BlendFunction } from "postprocessing";
import type { Camera, Texture } from "three";
import { Effect, type EffectOptions } from "../effect";
import { SSREffect as SSREffectImpl } from "./SSREffect";
export type SSROptions = {
    /** Texture containing geometry information (normals, depth) for reflection calculations */
    geometryBuffer?: Texture | null;
    /** Resolution scale factor for SSR rendering (0-1, lower values improve performance) */
    resolutionScale?: number;
    /** Maximum number of ray marching iterations for finding reflection intersections */
    iterations?: number;
    /** Number of binary search refinement steps to improve reflection accuracy */
    binarySearchIterations?: number;
    /** Depth buffer precision threshold for pixel rejection */
    pixelZSize?: number;
    /** Step size in pixels for ray marching along screen space */
    pixelStride?: number;
    /** Depth cutoff value for reducing pixel stride in distant areas */
    pixelStrideZCutoff?: number;
    /** Maximum distance a reflection ray can travel in world units */
    maxRayDistance?: number;
    /** Screen position (0-1) where edge fade begins to hide artifacts */
    screenEdgeFadeStart?: number;
    /** Start angle (radians) for fading reflections based on viewing angle */
    eyeFadeStart?: number;
    /** End angle (radians) for fading reflections based on viewing angle */
    eyeFadeEnd?: number;
    /** Amount of random jitter to reduce artifact */
    jitter?: number;
    /** Blend function for compositing reflections with the scene */
    blendFunction?: BlendFunction;
    /** Gaussian blur kernel size. Should be an odd number in the range [3, 1020]. */
    kernelSize?: number;
    /** Enable cone tracing that improves visual quality, but it might take a cost. */
    useConeTracing?: boolean;
    /** A ratio thats starts fading reflections */
    coneTracingFadeStart?: number;
    /** A ratio that ends fading reflections */
    coneTracingFadeEnd?: number;
    /** The max distance at which a reflection is visible */
    coneTracingMaxDistance?: number;
    /** The number of iteration to accumulate the cone tracing */
    coneTracingIteration?: number;
    coneTracingIor?: number;
} & EffectOptions;
export declare const DEFAULT_SSR_OPTIONS: Required<SSROptions>;
export declare class SSR extends Effect<SSREffectImpl, SSROptions> {
    constructor(camera: Camera, _options?: SSROptions);
    init(): void;
    get geometryBuffer(): Texture | null;
    set geometryBuffer(v: Texture | null);
    get resolutionScale(): number;
    set resolutionScale(v: number);
    get iterations(): number;
    set iterations(v: number);
    get binarySearchIterations(): number;
    set binarySearchIterations(v: number);
    get pixelZSize(): number;
    set pixelZSize(v: number);
    get pixelStride(): number;
    set pixelStride(v: number);
    get pixelStrideZCutoff(): number;
    set pixelStrideZCutoff(v: number);
    get maxRayDistance(): number;
    set maxRayDistance(v: number);
    get screenEdgeFadeStart(): number;
    set screenEdgeFadeStart(v: number);
    get eyeFadeStart(): number;
    set eyeFadeStart(v: number);
    get eyeFadeEnd(): number;
    set eyeFadeEnd(v: number);
    get jitter(): number;
    set jitter(v: number);
    get useConeTracing(): boolean;
    set useConeTracing(v: boolean);
    get coneTracingFadeStart(): number;
    set coneTracingFadeStart(v: number);
    get coneTracingFadeEnd(): number;
    set coneTracingFadeEnd(v: number);
    get coneTracingMaxDistance(): number;
    set coneTracingMaxDistance(v: number);
    get coneTracingIteration(): number;
    set coneTracingIteration(v: number);
    get coneTracingIor(): number;
    set coneTracingIor(v: number);
}
