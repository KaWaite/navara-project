import { EventHandler } from "@navara/core";
import { SkyLightProbe as SkyLightProbeImpl, type PrecomputedTextures } from "@takram/three-atmosphere";
import { Vector3 } from "three";
export type SkyLightProbeEvents = {
    _needsUpdate: () => void;
};
export type SkyLightProbeOptions = {
    intensity?: number;
};
export declare class SkyLightProbe extends EventHandler<SkyLightProbeEvents> {
    raw: SkyLightProbeImpl;
    constructor(options?: SkyLightProbeOptions);
    setTextures(textures: PrecomputedTextures): void;
    updateSunDirection(sunDirection: Vector3): void;
    updatePosition(position: Vector3): void;
    get visible(): boolean;
    set visible(v: boolean);
    get intensity(): number;
    set intensity(v: number);
    update(): void;
}
