import { LightLayerDeclaration, type LightLayerConfig, ViewContext, type LightLayerUpdate } from "../../core";
import { AmbientLight, type AmbientLightOptions } from "../../lights";
type LayerDescription = {
    ambient?: Omit<AmbientLightOptions, "color"> & {
        color?: number;
    };
};
export type AmbientLightLayerConfig = LightLayerConfig & LayerDescription;
export type AmbientLightLayerUpdate = LightLayerUpdate & LayerDescription;
export declare class AmbientLightLayer extends LightLayerDeclaration<AmbientLightLayerConfig, AmbientLightLayerUpdate, AmbientLight> {
    private config;
    constructor(view: ViewContext, config: AmbientLightLayerConfig);
    createLight(): AmbientLight;
    onUpdateConfig(updates: AmbientLightLayerUpdate): void;
}
export {};
