import { Camera } from "three";
import { Pass as PassWrapper, type EffectEvents, type EffectOptions } from "../effect";
import { FogLightDownsampledPass } from "./FogLightDownsampledPass";
import { FogLightEffect, type FogLightDefinition, type FogLightEffectOptions } from "./FogLightEffect";
export type FogLightEvents = EffectEvents;
export type FogLightOptions = FogLightEffectOptions & EffectOptions & {
    downsample?: number;
};
export declare const DEFAULT_FOG_LIGHT_OPTIONS: FogLightOptions;
export declare class FogLight extends PassWrapper<FogLightDownsampledPass, FogLightEffect, FogLightOptions, FogLightEvents> {
    constructor(camera: Camera, options?: FogLightOptions);
    protected onMounted(): void;
    private updateLights;
    private updateFogDensity;
    get lights(): FogLightDefinition[];
    set lights(lights: FogLightDefinition[]);
    get fogDensity(): number;
    set fogDensity(value: number);
    get useSurfaceLighting(): boolean;
    set useSurfaceLighting(value: boolean);
    private updateUseSurfaceLighting;
    get downsample(): number;
    set downsample(value: number);
    get maxLightsPerTile(): number;
    set maxLightsPerTile(value: number);
    get extentScale(): number;
    set extentScale(value: number);
    get maxFar(): number;
    set maxFar(value: number);
    get debugShowGrid(): boolean;
    set debugShowGrid(v: boolean);
}
