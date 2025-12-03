import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import type { ViewContext } from "../../core/ViewContext";
import { ToneMapping, type ToneMappingOptions } from "../../effects";
type LayerDescription = {
    toneMapping?: Omit<ToneMappingOptions, "enabled">;
};
export type ToneMappingConfig = LayerDescription & EffectLayerConfig;
export type ToneMappingUpdate = LayerDescription & EffectLayerUpdate;
export declare class ToneMappingEffectLayer extends EffectLayerDeclaration<ToneMappingConfig, ToneMappingUpdate, ToneMapping> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: ToneMappingConfig);
    createPass(): ToneMapping;
    onUpdateConfig(updates: ToneMappingUpdate): void;
}
export {};
