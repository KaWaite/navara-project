import { EffectComposer, Pass as PostProcessingPass } from "postprocessing";
import { Scene, WebGLRenderer, Group } from "three";
export type RenderPassOrchestratorOptions = {
    halfFloat?: boolean;
    multisampling?: number;
};
export type NamedPass = {
    name: string;
    pass: PostProcessingPass;
};
/**
 * Orchestrate rendering passes with ordered management and flexible insertion.
 */
export declare class RenderPassOrchestrator {
    lights: Group<import("three").Object3DEventMap>;
    scenes: {
        mrt: Scene;
        globe: Scene;
        draped: Scene;
        opaque: Scene;
        transparent: Scene;
        skyEnvMap: Scene;
    };
    effectComposer: EffectComposer;
    private passMap;
    constructor(renderer: WebGLRenderer, options: RenderPassOrchestratorOptions);
    setSize(width: number, height: number): void;
    render(): void;
    /**
     * Add a named pass to the end of the pass list.
     */
    addPass(name: string, pass: PostProcessingPass): void;
    /**
     * Insert a pass before the specified target pass.
     */
    insertPassBefore(targetName: string, name: string, pass: PostProcessingPass): void;
    /**
     * Insert a pass after the specified target pass.
     */
    insertPassAfter(targetName: string, name: string, pass: PostProcessingPass): void;
    /**
     * Remove a pass by name.
     */
    removePass(name: string): void;
    /**
     * Get a pass by name.
     */
    getPass(name: string): PostProcessingPass | undefined;
    /**
     * Get all pass names in order.
     */
    getPassNames(): string[];
    /**
     * Clear all passes.
     */
    clearPasses(): void;
    /**
     * Rebuild the index map after manual list modification.
     */
    private rebuildIndexMap;
}
