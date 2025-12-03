import type { EventHandler } from "@navara/core";
import { ModelMesh as NavaraModelMesh } from "@navara/engine";
import type { BufferLoader } from "../";
import type { ViewEvents } from "../..";
import { ModelMesh } from "../../mesh/model";
import type { CommonUniforms } from "../../uniforms";
export declare function renderModel(m: NavaraModelMesh, buf: BufferLoader, uniforms: CommonUniforms, viewEvents: EventHandler<ViewEvents>): Promise<ModelMesh | undefined>;
export declare function processModelChanged(obj: ModelMesh, m: NavaraModelMesh, active: boolean): void;
