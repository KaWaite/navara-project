import { Color, DataTexture, Material } from "three";
export declare const BATCH_TEXTURE_ROW: readonly ["COLOR_SHOW", "HEIGHT", "EXTRUDED_HEIGHT"];
export type BatchTextureRowKey = (typeof BATCH_TEXTURE_ROW)[number];
export type BatchTextureConfig = {
    rows: BatchTextureRowKey[];
    batchLength: number;
};
export declare const BATCHED_ATTRIBUTE_NAMES: readonly ["color", "show", "height", "extrudedHeight"];
export type BatchedAttributeName = (typeof BATCHED_ATTRIBUTE_NAMES)[number];
export declare function encodeFloatToRGBA(value: number): [number, number, number, number];
/**
 * Set batched texture rows to the material.
 */
export declare function initBatchedMaterial(material: Material, config: BatchTextureConfig): void;
export declare function initBatchDataTexture(material: Material, config: BatchTextureConfig): void;
export declare function getRowIndex(material: Material, row: BatchTextureRowKey): number;
export declare function getBatchDataTexture(material: Material): DataTexture | undefined;
export type DefaultBatchAttributeValues = {
    color: Color;
};
export declare function updateBatchAttribute(material: Material, batchId: number, attribute: BatchedAttributeName, value: number | number[] | boolean, defaultValues: DefaultBatchAttributeValues): void;
