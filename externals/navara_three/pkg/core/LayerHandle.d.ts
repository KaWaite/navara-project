import { EventHandler } from "@navara/core";
import { LayerDeclaration, type LayerDeclarationConfigUpdate } from "./LayerDeclaration";
export type LayerHandleEvent = {
    deleted: () => void;
};
export declare class LayerHandle<T extends LayerDeclaration = LayerDeclaration> extends EventHandler<LayerHandleEvent> {
    private layer;
    constructor(layer: T);
    update(updates: T extends LayerDeclaration<infer _A, infer B> ? B : LayerDeclarationConfigUpdate): void;
    get ref(): T;
    delete(): void;
    get id(): string;
    get visible(): boolean;
    set visible(visible: boolean);
    get sort(): number | undefined;
}
