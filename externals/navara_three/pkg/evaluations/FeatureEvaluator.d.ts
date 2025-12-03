import { type FeatureId } from "@navara/core";
import type { ModelMaterial as NavaraModelMaterial, PointMaterial, PolygonMaterial, PolylineMaterial, TextMaterial } from "@navara/engine";
import { Object3D } from "three";
import { Color } from "../Color";
import type { FeatureHandler } from "../event";
import type { ExtractProperties } from "../type";
type AvailableMaterialProperty = ExtractProperties<PointMaterial & PolylineMaterial & PolygonMaterial & NavaraModelMaterial & TextMaterial>;
export type EvaluatableMaterialProperty = {
    color: AvailableMaterialProperty["color"];
    show: AvailableMaterialProperty["show"];
    extrudedHeight: AvailableMaterialProperty["extrudedHeight"];
    height: AvailableMaterialProperty["height"];
    text: AvailableMaterialProperty["text"];
};
type EvaluatableMaterialPropertyKey = keyof EvaluatableMaterialProperty;
type EvaluatedMaterialProperty = {
    color: Color;
    show: boolean;
    extrudedHeight: number;
    height: number;
    text: string;
};
export type EvaluatedValue = {
    [K in EvaluatableMaterialPropertyKey]: EvaluatedMaterialProperty[K];
};
export declare class FeatureEvaluator {
    private handler;
    private featureId;
    private cachedBatchedProperties?;
    private batchIds;
    obj: Object3D;
    private result;
    constructor(handler: FeatureHandler, featureId: FeatureId, obj: Object3D);
    get id(): bigint;
    readFeatureProperties(): Map<string, unknown> | undefined;
    /**
     * Evaluate feature styles by feature's property.
     * Note that layer color is overridden by the evaluated color.
     */
    evaluate(f: (batchId: number, property: Map<string, unknown> | undefined) => Partial<EvaluatedValue>): void;
    private update;
    private apply;
}
export {};
