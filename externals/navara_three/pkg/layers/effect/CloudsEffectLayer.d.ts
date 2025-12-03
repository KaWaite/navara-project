import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import type { ViewContext } from "../../core/ViewContext";
import { Clouds, type CloudsOptions } from "../../effects";
type LayerDescription = {
    clouds?: Omit<CloudsOptions, "enabled">;
};
export type CloudsConfig = LayerDescription & EffectLayerConfig;
export type CloudsUpdate = LayerDescription & EffectLayerUpdate;
export declare class CloudsEffectLayer extends EffectLayerDeclaration<CloudsConfig, CloudsUpdate, Clouds> {
    static key: string;
    static insertAfter: string[];
    private config;
    constructor(view: ViewContext, config: CloudsConfig);
    createPass(): Clouds;
    onUpdateConfig(updates: CloudsUpdate): void;
    update(_time: number): void;
}
export {};
