import { EffectPass } from "postprocessing";
import type { DepthPackingStrategies, Texture } from "three";
export declare class CustomEffectPass extends EffectPass {
    private customDepthTexture;
    private customDepthPacking;
    /**
     * Override setDepthTexture to use custom depth texture if provided.
     */
    setDepthTexture(): void;
    setCustomDepthTexture(texture: Texture | null, depthPacking?: DepthPackingStrategies): void;
    getCustomDepthTexture(): Texture | null;
}
