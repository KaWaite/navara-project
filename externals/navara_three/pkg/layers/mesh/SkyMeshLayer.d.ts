import { MeshLayerDeclaration, type MeshLayerConfig, ViewContext, type MeshLayerUpdate } from "../../core";
import { SkyMesh, type SkyMeshOptions } from "../../mesh";
type LayerDescription = {
    sky?: Partial<SkyMeshOptions>;
};
export type SkyMeshLayerConfig = MeshLayerConfig & LayerDescription;
export type SkyMeshLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class SkyMeshLayer extends MeshLayerDeclaration<SkyMeshLayerConfig, SkyMeshLayerUpdate, SkyMesh> {
    private config;
    private _skyMesh;
    constructor(view: ViewContext, config: SkyMeshLayerConfig);
    getPassKey(): "opaque" | "skyEnvMap";
    createMesh(): SkyMesh;
    onUpdateConfig(updates: SkyMeshLayerUpdate): void;
    update(_time: number): void;
    protected disposeMesh(): void;
    getSkyMesh(): SkyMesh | null;
}
export {};
