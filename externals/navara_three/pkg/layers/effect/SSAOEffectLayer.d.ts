import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import type { ViewContext } from "../../core/ViewContext";
import { SSAO, type SSAOOptions } from "../../effects";
type LayerDescription = {
    ssao?: Omit<SSAOOptions, "enabled">;
};
export type SSAOConfig = LayerDescription & EffectLayerConfig;
export type SSAOUpdate = LayerDescription & EffectLayerUpdate;
export declare class SSAOEffectLayer extends EffectLayerDeclaration<SSAOConfig, SSAOUpdate, SSAO> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: SSAOConfig);
    createPass(): SSAO;
    onUpdateConfig(updates: SSAOUpdate): void;
}
export {};
