import { EventHandler, type BaseEventMap } from "@navara/core";
import type { ViewContext } from "./ViewContext";
export type LayerDeclarationConfig = {
    id?: string;
    visible?: boolean;
    sort?: number;
};
export type LayerDeclarationConfigUpdate = Pick<LayerDeclarationConfig, "visible">;
export type BaseInstance = {
    visible: boolean;
};
export type LayerDeclarationEvents = {
    _needsUpdate: () => void;
};
export declare abstract class LayerDeclaration<Config extends LayerDeclarationConfig = LayerDeclarationConfig, UpdateConfig extends LayerDeclarationConfigUpdate = LayerDeclarationConfigUpdate, Instance extends BaseInstance = BaseInstance, CustomEvent extends BaseEventMap = BaseEventMap> extends EventHandler<LayerDeclarationEvents & CustomEvent> {
    readonly id: string;
    readonly sort?: number;
    protected view: ViewContext;
    protected _instance: Instance | undefined;
    private _visible?;
    constructor(view: ViewContext, config?: Config);
    abstract onCreate(): void;
    onUpdateConfig(updates: UpdateConfig): void;
    onDestroy(): void;
    get visible(): boolean;
    set visible(v: boolean);
}
