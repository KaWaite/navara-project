import type { EventHandler } from "@navara/core";
import { PolylineMesh as NavaraPolylineMesh } from "@navara/engine";
import type { BufferLoader } from "../";
import type { ViewEvents } from "../..";
import { PolylineMesh } from "../../mesh";
import type { CommonUniforms } from "../../uniforms";
export declare function renderPolyline(mesh: NavaraPolylineMesh, buf: BufferLoader, uniforms: CommonUniforms, viewEvents: EventHandler<ViewEvents>): Promise<PolylineMesh>;
export declare function processPolylineChanged(obj: PolylineMesh, m: NavaraPolylineMesh, active: boolean): void;
