import { EventHandler, Observed, type XYZ } from "@navara/core";
import { type AtmosphereOverlay, type AtmosphereShadow, type AtmosphereShadowLength, type PrecomputedTextures } from "@takram/three-atmosphere";
import { Vector3, Matrix4, type WebGLRenderer } from "three";
export type AtmosphereEvents = {
    _needsUpdate: () => void;
    _textureLoaded: () => void;
    _disposed: () => void;
    sunChanged: (sunDirection: Vector3) => void;
};
export type AtmosphereOptions = {
    atmosphereAssetsUrl?: string;
    stbnUrl?: string;
    date?: Date;
};
export declare const DEFAULT_ATMOSPHERE_OPTIONS: Required<AtmosphereOptions>;
/**
 * Context for atmosphere.
 * Some variables are shared with Clouds and AerialPerspective.
 */
export declare class Atmosphere extends EventHandler<AtmosphereEvents> {
    private renderer;
    sunDirection: Vector3;
    moonDirection: Vector3;
    private rotationMatrix;
    textures?: PrecomputedTextures;
    /**
     * @private
     */
    _overlay: Observed<AtmosphereOverlay | null>;
    /**
     * @private
     */
    _shadow: Observed<AtmosphereShadow | null>;
    /**
     * @private
     */
    _shadowLength: Observed<AtmosphereShadowLength | null>;
    /**
     * @private
     */
    _enableShadows: Observed<boolean>;
    private needsUpdate;
    private options;
    constructor(renderer: WebGLRenderer, options?: AtmosphereOptions);
    onUpdate: () => void;
    initTextures(): Promise<void>;
    init(): Promise<void>;
    dispose(): void;
    getSunDirection(): Vector3;
    getMoonDirection(): Vector3;
    getRotationMatrix(): Matrix4;
    _update(): void;
    isAtNight(position: XYZ): boolean;
    get date(): Date;
    set date(v: Date);
}
