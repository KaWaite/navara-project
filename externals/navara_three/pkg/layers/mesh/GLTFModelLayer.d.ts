import { Group, AnimationAction, AnimationClip } from "three";
import { MeshLayerDeclaration, type MeshLayerConfig, type MeshLayerUpdate, type ViewContext } from "../../core";
type LayerDescription = {
    gltfModel?: {
        url: string;
        castShadow?: boolean;
        receiveShadow?: boolean;
        animationEnabled?: boolean;
        animationClips?: string[];
        animationActiveClip?: string;
        animationSpeed?: number;
        animationLoop?: boolean;
        animationCrossfadeDuration?: number;
        animationAutoPlay?: boolean;
    };
};
export type GLTFModelLayerConfig = MeshLayerConfig & LayerDescription;
export type GLTFModelLayerUpdate = MeshLayerUpdate & LayerDescription;
export type AnimationDetails = {
    name: string;
    duration: number;
    tracks: number;
    isLooping: boolean;
    timeScale: number;
};
export type AnimationState = {
    isPlaying: boolean;
    currentAnimation: string | null;
    isBlendMode: boolean;
    blendAnimations: {
        name: string;
        weight: number;
        isPlaying: boolean;
    }[];
    playbackTime: number;
    progress: number;
};
export type GLTFModelLayerEvent = {
    load: () => void;
    animationReady: () => void;
};
export declare class GLTFModelLayer extends MeshLayerDeclaration<GLTFModelLayerConfig, GLTFModelLayerUpdate, Group, GLTFModelLayerEvent> {
    private config;
    private loader;
    private gltf;
    private mixer;
    private clips;
    private actions;
    private currentAction;
    private animationSpeed;
    private isLooping;
    private activeBlendAnimations;
    private isBlendMode;
    constructor(view: ViewContext, config: GLTFModelLayerConfig);
    createMesh(): Group;
    private loadModel;
    private setupModel;
    onUpdateConfig(updates: GLTFModelLayerUpdate): void;
    protected disposeMesh(): void;
    /**
     * Dispose animation-related resources
     */
    private disposeAnimationResources;
    private shouldInitializeAnimation;
    private initAnimation;
    /**
     * Get available animation clip names
     */
    getAnimationAvailable(): string[];
    /**
     * Get animation details information
     */
    getAnimationDetails(name?: string): AnimationDetails | AnimationDetails[];
    /**
     * Get current playback state
     */
    getAnimationCurrentState(): AnimationState;
    /**
     * Get animation clip directly
     */
    getAnimationClip(name: string): AnimationClip | null;
    /**
     * Get animation action directly
     */
    getAnimationAction(name: string): AnimationAction | null;
    /**
     * Play specified animation
     */
    playAnimation(name: string): boolean;
    /**
     * Cross-fade between animations
     */
    crossFadeAnimation(from: string, to: string, duration: number): boolean;
    /**
     * Ensure the specified animation is playing
     */
    private ensureAnimationPlaying;
    /**
     * Ensure the 'from' animation is currently active
     */
    private ensureFromAnimationActive;
    /**
     * Execute the actual crossfade between animations
     */
    private executeCrossFade;
    /**
     * Play multiple animations simultaneously with weights
     */
    blendAnimations(animations: {
        name: string;
        weight: number;
    }[]): void;
    /**
     * Stop current animation
     */
    stopAnimation(): void;
    /**
     * Stop all animations
     */
    stopAllAnimations(): void;
    /**
     * Pause current animation
     */
    pauseAnimation(): void;
    /**
     * Resume paused animation
     */
    resumeAnimation(): void;
    /**
     * Normalize all animation weights (adjust total to 1.0)
     */
    normalizeAnimationWeights(): void;
    /**
     * Set animation speed
     */
    setAnimationSpeed(speed: number): void;
    /**
     * Change animation loop setting
     */
    setAnimationLoop(loop: boolean): void;
    /**
     * Set weight for specific animation
     */
    setAnimationWeight(name: string, weight: number): void;
    /**
     * Update animation mixer (needs to be called every frame)
     */
    updateAnimation(deltaTime: number): void;
    /**
     * Dispose animation-related resources
     */
    disposeAnimation(): void;
    /**
     * Internal method to update animation mixer
     */
    private updateAnimationMixer;
    /**
     * Update method called every frame
     * Automatically called by Three.js framework
     */
    update(time: number): void;
    /**
     * Get currently playing animation name
     */
    private getCurrentAnimationName;
    private lastUpdateTime?;
}
export {};
