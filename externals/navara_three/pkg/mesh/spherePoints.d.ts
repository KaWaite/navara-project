import { Vector3, Camera, Points, WebGLRenderer, Scene } from "three";
export type SpherePointOptions = {
    visible?: boolean;
    size?: number;
    color?: number;
};
/**
 * Renders points as spheres using impostor technique.
 */
export declare class SpherePoints extends Points {
    pointOpts: Required<SpherePointOptions>;
    constructor(opts?: SpherePointOptions);
    setPoints(points: Vector3[]): void;
    setOptions(patch: Partial<SpherePointOptions>): void;
    onBeforeRender(renderer: WebGLRenderer, _scene: Scene, camera: Camera): void;
    dispose(): void;
    private _ensurePointsGeometry;
    private _updatePositionsAttr;
    private _makePointsMat;
    private _refreshPoints;
    private _refreshPointsUniforms;
}
