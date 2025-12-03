import type { BaseEventMap, XYZ } from "@navara/core";
import { Object3D } from "three";
import type { Scenes } from "../scene";
import { LayerDeclaration, type BaseInstance, type LayerDeclarationConfig, type LayerDeclarationConfigUpdate } from "./LayerDeclaration";
import type { ViewContext } from "./ViewContext";
export type MeshLayerConfig = {
    type: "mesh";
    position?: XYZ;
    scale?: XYZ;
    rotation?: XYZ;
} & LayerDeclarationConfig;
export type MeshLayerUpdate = Pick<MeshLayerConfig, "position" | "scale" | "rotation"> & LayerDeclarationConfigUpdate;
type PassKey = keyof Pick<Scenes, "opaque" | "transparent" | "mrt" | "skyEnvMap">;
export type MeshBaseInstance<Instance extends object = object> = Instance extends Object3D ? Instance : Instance extends {
    raw: infer Raw extends Object3D;
} ? Instance & {
    raw: Raw;
} & BaseInstance : Instance & BaseInstance;
export declare abstract class MeshLayerDeclaration<Config extends MeshLayerConfig = MeshLayerConfig, UpdateConfig extends MeshLayerUpdate = MeshLayerUpdate, InstanceObj extends Object3D | {
    raw: Object3D;
} = Object3D | {
    raw: Object3D;
}, CustomEvent extends BaseEventMap = BaseEventMap, Instance extends MeshBaseInstance<InstanceObj> = MeshBaseInstance<InstanceObj>> extends LayerDeclaration<Config, UpdateConfig, Instance, CustomEvent> {
    position?: XYZ;
    scale?: XYZ;
    rotation?: XYZ;
    private prevPassKey?;
    constructor(view: ViewContext, config?: Config);
    protected getPassKey(): PassKey;
    abstract createMesh(): Instance;
    get raw(): (Instance extends Object3D<import("three").Object3DEventMap> ? Instance : never) | (Instance extends {
        raw: infer Raw extends Object3D;
    } ? Raw : never) | undefined;
    onCreate(): void;
    removeFromScene(passKey: PassKey): void;
    addToScene(passKey: PassKey): void;
    onUpdateConfig(updates: UpdateConfig): void;
    onPassKeyChange(): void;
    onDestroy(): void;
    update?(time: number): void;
    onResize?(width: number, height: number): void;
}
export {};
