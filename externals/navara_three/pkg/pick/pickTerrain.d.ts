import type { Nullable } from "@navara/core";
import { WebGLRenderer, Vector3, PerspectiveCamera, Texture } from "three";
export declare class TerrainPicker {
    private depthPickPass;
    constructor();
    pick(x: number, y: number, renderer: WebGLRenderer, depthTexture: Texture, camera: PerspectiveCamera): Nullable<Vector3>;
    private _unpackRGBAToDepth;
    private _sampleDepthAt;
    dispose(): void;
    private _reconstructWorldPosition;
}
