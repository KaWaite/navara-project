import { EffectLayerDeclaration, type EffectLayerConfig, type EffectLayerUpdate } from "../../core/EffectLayerDeclaration";
import { CopyPass } from "../../effects";
type LayerDescription = {
    final?: {};
};
export type FinalCopyPassConfig = LayerDescription & EffectLayerConfig;
export type FinalCopyPassUpdate = LayerDescription & EffectLayerUpdate;
export declare class FinalCopyEffectLayer extends EffectLayerDeclaration<FinalCopyPassConfig, FinalCopyPassUpdate, CopyPass> {
    static key: string;
    createPass(): CopyPass;
}
export {};
