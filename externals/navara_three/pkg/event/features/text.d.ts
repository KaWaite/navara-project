import { type TextMesh as NavaraTextMesh } from "@navara/engine";
import type { BufferLoader } from "..";
import { InstancedTextMesh } from "../../mesh";
import type { RenderFlag } from "../../type";
import type { CommonUniforms } from "../../uniforms";
export declare function renderText(m: NavaraTextMesh, buf: BufferLoader, uniforms: CommonUniforms): Promise<InstancedTextMesh>;
export declare function processTextChanged(obj: InstancedTextMesh, m: NavaraTextMesh, buf: BufferLoader, active: boolean, renderFlag: RenderFlag): void;
