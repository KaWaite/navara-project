import { EffectLayerRegistry } from "./EffectLayerRegistry";
import { LightLayerRegistry } from "./LightLayerRegistry";
import { MeshLayerRegistry } from "./MeshLayerRegistry";
import type { ViewContext } from "./ViewContext";
/**
 * Centralized registry manager that bundles all registry types.
 * This provides direct property access to different types of registries
 * in the Navara system.
 */
export declare class Registries {
    mesh: MeshLayerRegistry;
    light: LightLayerRegistry;
    effect: EffectLayerRegistry;
    constructor(view: ViewContext);
    /**
     * Get registry statistics for debugging and monitoring
     */
    getStats(): {
        mesh: {
            registeredCount: number;
            types: string[];
        };
        light: {
            registeredCount: number;
            types: string[];
        };
        effect: {
            registeredCount: number;
            types: string[];
        };
    };
    /**
     * Clear all registries
     */
    clearAll(): void;
}
