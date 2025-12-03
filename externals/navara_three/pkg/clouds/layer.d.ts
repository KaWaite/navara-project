import { EventHandler } from "@navara/core";
import { CloudLayer as CloudLayerImpl, type CloudLayerLike, type TextureChannel } from "@takram/three-clouds";
export type CloudLayerEvents = {
    _needsUpdate: () => void;
};
export type CloudLayerOptions = Pick<CloudLayer, "channel" | "altitude" | "height" | "densityScale" | "shapeAmount" | "shapeDetailAmount" | "weatherExponent" | "shapeAlteringBias" | "coverageFilterWidth" | "shadow" | "expTerm" | "exponent" | "linearTerm" | "constantTerm">;
/**
 * See [CloudLayer](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#cloudlayer).
 */
export declare class CloudLayer extends EventHandler<CloudLayerEvents> {
    impl: CloudLayerImpl;
    constructor(defaultOptions?: CloudLayerLike, options?: CloudLayerOptions);
    onUpdate(): void;
    get channel(): TextureChannel;
    set channel(v: TextureChannel);
    get altitude(): number;
    set altitude(v: number);
    get height(): number;
    set height(v: number);
    get densityScale(): number;
    set densityScale(v: number);
    get shapeAmount(): number;
    set shapeAmount(v: number);
    get shapeDetailAmount(): number;
    set shapeDetailAmount(v: number);
    get weatherExponent(): number;
    set weatherExponent(v: number);
    get shapeAlteringBias(): number;
    set shapeAlteringBias(v: number);
    get coverageFilterWidth(): number;
    set coverageFilterWidth(v: number);
    get shadow(): boolean;
    set shadow(v: boolean);
    /**
     * `expTerm` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get expTerm(): number;
    set expTerm(v: number);
    /**
     * `exponent` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get exponent(): number;
    set exponent(v: number);
    /**
     * `linearTerm` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get linearTerm(): number;
    set linearTerm(v: number);
    /**
     * `constantTerm` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get constantTerm(): number;
    set constantTerm(v: number);
}
