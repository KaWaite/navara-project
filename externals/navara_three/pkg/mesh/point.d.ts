import { PointMaterial as NavaraPointMaterial } from "@navara/engine";
import { Color, Sprite } from "three";
import { FeatureMesh } from "./featureMesh";
export declare class PointMesh extends Sprite implements FeatureMesh {
    constructor(material: NavaraPointMaterial, batchId: number, active: boolean);
    private initMaterial;
    _update(material: NavaraPointMaterial, active: boolean): void;
    _setFeatureColor(color: Color): void;
    _getFeatureColor(): Color;
    _setFeatureShow(visible: boolean): void;
    _setFrustumCulled(culled: boolean): void;
    _setFeatureExtrudedHeight(_height: number): void;
    _setFeatureHeight(height: number): void;
}
