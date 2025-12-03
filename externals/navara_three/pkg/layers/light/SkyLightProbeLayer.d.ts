import { LightLayerDeclaration, type LightLayerConfig, ViewContext, type LightLayerUpdate } from "../../core";
import { SkyLightProbe, type SkyLightProbeOptions } from "../../lights";
type LayerDescription = {
    skyLightProbe?: SkyLightProbeOptions;
};
export type SkyLightProbeLayerConfig = LightLayerConfig & LayerDescription;
export type SkyLightProbeLayerUpdate = LightLayerUpdate & LayerDescription;
export declare class SkyLightProbeLayer extends LightLayerDeclaration<SkyLightProbeLayerConfig, SkyLightProbeLayerUpdate, SkyLightProbe> {
    private config;
    constructor(view: ViewContext, config: SkyLightProbeLayerConfig);
    createLight(): SkyLightProbe;
    onUpdateConfig(updates: SkyLightProbeLayerUpdate): void;
    update(_time: number): void;
}
export {};
