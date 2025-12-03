import type { TileHandle } from "@navara/core";
import { OrthographicCamera, Scene, WebGLRenderer, Mesh, Group } from "three";
export type Scenes = {
    light: Group;
    mrt: Scene;
    globe: Scene;
    draped: Scene;
    opaque: Scene;
    transparent: Scene;
    skyEnvMap: Scene;
};
export declare class SceneGroup extends Group {
}
export declare class TexturizedSceneByTileCoordinates {
    map: Map<bigint, SceneGroup>;
    renderer: WebGLRenderer;
    camera: OrthographicCamera;
    constructor(renderer: WebGLRenderer);
    get(handle: TileHandle): SceneGroup;
    add(handle: TileHandle, layerId: string, mesh: Mesh, fromParent?: boolean): import("three").Object3D<import("three").Object3DEventMap>;
    addFromParentScene(handle: TileHandle, layerId: string, parentScene: Scene): void;
    showMeshFromParent(handle: TileHandle, layerId: string, enabledParent: boolean): void;
    hasCurrentMesh(handle: TileHandle, layerId: string): import("three").Object3D<import("three").Object3DEventMap> | undefined;
    findSceneByLayerId(handle: TileHandle, layerId: string): Scene | undefined;
    remove(handle: TileHandle, layerId: string): void;
    getNeedsUpdate(handle: TileHandle): boolean;
    setNeedsUpdate(handle: TileHandle, v: boolean): void;
}
