import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import type { ViewContext } from "../../core/ViewContext";
import { RainDropEffect, type RainDropOptions } from "../../effects/rainDropEffect/effect";
type LayerDescription = {
    rainDrop?: Omit<RainDropOptions, "enabled">;
};
export type RainDropConfig = LayerDescription & EffectLayerConfig;
export type RainDropUpdate = LayerDescription & EffectLayerUpdate;
export declare class RainDropEffectLayer extends EffectLayerDeclaration<RainDropConfig, RainDropUpdate, RainDropEffect> {
    static key: string;
    static insertBefore: string[];
    static allowDuplication: boolean;
    private config;
    constructor(view: ViewContext, config: RainDropConfig);
    createPass(): RainDropEffect;
    onUpdateConfig(updates: RainDropUpdate): void;
    update(time: number): void;
}
export {};
