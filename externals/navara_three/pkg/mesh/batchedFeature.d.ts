import { BufferAttribute, BufferGeometry, Color, Material, Mesh, type NormalBufferAttributes } from "three";
import type { CustomObject3DEventMap } from "../object3DEvent";
import { type BatchedAttributeName, type BatchTextureConfig, type DefaultBatchAttributeValues } from "./batchTexture";
import type { FeatureMesh } from "./featureMesh";
import { PickableMesh } from "./pickableMesh";
export type BatchedFeatureAttributes<Attr extends NormalBufferAttributes = NormalBufferAttributes> = {
    _batchid?: BufferAttribute;
} & Attr;
export declare const FEATURE_BATCH_TEXTURE_CONFIG: BatchTextureConfig;
export declare class BatchedFeatureMesh<Buf extends BufferGeometry<BatchedFeatureAttributes> = BufferGeometry<BatchedFeatureAttributes>, M extends Material = Material, E extends CustomObject3DEventMap = CustomObject3DEventMap> extends Mesh<Buf, M, E> implements FeatureMesh, PickableMesh {
    static _isBatchedAttributeName(v: string): v is BatchedAttributeName;
    _setBatchIndex(batchIndex: Float32Array | null | undefined, size: number | null | undefined): void;
    _initBatchedMaterial(): void;
    _initBatchDataTexture(batchLength: number): void;
    _getBatchDataTexture(): import("three").DataTexture | undefined;
    _updateBatchAttribute(batchId: number, attribute: BatchedAttributeName, value: number | number[] | boolean): void;
    needsUpdate(): void;
    _getDefaultBatchAttributeValues(): DefaultBatchAttributeValues;
    _setFeatureColor(color: Color): void;
    _getFeatureColor(): Color;
    _setFeatureShow(visible: boolean): void;
    _setFeatureExtrudedHeight(height: number): void;
    _setFeatureHeight(height: number): void;
    _setFrustumCulled(_culled: boolean): void;
    _setPickable(pickable: boolean): void;
    clone(): this;
}
