import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import type { ViewContext } from "../../core/ViewContext";
import { SSR, type SSROptions } from "../../effects/ssr";
type LayerDescription = {
    ssr?: Omit<SSROptions, "enabled" | "geometryBuffer">;
};
export type SSRConfig = LayerDescription & EffectLayerConfig;
export type SSRUpdate = LayerDescription & EffectLayerUpdate;
export declare class SSREffectLayer extends EffectLayerDeclaration<SSRConfig, SSRUpdate, SSR> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: SSRConfig);
    createPass(): SSR;
    onUpdateConfig(updates: SSRUpdate): void;
}
export {};
