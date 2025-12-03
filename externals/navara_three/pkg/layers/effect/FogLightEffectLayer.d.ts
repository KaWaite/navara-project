import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import type { ViewContext } from "../../core/ViewContext";
import { FogLight, type FogLightOptions } from "../../effects/fogLight/effect";
type LayerDescription = {
    fogLight?: Omit<FogLightOptions, "enabled">;
};
export type FogLightConfig = LayerDescription & EffectLayerConfig;
export type FogLightUpdate = LayerDescription & EffectLayerUpdate;
export declare class FogLightEffectLayer extends EffectLayerDeclaration<FogLightConfig, FogLightUpdate, FogLight> {
    static key: string;
    static insertBefore: string[];
    static allowDuplication: boolean;
    private config;
    constructor(view: ViewContext, config: FogLightConfig);
    createPass(): FogLight;
    onUpdateConfig(updates: FogLightUpdate): void;
}
export {};
