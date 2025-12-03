import { Material } from "three";
import { LightLayerDeclaration, type LightLayerConfig, ViewContext, type LightLayerUpdate } from "../../core";
import { SunLight, type SunLightOptions } from "../../lights";
type LayerDescription = {
    /**
     * Sun light configuration options. Includes all CSM (Cascaded Shadow Maps) settings.
     * Color is specified as a number (hex value) instead of THREE.Color instance.
     */
    sun?: Omit<SunLightOptions, "color"> & {
        color?: number;
    };
};
export type SunLightLayerConfig = LightLayerConfig & LayerDescription;
export type SunLightLayerUpdate = LightLayerUpdate & LayerDescription;
export declare class SunLightLayer extends LightLayerDeclaration<SunLightLayerConfig, SunLightLayerUpdate, SunLight> {
    private config;
    constructor(view: ViewContext, config: SunLightLayerConfig);
    createLight(): SunLight;
    onUpdateConfig(updates: SunLightLayerUpdate): void;
    onCreate(): void;
    update(_time: number): void;
    onDestroy(): void;
    /**
     * Update scene lights based on current CSM state
     */
    private updateSceneLights;
    /**
     * Remove all lights and helpers from scene
     */
    private removeLightsFromScene;
    /**
     * Setup a material for CSM shadows
     */
    setupMaterialForShadows(material: Material): void;
    /**
     * Remove a material from CSM shadows
     */
    removeMaterialFromShadows(material: Material): void;
    /**
     * Get CSM instance for advanced usage
     */
    getCSM(): import("@navara/three_csm").CascadedShadowMaps | undefined;
    /**
     * Get CSM helper for debug visualization
     */
    getCSMHelper(): import("@navara/three_csm").CSMHelper | null | undefined;
}
export {};
