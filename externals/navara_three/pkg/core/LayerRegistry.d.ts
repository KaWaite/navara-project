import type { ViewContext } from "./ViewContext";
/**
 * Base abstract class for all registry types in the Navara system.
 * Provides common functionality for registering, creating, and managing different types of components.
 */
export declare abstract class LayerRegistry<TConstructor, TInstance, TConfig extends Record<string, unknown> = Record<string, unknown>> {
    view: ViewContext;
    protected registry: Map<string, TConstructor>;
    constructor(view: ViewContext);
    /**
     * Register a new type with the given name and constructor
     */
    register(name: string, constructor: TConstructor): void;
    /**
     * Unregister a type by name
     */
    unregister(name: string): boolean;
    /**
     * Check if a type is registered
     */
    has(name: string): boolean;
    /**
     * Get all registered type names
     */
    getRegisteredTypes(): string[];
    /**
     * Get the number of registered types
     */
    size(): number;
    /**
     * Clear all registered types
     */
    clear(): void;
    /**
     * Create an instance of the specified type with the given configuration
     * Must be implemented by subclasses
     */
    abstract create(name: string, config: TConfig): TInstance;
    /**
     * Find a type name from a configuration object
     * Useful for auto-detecting type from config keys
     */
    findTypeFromConfig(config: Record<string, unknown>): string | null;
    /**
     * Get constructor by name (protected method for subclasses)
     */
    protected getConstructor(name: string): TConstructor | undefined;
}
