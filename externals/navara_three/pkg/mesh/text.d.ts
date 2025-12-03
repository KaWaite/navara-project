import type { TextMaterial as NavaraTextMaterial } from "@navara/engine";
import { Color, Group, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { Text } from "troika-three-text";
import type { CommonUniforms } from "../uniforms";
import type { FeatureMesh } from "./featureMesh";
import type { PickableMesh } from "./pickableMesh";
export declare class TextMesh extends Group implements FeatureMesh, PickableMesh {
    text: Text;
    background?: Mesh<PlaneGeometry, MeshBasicMaterial>;
    constructor(meshMaterial: NavaraTextMaterial, uniforms: CommonUniforms, batchId: number);
    private initText;
    _createBackground(): Mesh<PlaneGeometry, MeshBasicMaterial, import("three").Object3DEventMap>;
    _updateTextByMaterial(material: NavaraTextMaterial, active: boolean, needRender?: () => void): void;
    updateBackground(): void;
    setText(text: string): void;
    _setFeatureColor(color: Color): void;
    _getFeatureColor(): Color;
    _setFeatureShow(visible: boolean): void;
    _setFrustumCulled(culled: boolean): void;
    _setFeatureExtrudedHeight(_height: number): void;
    _setFeatureHeight(height: number): void;
    _setPickable(pickable: boolean): void;
    private recalculateOutlineParams;
}
