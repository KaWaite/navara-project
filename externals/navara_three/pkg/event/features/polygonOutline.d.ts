import type { EventHandler } from "@navara/core";
import type { PolygonMesh as NavaraPolygonMesh } from "@navara/engine";
import type { BufferLoader } from "../";
import type { ViewEvents } from "../..";
import { PolygonOutlineMesh } from "../../mesh";
export declare function renderPolygonOutline(mesh: NavaraPolygonMesh, buf: BufferLoader, viewEvents: EventHandler<ViewEvents>): Promise<PolygonOutlineMesh>;
export declare function processPolygonOutlineChanged(obj: PolygonOutlineMesh, m: NavaraPolygonMesh, active: boolean): void;
