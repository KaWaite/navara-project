import type { EventHandler } from "@navara/core";
import { PolylineMesh as NavaraPolylineMesh, PolylineMaterial } from "@navara/engine";
import { BufferAttribute, BufferGeometry, Color, ShaderMaterial } from "three";
import type { ViewEvents } from "..";
import type { BufferLoader } from "../event";
import type { CommonUniforms } from "../uniforms";
import { BatchedFeatureMesh, type BatchedFeatureAttributes } from "./batchedFeature";
import type { DefaultBatchAttributeValues } from "./batchTexture";
type Attributes = BatchedFeatureAttributes<{
    position: BufferAttribute;
    start: BufferAttribute;
    normal: BufferAttribute;
    start_normal: BufferAttribute;
    right_normal_and_texture_coordinate_normalization_y: BufferAttribute;
    end_normal_and_texture_coordinate_normalization_x: BufferAttribute;
    forward_offset: BufferAttribute;
    attrBatchId: BufferAttribute;
}>;
export declare class PolylineMesh extends BatchedFeatureMesh<BufferGeometry<Attributes>, ShaderMaterial> {
    constructor(mesh: NavaraPolylineMesh, buf: BufferLoader, uniforms: CommonUniforms, viewEvents: EventHandler<ViewEvents>);
    private initGeometry;
    private initMaterial;
    _update(material: PolylineMaterial, active: boolean): void;
    get color(): any;
    _getDefaultBatchAttributeValues(): DefaultBatchAttributeValues;
    _setFeatureColor(color: Color): void;
    _setFeatureShow(visible: boolean): void;
    dispose(viewEvents: EventHandler<ViewEvents>): void;
}
export {};
