import { MeshLayerDeclaration, type MeshLayerConfig, ViewContext, type MeshLayerUpdate } from "../../core";
import { RainMesh, type RainConfig } from "../../mesh";
type LayerDescription = {
    rain?: Partial<RainConfig>;
};
export type RainMeshLayerConfig = MeshLayerConfig & LayerDescription;
export type RainMeshLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class RainMeshLayer extends MeshLayerDeclaration<RainMeshLayerConfig, RainMeshLayerUpdate, RainMesh> {
    private config;
    constructor(view: ViewContext, config: RainMeshLayerConfig);
    getPassKey(): "opaque" | "transparent";
    createMesh(): RainMesh;
    onUpdateConfig(updates: RainMeshLayerUpdate): void;
    update(time: number): void;
    protected disposeMesh(): void;
    getRainMesh(): RainMesh | undefined;
}
export {};
