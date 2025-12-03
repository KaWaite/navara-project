import { Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { MeshLayerDeclaration, type MeshLayerConfig, type MeshLayerUpdate, type ViewContext } from "../../core";
type LayerDescription = {
    plane?: {
        width?: number;
        height?: number;
        widthSegments?: number;
        heightSegments?: number;
        color?: number;
        emissive?: number;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
    };
};
export type PlaneMeshLayerConfig = MeshLayerConfig & LayerDescription;
export type PlaneMeshLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class PlaneMeshLayer extends MeshLayerDeclaration<PlaneMeshLayerConfig, PlaneMeshLayerUpdate, Mesh<PlaneGeometry, MeshLambertMaterial>> {
    private config;
    constructor(view: ViewContext, config: PlaneMeshLayerConfig);
    createMesh(): Mesh<PlaneGeometry, MeshLambertMaterial, import("three").Object3DEventMap>;
    onUpdateConfig(updates: PlaneMeshLayerUpdate): void;
    protected disposeMesh(): void;
}
export {};
