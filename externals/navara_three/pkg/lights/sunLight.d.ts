import { EventHandler } from "@navara/core";
import { CascadedShadowMaps, CSMHelper } from "@navara/three_csm";
import { SunDirectionalLight } from "@takram/three-atmosphere";
import { Color, Texture, Vector3, Material, PerspectiveCamera } from "three";
export type SunLightEvents = {
    _needsUpdate: () => void;
    _csmChanged: () => void;
};
export type ShadowMode = "uniform" | "logarithmic" | "practical";
export type SunLightOptions = {
    /**
     * Distance of the sun light from the target position.
     * @default 300
     */
    distance?: number;
    /**
     * Color of the sun light.
     * @default new Color(0xffffff)
     */
    color?: Color;
    /**
     * Whether to apply the color directly or use atmospheric scattering calculations.
     * @default false
     */
    applyColor?: boolean;
    /**
     * Intensity of the sun light.
     * @default 1
     */
    intensity?: number;
    /**
     * Whether to cast shadows using Cascaded Shadow Maps (CSM).
     * @default true
     */
    castShadow?: boolean;
    /**
     * Number of shadow cascades. More cascades provide better shadow quality
     * distribution but require more GPU resources.
     * @default 4
     */
    shadowCascadeCount?: number;
    /**
     * Resolution of shadow maps (one per cascade). Higher values provide better
     * shadow quality but require more GPU memory.
     * @default 2048
     */
    shadowMapSize?: number;
    /**
     * Maximum distance from the camera where shadows are rendered.
     * Shadows will not be visible farther than this distance.
     * @default 50000
     */
    shadowFar?: number;
    /**
     * Defines the split scheme for the camera frustum:
     * - "uniform": Linear split distribution
     * - "logarithmic": Logarithmic split distribution (better for large scenes)
     * - "practical": Hybrid approach balancing quality and performance (recommended)
     * @default "practical"
     */
    shadowMode?: ShadowMode;
    /**
     * Lambda parameter for "practical" split mode. Controls the blend between
     * uniform (0.0) and logarithmic (1.0) split schemes.
     * @default 0.8
     */
    shadowLambda?: number;
    /**
     * Defines how far the shadow camera is positioned behind the cascade frustum.
     * Larger values help prevent shadow clipping but may reduce precision.
     * @default 5000
     */
    shadowMargin?: number;
    /**
     * Enables smooth transitions between shadow cascades to reduce visible seams.
     * @default true
     */
    shadowFade?: boolean;
    /**
     * Intensity of the shadows (0 = no shadows, 1 = full shadows).
     * @default 1
     */
    shadowIntensity?: number;
    /**
     * Shadow map bias to reduce shadow acne. Similar to THREE.LightShadow.bias.
     * @default 0.0001
     */
    shadowBias?: number;
    /**
     * Normal-based shadow bias to reduce shadow acne on surfaces at glancing angles.
     * @default 0
     */
    shadowNormalBias?: number;
    /**
     * Whether to show debug visualization of shadow cascades.
     * @default false
     */
    debugCSMHelper?: boolean;
};
export declare class SunLight extends EventHandler<SunLightEvents> {
    raw: SunDirectionalLight;
    private transmittanceTexture;
    private options;
    private csm;
    private csmHelper;
    private camera;
    constructor(camera: PerspectiveCamera, options?: SunLightOptions);
    updateSunDirection(sunDirection: Vector3): void;
    updateTargetPosition(position: Vector3): void;
    update(): void;
    setTransmittanceTexture(texture: Texture): void;
    clearTransmittanceTexture(): void;
    /**
     * Initialize CSM with current options
     */
    private initializeCSM;
    /**
     * Update CSM (call this in render loop)
     */
    private updateCSM;
    /**
     * Set the camera for CSM calculations
     */
    setCamera(camera: PerspectiveCamera): void;
    /**
     * Setup a material for CSM
     */
    setupMaterialForCSM(material: Material): void;
    /**
     * Remove a material from CSM
     */
    removeMaterialFromCSM(material: Material): void;
    /**
     * Get CSM instance for advanced usage
     */
    getCSM(): CascadedShadowMaps;
    /**
     * Get CSM helper for debug visualization
     */
    getCSMHelper(): CSMHelper | null;
    /**
     * Get the lights that should be added to the scene
     * Returns CSM lights if enabled, otherwise the standard sun light
     */
    getSceneLights(): SunDirectionalLight | import("@navara/three_csm").CascadedDirectionalLights;
    /**
     * Get the helper that should be added to the scene for debug visualization
     */
    getSceneHelper(): CSMHelper | null;
    get visible(): boolean;
    set visible(v: boolean);
    get intensity(): number;
    set intensity(v: number);
    get shadowIntensity(): number;
    set shadowIntensity(v: number);
    get color(): Color;
    set color(v: Color);
    get applyColor(): boolean;
    set applyColor(v: boolean);
    get target(): import("three").Object3D<import("three").Object3DEventMap>;
    get castShadow(): boolean;
    set castShadow(v: boolean);
    get shadowMapSize(): number;
    set shadowMapSize(v: number);
    get shadowFar(): number;
    set shadowFar(v: number);
    get shadowCascadeCount(): number;
    set shadowCascadeCount(v: number);
    get shadowMode(): ShadowMode;
    set shadowMode(v: ShadowMode);
    get shadowLambda(): number;
    set shadowLambda(v: number);
    get shadowMargin(): number;
    set shadowMargin(v: number);
    get shadowFade(): boolean;
    set shadowFade(v: boolean);
    get shadowBias(): number;
    set shadowBias(v: number);
    get shadowNormalBias(): number;
    set shadowNormalBias(v: number);
    get debugCSMHelper(): boolean;
    set debugCSMHelper(v: boolean);
}
