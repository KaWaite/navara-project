import { MeshLayerDeclaration, type MeshLayerConfig, ViewContext, type MeshLayerUpdate } from "../../core";
import { ArcLine, type ArcLineConfig } from "../../mesh";
type LayerDescription = {
    arcLines?: Partial<ArcLineConfig> | Partial<ArcLineConfig>[];
};
export type ArclineMeshLayerConfig = MeshLayerConfig & LayerDescription;
export type ArclineMeshLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class ArclineMeshLayer extends MeshLayerDeclaration<ArclineMeshLayerConfig, ArclineMeshLayerUpdate, ArcLine> {
    private config;
    constructor(view: ViewContext, config: ArclineMeshLayerConfig);
    protected getPassKey(): "mrt";
    createMesh(): ArcLine;
    onUpdateConfig(updates: ArclineMeshLayerUpdate): void;
    onResize(width: number, height: number): void;
    protected disposeMesh(): void;
}
export {};
