import { Color, Mesh, Object3D } from "three";
import type { PickableMesh } from "./pickableMesh";
export type InstancedMeshOptions = {
    renderOrder?: number;
};
export declare class InstancedMesh<M extends Object3D> extends Mesh implements PickableMesh {
    constructor(options?: InstancedMeshOptions);
    addWithBatchIndex(m: M, batchIndex: number): void;
    meshes(): M[];
    getMeshByBatchIndex(batchIndex: number): M;
    setFeatureColorByBatchIndex(batchIndex: number, color: Color): void;
    setFeatureShowByBatchIndex(batchIndex: number, visible: boolean): void;
    setFeatureHeightByBatchIndex(batchIndex: number, height: number): void;
    _setPickable(pickable: boolean): void;
}
