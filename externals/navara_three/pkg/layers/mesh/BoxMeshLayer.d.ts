import { BoxGeometry, Mesh, MeshLambertMaterial } from "three";
import { MeshLayerDeclaration, type MeshLayerConfig, type MeshLayerUpdate, type ViewContext } from "../../core";
type LayerDescription = {
    box?: {
        width?: number;
        height?: number;
        depth?: number;
        widthSegments?: number;
        heightSegments?: number;
        depthSegments?: number;
        color?: number;
        emissive?: number;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
    };
};
export type BoxMeshLayerConfig = MeshLayerConfig & LayerDescription;
export type BoxMeshLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class BoxMeshLayer extends MeshLayerDeclaration<BoxMeshLayerConfig, BoxMeshLayerUpdate, Mesh<BoxGeometry, MeshLambertMaterial>> {
    private config;
    constructor(view: ViewContext, config: BoxMeshLayerConfig);
    createMesh(): Mesh<BoxGeometry, MeshLambertMaterial, import("three").Object3DEventMap>;
    onUpdateConfig(updates: BoxMeshLayerUpdate): void;
    protected disposeMesh(): void;
}
export {};
