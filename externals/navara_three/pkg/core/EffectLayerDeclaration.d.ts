import { Pass as PostProcessingPass, Effect as PostProcessingEffect } from "postprocessing";
import { Pass } from "../effects";
import { LayerDeclaration, type BaseInstance, type LayerDeclarationConfig, type LayerDeclarationConfigUpdate } from "./LayerDeclaration";
import type { ViewContext } from "./ViewContext";
type EffectInstance = PostProcessingPass | Pass<PostProcessingPass, PostProcessingEffect>;
export type EffectLayerConfig = {
    type: "effect";
} & LayerDeclarationConfig;
export type EffectLayerUpdate = LayerDeclarationConfigUpdate;
export type EffectBaseInstance<Instance extends object = object> = Instance extends EffectInstance ? Instance & BaseInstance : Instance extends {
    raw: infer Raw extends PostProcessingPass;
} ? Instance & {
    raw: Raw;
} & BaseInstance : BaseInstance;
export declare abstract class EffectLayerDeclaration<Config extends EffectLayerConfig = EffectLayerConfig, UpdateConfig extends EffectLayerUpdate = EffectLayerUpdate, InstanceObj extends EffectInstance | {
    raw: EffectInstance;
} = EffectInstance | {
    raw: EffectInstance;
}, Instance extends EffectBaseInstance<InstanceObj> = EffectBaseInstance<InstanceObj>> extends LayerDeclaration<Config, UpdateConfig, Instance> {
    static key: string;
    static insertAfter?: string[];
    static insertBefore?: string[];
    static allowDuplication?: boolean;
    private instanceId;
    constructor(view: ViewContext, config?: Config);
    abstract createPass(): Instance;
    get raw(): Instance | undefined;
    getConstructor(): typeof EffectLayerDeclaration;
    getKey(): string;
    getInsertAfter(): string[] | undefined;
    getInsertBefore(): string[] | undefined;
    onCreate(): void;
    private insertPass;
    onUpdateConfig(updates: UpdateConfig): void;
    onDestroy(): void;
    update?(time: number): void;
    findLayer<Layer extends EffectLayerDeclaration = EffectLayerDeclaration>(key: string): Layer | undefined;
}
export {};
