import type { Color, Material } from "three";
export declare class FeatureMesh {
    _setFeatureColor(_color: Color, _material?: Material): void;
    _getFeatureColor(): Color;
    _setFeatureShow(_visible: boolean): void;
    _setFeatureExtrudedHeight(_height: number): void;
    _setFeatureHeight(_height: number): void;
    _setFrustumCulled(_culled: boolean): void;
}
export declare const isFeatureMesh: (v: object) => v is FeatureMesh;
