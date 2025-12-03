import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import type { ViewContext } from "../../core/ViewContext";
import { CustomRenderPass } from "../../passes";
type LayerDescription = {
    mrt?: {
        debugNormal?: boolean;
    };
};
export type MRTPassConfig = LayerDescription & EffectLayerConfig;
export type MRTPassUpdate = LayerDescription & EffectLayerUpdate;
export declare class MRTPassEffectLayer extends EffectLayerDeclaration<MRTPassConfig, MRTPassUpdate, CustomRenderPass> {
    static key: string;
    private config;
    constructor(view: ViewContext, config: MRTPassConfig);
    createPass(): CustomRenderPass;
    onUpdateConfig(updates: MRTPassUpdate): void;
}
export {};
