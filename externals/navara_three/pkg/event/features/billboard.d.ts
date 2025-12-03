import type { BillboardMesh as NavaraBillboardMesh } from "@navara/engine";
import type { BufferLoader } from "..";
import { InstancedBillboardMesh } from "../../mesh";
export declare function renderBillboard(m: NavaraBillboardMesh, buf: BufferLoader): Promise<InstancedBillboardMesh | undefined>;
export declare function processBillboardChanged(obj: InstancedBillboardMesh, m: NavaraBillboardMesh, buf: BufferLoader, active: boolean): Promise<void>;
