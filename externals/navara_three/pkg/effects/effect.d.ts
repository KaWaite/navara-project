import { EventHandler, type BaseEventMap } from "@navara/core";
import { EffectPass, Effect as PostProcessingEffect, Pass as PostProcessingPass } from "postprocessing";
import type { Camera } from "three";
export type EffectOptions = {
    enabled?: boolean;
};
export declare const DEFAULT_EFFECT_OPTIONS: Required<EffectOptions>;
export type EffectEvents = {
    _needsUpdate: () => void;
};
export declare class Pass<P extends PostProcessingPass, E extends PostProcessingEffect | unknown, O extends EffectOptions = EffectOptions, BaseEv extends BaseEventMap = BaseEventMap, Ev extends BaseEventMap & EffectEvents = BaseEv & EffectEvents> extends EventHandler<Ev> {
    rawPass: P;
    rawEffect: E;
    protected options: O;
    constructor(pass: P, effect: E, options?: O);
    get raw(): P;
    get enabled(): boolean;
    set enabled(v: boolean);
    get visible(): boolean;
    set visible(v: boolean);
    protected onMounted(): void;
    dispose(): void;
}
export declare class Effect<E extends PostProcessingEffect, O extends EffectOptions = EffectOptions, Ev extends EffectEvents = EffectEvents> extends Pass<EffectPass, E, O, Ev> {
    constructor(camera: Camera, effect: E, options?: O);
}
