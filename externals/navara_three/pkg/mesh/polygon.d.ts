import type { EventHandler, TileHandle } from "@navara/core";
import { PolygonMesh as NavaraPolygonMesh, PolygonMaterial } from "@navara/engine";
import { BufferAttribute, BufferGeometry, Color, MeshLambertMaterial } from "three";
import { PolygonOutlineMesh, type ViewEvents } from "..";
import type { BufferLoader } from "../event";
import type { CommonUniforms } from "../uniforms";
import { BatchedFeatureMesh, type BatchedFeatureAttributes } from "./batchedFeature";
import type { DefaultBatchAttributeValues } from "./batchTexture";
type Attributes = BatchedFeatureAttributes<{
    position?: BufferAttribute;
    position_3d_high?: BufferAttribute;
    position_3d_low?: BufferAttribute;
    normal: BufferAttribute;
    scaleNormalAndCap: BufferAttribute;
    attrBatchId: BufferAttribute;
}>;
export declare class PolygonMesh extends BatchedFeatureMesh<BufferGeometry<Attributes>, MeshLambertMaterial> {
    outline?: PolygonOutlineMesh;
    private _baseBoundingSphere?;
    constructor(buf?: BufferGeometry<Attributes>, mat?: MeshLambertMaterial);
    init(mesh: NavaraPolygonMesh, buf: BufferLoader, uniforms: CommonUniforms, tileHandle: TileHandle | undefined, viewEvents: EventHandler<ViewEvents>): this;
    clone(): this;
    private initGeometry;
    private enableWater;
    private initMaterial;
    /**
     * Override a material that is used to generate a shadow map.
     */
    initDepthMaterial(): void;
    _update(material: PolygonMaterial, active: boolean, isTexturized: boolean): void;
    private _recalculateBoundingSphere;
    _getDefaultBatchAttributeValues(): DefaultBatchAttributeValues;
    _setFeatureColor(color: Color): void;
    _setFeatureShow(visible: boolean): void;
    _setFeatureExtrudedHeight(height: number): void;
    _setFeatureHeight(height: number): void;
    get water(): boolean;
    set water(v: boolean);
    dispose(viewEvents: EventHandler<ViewEvents>): void;
}
export {};
