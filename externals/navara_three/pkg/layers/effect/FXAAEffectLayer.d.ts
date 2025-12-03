import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import { FXAA } from "../../effects";
type LayerDescription = {
    fxaa?: {};
};
export type FXAAConfig = LayerDescription & EffectLayerConfig;
export type FXAAUpdate = LayerDescription & EffectLayerUpdate;
export declare class FXAAEffectLayer extends EffectLayerDeclaration<FXAAConfig, FXAAUpdate, FXAA> {
    static key: string;
    static insertBefore: string[];
    createPass(): FXAA;
}
export {};
