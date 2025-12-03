import { EventHandler, type LngLatHeight, type XYZ } from "@navara/core";
import { Core, CameraControlUpdateEvent } from "@navara/engine";
import { PerspectiveCamera } from "three";
import type { ExtractProperties, RemoveFreeRecursively } from "./type";
export type CameraEvent = {
    movestart: () => void;
    move: () => void;
    moveend: () => void;
    frustumChanged: () => void;
};
export type CameraOptions = ExtractProperties<RemoveFreeRecursively<CameraControlUpdateEvent>>;
export declare class ThreeViewCamera extends EventHandler<CameraEvent> {
    raw: PerspectiveCamera;
    private _core;
    private _status;
    constructor(cam?: PerspectiveCamera);
    set core(core: Core | undefined);
    updateStatus(): void;
    get positionECEF(): XYZ;
    get positionGeographic(): LngLatHeight;
    get orientation(): import("@navara/engine").CameraOrientation;
    get fovy(): number | undefined;
    set fov(val: number);
    set near(val: number);
    get near(): number;
    set far(val: number);
    get far(): number;
    set options(options: CameraOptions);
}
