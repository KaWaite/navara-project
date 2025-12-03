import { EventHandler } from "@navara/core";
import { StarsGeometry, StarsMaterial, type PrecomputedTextures } from "@takram/three-atmosphere";
import { Points, Matrix4, Vector3 } from "three";
export type StarsEvents = {
    _needsUpdate: () => void;
};
export type StarsOptions = {
    visible?: boolean;
    pointSize?: number;
    intensity?: number;
    background?: boolean;
};
export declare const DEFAULT_STARS_OPTIONS: Required<StarsOptions>;
export declare class Stars extends EventHandler<StarsEvents> {
    raw: Points<StarsGeometry, StarsMaterial>;
    options: Required<StarsOptions>;
    constructor(data: ArrayBuffer, options?: StarsOptions);
    static fromUrl(url?: string, options?: StarsOptions): Stars;
    static fromUrlAsync(url?: string, options?: StarsOptions): Promise<Stars | undefined>;
    setTextures(textures: PrecomputedTextures): void;
    setRotationFromMatrix(matrix: Matrix4): void;
    updateSunDirection(sunDirection: Vector3): void;
    get visible(): boolean;
    set visible(v: boolean);
    get pointSize(): number;
    set pointSize(v: number);
    get intensity(): number;
    set intensity(v: number);
    get background(): boolean;
    set background(v: boolean);
}
