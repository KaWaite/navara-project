import { MeshLayerDeclaration, type MeshLayerConfig, ViewContext, type MeshLayerUpdate } from "../../core";
import { SmoothLine, type SmoothLineConfig } from "../../mesh";
type LayerDescription = {
    smoothLines?: Partial<SmoothLineConfig> | Partial<SmoothLineConfig>[];
};
export type SmoothLineMeshLayerConfig = MeshLayerConfig & LayerDescription;
export type SmoothLineMeshLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class SmoothLineMeshLayer extends MeshLayerDeclaration<SmoothLineMeshLayerConfig, SmoothLineMeshLayerUpdate, SmoothLine> {
    private config;
    constructor(view: ViewContext, config: SmoothLineMeshLayerConfig);
    protected getPassKey(): "mrt";
    createMesh(): SmoothLine;
    onUpdateConfig(updates: SmoothLineMeshLayerUpdate): void;
    onResize(width: number, height: number): void;
    protected disposeMesh(): void;
}
export {};
