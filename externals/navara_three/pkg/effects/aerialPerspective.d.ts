import { AerialPerspectiveEffect, type AtmosphereOverlay, type AtmosphereShadow, type AtmosphereShadowLength } from "@takram/three-atmosphere";
import { type PerspectiveCamera, Texture } from "three";
import type { Atmosphere } from "../atmosphere";
import { Pass, type EffectOptions } from "../effects";
import { CustomEffectPass } from "./CustomEffectPass";
export type AerialPerspectiveOptions = {
    inscatter?: boolean;
    transmittance?: boolean;
    irradiance?: boolean;
    sky?: boolean;
    sun?: boolean;
    moon?: boolean;
} & EffectOptions;
export declare const DEFAULT_AERIAL_PERSPECTIVE_OPTIONS: Required<AerialPerspectiveOptions>;
export declare class AerialPerspective extends Pass<CustomEffectPass, AerialPerspectiveEffect, AerialPerspectiveOptions> {
    atmosphere: Atmosphere;
    private cloudsShadows;
    constructor(atmosphere: Atmosphere, camera: PerspectiveCamera, normalBuffer: Texture, _options?: AerialPerspectiveOptions);
    onUpdate: () => void;
    init(): void;
    onTextureLoaded: () => void;
    onOverlayChanged: (v: AtmosphereOverlay | null) => void;
    onShadowChanged: (v: AtmosphereShadow | null) => void;
    onShadowLengthChanged: (v: AtmosphereShadowLength | null) => void;
    onEnableShadowChanged: (v: boolean) => void;
    _update(): void;
    get inscatter(): boolean;
    set inscatter(v: boolean);
    get transmittance(): boolean;
    set transmittance(v: boolean);
    get irradiance(): boolean;
    set irradiance(v: boolean);
    get sky(): boolean;
    set sky(v: boolean);
    get sun(): boolean;
    set sun(v: boolean);
    get moon(): boolean;
    set moon(v: boolean);
}
