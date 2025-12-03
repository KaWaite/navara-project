import { WebGLCubeRenderTarget, type PerspectiveCamera, type WebGLRenderer, type WebGLRenderTarget } from "three";
import { RenderPass } from "../effects";
import type { Scenes } from "../scene";
export declare class SkyEnvMapPass extends RenderPass {
    private _scenes;
    private _camera;
    private cubeCamera;
    cubeRenderTarget: WebGLCubeRenderTarget;
    constructor(scenes: Scenes, camera: PerspectiveCamera, resolution?: number);
    render(renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    getEnvMapTexture(): import("three").CubeTexture;
    dispose(): void;
}
