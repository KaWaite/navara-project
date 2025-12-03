import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import type { ViewContext } from "../../core/ViewContext";
import { SMAA, type AntialiasOptions } from "../../effects";
type LayerDescription = {
    smaa?: Omit<AntialiasOptions, "enabled">;
};
export type SMAAConfig = LayerDescription & EffectLayerConfig;
export type SMAAUpdate = LayerDescription & EffectLayerUpdate;
export declare class SMAAEffectLayer extends EffectLayerDeclaration<SMAAConfig, SMAAUpdate, SMAA> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: SMAAConfig);
    createPass(): SMAA;
    onUpdateConfig(updates: SMAAUpdate): void;
}
export {};
