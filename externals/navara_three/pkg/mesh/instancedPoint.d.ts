import { PointMesh as NavaraPointMesh } from "@navara/engine";
import { type BufferLoader } from "../event";
import { InstancedMesh, type InstancedMeshOptions } from "./instanced";
import { PointMesh } from "./point";
export declare class InstancedPointMesh extends InstancedMesh<PointMesh> {
    constructor(m: NavaraPointMesh, buf: BufferLoader, options?: InstancedMeshOptions);
    private initMeshes;
    _update(m: NavaraPointMesh, buf: BufferLoader, active: boolean): void;
}
