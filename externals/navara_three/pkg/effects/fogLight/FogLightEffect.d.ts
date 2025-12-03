import { Effect as PostProcessingEffect } from "postprocessing";
import { PerspectiveCamera, OrthographicCamera, Color, Vector3, WebGLRenderTarget, WebGLRenderer, Texture, type DepthPackingStrategies } from "three";
export type FogLightDefinition = {
    position: {
        x: number;
        y: number;
        z: number;
    };
    color: number | Color;
    intensity: number;
    /** World-space influence radius of the fog light. Defaults to 500 if omitted. */
    radius?: number;
};
export type FogLightEffectOptions = {
    /** Array of fog light definitions with position, color, and intensity */
    lights?: FogLightDefinition[];
    /** Density of the volumetric fog (default: 5) */
    fogDensity?: number;
    /** Maximum number of lights supported (default: 100) */
    maxLights?: number;
    /** Optional normal buffer texture for surface lighting calculations */
    normalBuffer?: Texture;
    /** Whether to apply surface lighting effects (default: true) */
    useSurfaceLighting?: boolean;
    /** Tile size in pixels for tiled/clustered culling */
    tileSize?: number;
    /** Maximum lights iterated per tile on GPU (shader safety) */
    maxLightsPerTile?: number;
    /** Safety scale applied to analytic closest-approach distance h to get world radius */
    extentScale?: number;
    /** Debug: show grid extent overlay in the shader */
    debugShowGrid?: boolean;
    /**
     * Maximum distance from the camera at which fog lights are considered.
     * Lights whose entire influence sphere is farther than this value are culled on CPU.
     * Defaults to the camera's current `far` value.
     */
    maxFar?: number;
};
export declare const DEFAULT_FOG_LIGHT_EFFECT_OPTIONS: FogLightEffectOptions;
export declare class FogLightEffect extends PostProcessingEffect {
    private camera;
    private invProjectionMatrix;
    private invViewMatrix;
    private viewMatrix;
    private _vpM;
    private _frustum;
    private _viewScratch;
    private _ndcScratch;
    private _sphereScratch;
    private lightTex0;
    private lightTex1;
    private buf0;
    private buf1;
    private depthCopyPass;
    private lightGridTex?;
    private lightIndexTex?;
    private gridBuf?;
    private indexBuf?;
    private tileCounts?;
    private gridW;
    private gridH;
    private indexTexW;
    private indexTexH;
    private tileSizePx;
    private _maxLightsPerTile;
    private _extentScale;
    private _maxFar;
    constructor(camera: PerspectiveCamera | OrthographicCamera, options?: FogLightEffectOptions);
    setDepthTexture(depthTexture: Texture, depthPacking?: DepthPackingStrategies): void;
    update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, deltaTime: number): void;
    writeLight(i: number, color: Color, intensity: number, position: Vector3, radius?: number): void;
    updateLightTextures(): void;
    updateDepthBuffer(depthBuffer: Texture | null): void;
    setSize(width: number, height: number): void;
    get lightCount(): number;
    set maxLightsPerTile(v: number);
    get maxLightsPerTile(): number;
    set extentScale(v: number);
    get extentScale(): number;
    set maxFar(v: number);
    get maxFar(): number;
    private allocateGridTextures;
    private populateLightGrid;
    private estimatePointLightRange;
    set debugShowGrid(v: boolean);
    get debugShowGrid(): boolean;
}
