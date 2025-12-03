import { EffectLayerDeclaration, LayerHandle } from "./core";
import { Layer, type LayerEvent } from "./layer";
export declare class LayersManager {
    private layers;
    add(l: Layer | LayerHandle): void;
    get(id: string): Layer | LayerHandle<import("./core").LayerDeclaration<import("./core").LayerDeclarationConfig, import("./core").LayerDeclarationConfigUpdate, import("./core/LayerDeclaration").BaseInstance, import("@navara/core").BaseEventMap>> | undefined;
    emitById<K extends keyof LayerEvent>(k: K, id: string, ...args: Parameters<LayerEvent[K]>): void;
    emitAll<K extends keyof LayerEvent>(k: K, ...args: Parameters<LayerEvent[K]>): void;
    getResourceLayers(): Generator<Layer, void, unknown>;
    getEffectLayers(): Generator<LayerHandle<EffectLayerDeclaration>>;
    getDeclarationLayers(): Generator<LayerHandle>;
}
