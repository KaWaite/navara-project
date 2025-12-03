import type { EventHandler, TileHandle } from "@navara/core";
import type { PolygonMesh as NavaraPolygonMesh } from "@navara/engine";
import type { BufferLoader } from "../";
import type { ViewEvents } from "../..";
import { PolygonMesh } from "../../mesh";
import type { CommonUniforms } from "../../uniforms";
export declare function renderPolygon(mesh: NavaraPolygonMesh, buf: BufferLoader, uniforms: CommonUniforms, tileHandle: TileHandle | undefined, viewEvents: EventHandler<ViewEvents>): Promise<PolygonMesh>;
export declare function processPolygonChanged(obj: PolygonMesh, m: NavaraPolygonMesh, active: boolean, tileHandle: TileHandle | undefined): void;
