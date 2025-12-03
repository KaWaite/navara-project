import { Globe } from "@navara/core";
import { DepthCopyPass } from "postprocessing";
import { DepthTexture, Material, Scene, WebGLRenderTarget, type PerspectiveCamera, type WebGLRenderer } from "three";
import { RenderPass } from "../effects";
import type { Scenes } from "../scene";
import type { MeshCache } from "../type";
import { AllDepthCopyPass, NormalCopyPass } from ".";
export declare class CustomRenderPass extends RenderPass {
    protected _camera: PerspectiveCamera;
    protected _scenes: Scenes;
    protected _drapedFeatureMaterials: Map<string, Material>;
    protected _meshes: MeshCache;
    gbufferRenderTarget: WebGLRenderTarget;
    private copyPass;
    globeDepthCopyPass: DepthCopyPass;
    globeNormalCopyPass: NormalCopyPass;
    allDepthCopyPass: AllDepthCopyPass;
    disableShadow: boolean;
    private globe;
    private combinedScene;
    private shadowScene;
    private dummyShadowRenderTarget;
    private debugNormalCopyPass?;
    private allowTransparent;
    constructor(scenes: Scenes, camera: PerspectiveCamera, meshes: MeshCache, drapedFeatureMaterials: Map<string, Material>, inputBuffer: WebGLRenderTarget, globe: Globe, options?: {
        debugNormal?: boolean;
        disableShadow?: boolean;
        allowTransparent?: boolean;
    });
    protected _renderWithLight(renderer: WebGLRenderer, scene: Scene): void;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    setDepthTexture(depthTexture: DepthTexture): void;
    setSize(width: number, height: number): void;
    protected _renderDrapedMesh(renderer: WebGLRenderer): void;
}
