import { PointMesh as NavaraPointMesh } from "@navara/engine";
import type { BufferLoader } from "..";
import { InstancedPointMesh } from "../../mesh";
export declare function renderPoint(m: NavaraPointMesh, buf: BufferLoader): Promise<InstancedPointMesh>;
export declare function processPointChanged(obj: InstancedPointMesh, m: NavaraPointMesh, buf: BufferLoader, active: boolean): void;
