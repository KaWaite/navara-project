import { EventHandler } from "@navara/core";
import { AmbientLight as AmbientLightImpl, Color } from "three";
export type AmbientLightEvents = {
    _needsUpdate: () => void;
};
export type AmbientLightOptions = {
    color?: Color;
    intensity?: number;
};
export declare class AmbientLight extends EventHandler<AmbientLightEvents> {
    raw: AmbientLightImpl;
    private options;
    constructor(options?: AmbientLightOptions);
    get color(): Color;
    set color(v: Color);
    get intensity(): number;
    set intensity(v: number);
    get visible(): boolean;
    set visible(v: boolean);
}
