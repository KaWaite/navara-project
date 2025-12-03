import { Group } from "three";
import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import { RenderPass } from "../../effects";
type LayerDescription = {
    transparent?: {};
};
export type TransparentPassConfig = LayerDescription & EffectLayerConfig;
export type TransparentPassUpdate = LayerDescription & EffectLayerUpdate;
export declare class TransparentPassEffectLayer extends EffectLayerDeclaration<TransparentPassConfig, TransparentPassUpdate, RenderPass> {
    static key: string;
    static insertAfter: string[];
    light: Group<import("three").Object3DEventMap>;
    lightsSyncMap: Map<any, any>;
    createPass(): RenderPass;
    update(_time: number): void;
}
export {};
