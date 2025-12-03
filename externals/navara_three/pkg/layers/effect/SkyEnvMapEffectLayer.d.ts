import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import type { ViewContext } from "../../core/ViewContext";
import { SkyEnvMapPass } from "../../passes";
type LayerDescription = {
    skyEnvMap?: {
        resolution?: number;
    };
};
export type SkyEnvMapPassConfig = LayerDescription & EffectLayerConfig;
export type SkyEnvMapPassUpdate = LayerDescription & EffectLayerUpdate;
export declare class SkyEnvMapEffectLayer extends EffectLayerDeclaration<SkyEnvMapPassConfig, SkyEnvMapPassUpdate, SkyEnvMapPass> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: SkyEnvMapPassConfig);
    createPass(): SkyEnvMapPass;
    onUpdateConfig(updates: SkyEnvMapPassUpdate): void;
}
export {};
