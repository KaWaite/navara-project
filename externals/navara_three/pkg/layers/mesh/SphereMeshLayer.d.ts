import { Mesh, MeshLambertMaterial, SphereGeometry } from "three";
import { MeshLayerDeclaration, type MeshLayerConfig, type ViewContext } from "../../core";
import type { MeshLayerUpdate } from "../../core/MeshLayerDeclaration";
type LayerDescription = {
    sphere?: {
        radius?: number;
        widthSegments?: number;
        heightSegments?: number;
        phiStart?: number;
        phiLength?: number;
        thetaStart?: number;
        thetaLength?: number;
        color?: number;
        emissive?: number;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
    };
};
export type SphereMeshLayerConfig = MeshLayerConfig & LayerDescription;
export type SphereMeshLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class SphereMeshLayer extends MeshLayerDeclaration<SphereMeshLayerConfig, SphereMeshLayerUpdate, Mesh<SphereGeometry, MeshLambertMaterial>> {
    private config;
    constructor(view: ViewContext, config: SphereMeshLayerConfig);
    createMesh(): Mesh<SphereGeometry, MeshLambertMaterial, import("three").Object3DEventMap>;
    onUpdateConfig(updates: SphereMeshLayerUpdate): void;
    protected disposeMesh(): void;
}
export {};
