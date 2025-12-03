import { EventHandler, Observed } from "@navara/core";
import { SkyMaterial, type AtmosphereShadowLength, type PrecomputedTextures } from "@takram/three-atmosphere";
import { Mesh, PlaneGeometry, Vector3 } from "three";
export type SkyMeshEvents = {
    _needsUpdate: () => void;
};
export type SkyMeshOptions = {
    visible?: boolean;
    sun?: boolean;
    moon?: boolean;
    /**
     * @default 1
     */
    moonScale?: number;
    /**
     * @default 1
     */
    moonIntensity?: number;
    /**
     * @default 0.004675
     */
    sunAngularRadius?: number;
    /**
     * Render as env map
     */
    envMap?: boolean;
};
export declare class SkyMesh extends EventHandler<SkyMeshEvents> {
    raw: Mesh<PlaneGeometry, SkyMaterial>;
    private options;
    private handleShadowLengthChanged?;
    constructor(options?: SkyMeshOptions);
    setTextures(textures: PrecomputedTextures): void;
    setShadowLengthHandler(shadowLengthObservable: Observed<AtmosphereShadowLength | null>): void;
    updateSunDirection(sunDirection: Vector3): void;
    updateMoonDirection(moonDirection: Vector3): void;
    private setupMoonProperties;
    get visible(): boolean;
    set visible(v: boolean);
    get sun(): boolean;
    set sun(v: boolean);
    get moon(): boolean;
    set moon(v: boolean);
    get moonScale(): number;
    set moonScale(v: number);
    get moonIntensity(): number;
    set moonIntensity(v: number);
    get sunAngularRadius(): number;
    set sunAngularRadius(v: number);
    dispose(): void;
}
