import { Effect as PostProcessingEffect } from "postprocessing";
/** Optional knobs exposed to whoever constructs the effect. */
export type RainDropEffectOptions = {
    /** Opacity applied after the shader runs, useful for blending the effect. */
    opacity?: number;
    /** Size of the UV grid used to place droplets; larger values yield smaller cells. */
    dropGridSize?: number;
    /** Multiplier applied in the shader to control how many droplets are spawned. */
    dropDensity?: number;
    /** Active number of simulated layers; higher values add small droplets at extra cost. */
    dropLayers?: number;
    /** Controls how tightly droplets are packed by scaling the grid size. */
    dropSizeFactor?: number;
    /** Scales the noise that drives jitter and refraction wobble. */
    noiseScale?: number;
    /** Intensity of UV distortion caused by refraction. */
    refractionStrength?: number;
    /** Minimum strength required before rendering a droplet. */
    minDropStrength?: number;
    /** Fade window (start) for smooth drop visibility. */
    dropFadeStart?: number;
    /** Fade window (end) paired with dropFadeStart. */
    dropFadeEnd?: number;
    /** Base threshold factor controlling spawn probability. */
    dropThresholdFactor?: number;
    /** Adjustment applied when density is low; pairs with gridDensityHigh. */
    gridDensityLow?: number;
    /** Adjustment applied when density is high; pairs with gridDensityLow. */
    gridDensityHigh?: number;
    /** Maximum jitter for sparse drops; pairs with jitterStrengthHigh. */
    jitterStrengthLow?: number;
    /** Minimum jitter for dense drops; pairs with jitterStrengthLow. */
    jitterStrengthHigh?: number;
};
export declare const DEFAULT_RAIN_DROP_EFFECT_OPTIONS: Required<RainDropEffectOptions>;
/**
 * Wraps the GLSL rain drop shader so it can be slotted into the post-processing
 * pipeline with adjustable density, grid size, and opacity.
 */
export declare class RainDropPostEffect extends PostProcessingEffect {
    private readonly dropGridSizeUniform;
    private readonly dropDensityUniform;
    private readonly dropLayersUniform;
    private readonly dropSizeFactorUniform;
    private readonly noiseScaleUniform;
    private readonly refractionStrengthUniform;
    private readonly minDropStrengthUniform;
    private readonly dropFadeStartUniform;
    private readonly dropFadeEndUniform;
    private readonly dropThresholdFactorUniform;
    private readonly gridDensityLowUniform;
    private readonly gridDensityHighUniform;
    private readonly jitterStrengthLowUniform;
    private readonly jitterStrengthHighUniform;
    constructor(options?: RainDropEffectOptions);
    setSize(width: number, height: number): void;
    updateTime(time: number): void;
    set dropGridSize(value: number);
    get dropGridSize(): number;
    set dropDensity(value: number);
    get dropDensity(): number;
    set dropLayers(value: number);
    get dropLayers(): number;
    set dropSizeFactor(value: number);
    get dropSizeFactor(): number;
    set noiseScale(value: number);
    get noiseScale(): number;
    set refractionStrength(value: number);
    get refractionStrength(): number;
    set minDropStrength(value: number);
    get minDropStrength(): number;
    set dropFadeStart(value: number);
    get dropFadeStart(): number;
    set dropFadeEnd(value: number);
    get dropFadeEnd(): number;
    set dropThresholdFactor(value: number);
    get dropThresholdFactor(): number;
    set gridDensityLow(value: number);
    get gridDensityLow(): number;
    set gridDensityHigh(value: number);
    get gridDensityHigh(): number;
    set jitterStrengthLow(value: number);
    get jitterStrengthLow(): number;
    set jitterStrengthHigh(value: number);
    get jitterStrengthHigh(): number;
}
