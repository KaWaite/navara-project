import { BillboardMaterial as NavaraBillboardMaterial } from "@navara/engine";
import { Color, Sprite } from "three";
import { FeatureMesh } from "./featureMesh";
export declare class BillboardMesh extends Sprite implements FeatureMesh {
    constructor();
    _init(material: NavaraBillboardMaterial, batchId: number, active: boolean): Promise<void>;
    private initMaterial;
    _update(material: NavaraBillboardMaterial, active: boolean): Promise<void>;
    _setFeatureColor(color: Color): void;
    _getFeatureColor(): Color;
    _setFeatureShow(visible: boolean): void;
    _setFrustumCulled(culled: boolean): void;
    _setFeatureExtrudedHeight(_height: number): void;
    _setFeatureHeight(height: number): void;
}
