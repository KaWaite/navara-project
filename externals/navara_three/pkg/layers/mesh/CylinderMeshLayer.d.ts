import { CylinderGeometry, Mesh, MeshLambertMaterial } from "three";
import { MeshLayerDeclaration, type MeshLayerConfig, type MeshLayerUpdate, type ViewContext } from "../../core";
type LayerDescription = {
    cylinder?: {
        radiusTop?: number;
        radiusBottom?: number;
        height?: number;
        radialSegments?: number;
        heightSegments?: number;
        openEnded?: boolean;
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
export type CylinderMeshLayerConfig = MeshLayerConfig & LayerDescription;
export type CylinderMeshLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class CylinderMeshLayer extends MeshLayerDeclaration<CylinderMeshLayerConfig, CylinderMeshLayerUpdate, Mesh<CylinderGeometry, MeshLambertMaterial>> {
    private config;
    constructor(view: ViewContext, config: CylinderMeshLayerConfig);
    createMesh(): Mesh<CylinderGeometry, MeshLambertMaterial, import("three").Object3DEventMap>;
    onUpdateConfig(updates: CylinderMeshLayerUpdate): void;
    protected disposeMesh(): void;
}
export {};
