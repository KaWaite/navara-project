import type { XYZ } from "@navara/core";
import { Mesh, MeshLambertMaterial, TubeGeometry } from "three";
import { MeshLayerDeclaration, type MeshLayerConfig, type ViewContext } from "../../core";
import type { MeshLayerUpdate } from "../../core/MeshLayerDeclaration";
type LayerDescription = {
    tube?: {
        points?: XYZ[];
        tubularSegments?: number;
        radius?: number;
        radialSegments?: number;
        closed?: boolean;
        tension?: number;
        color?: number;
        emissive?: number;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
    };
};
export type TubeMeshLayerConfig = MeshLayerConfig & LayerDescription;
export type TubeMeshLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class TubeMeshLayer extends MeshLayerDeclaration<TubeMeshLayerConfig, TubeMeshLayerUpdate, Mesh<TubeGeometry, MeshLambertMaterial>> {
    private config;
    constructor(view: ViewContext, config: TubeMeshLayerConfig);
    createMesh(): Mesh<TubeGeometry, MeshLambertMaterial, import("three").Object3DEventMap>;
    onUpdateConfig(updates: TubeMeshLayerUpdate): void;
    protected disposeMesh(): void;
}
export {};
