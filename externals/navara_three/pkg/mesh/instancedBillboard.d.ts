import { BillboardMesh as NavaraBillboardMesh } from "@navara/engine";
import { type BufferLoader } from "../event";
import { BillboardMesh } from "./billboard";
import { InstancedMesh } from "./instanced";
export declare class InstancedBillboardMesh extends InstancedMesh<BillboardMesh> {
    _init(m: NavaraBillboardMesh, buf: BufferLoader): Promise<void>;
    private initMeshes;
    _update(m: NavaraBillboardMesh, buf: BufferLoader, active: boolean): Promise<void>;
}
