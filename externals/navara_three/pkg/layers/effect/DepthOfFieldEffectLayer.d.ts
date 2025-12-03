import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import type { ViewContext } from "../../core/ViewContext";
import { DepthOfField, type DepthOfFieldOptions } from "../../effects";
type LayerDescription = {
    depthOfField?: Omit<DepthOfFieldOptions, "enabled">;
};
export type DepthOfFieldConfig = LayerDescription & EffectLayerConfig;
export type DepthOfFieldUpdate = LayerDescription & EffectLayerUpdate;
export declare class DepthOfFieldEffectLayer extends EffectLayerDeclaration<DepthOfFieldConfig, DepthOfFieldUpdate, DepthOfField> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: DepthOfFieldConfig);
    createPass(): DepthOfField;
    onUpdateConfig(updates: DepthOfFieldUpdate): void;
}
export {};
