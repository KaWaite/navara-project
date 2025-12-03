import type { Globe } from "@navara/core";
import { WebGLRenderer, WebGLRenderTarget, PerspectiveCamera, Material, Scene } from "three";
import { CustomRenderPass } from "../passes";
import type { Scenes } from "../scene";
import type { MeshCache } from "../type";
export type PickHelperOptions = {
    debug: boolean;
};
export declare class PickHelper extends CustomRenderPass {
    private element;
    private pickingTexture;
    private pixelBuffer;
    private _renderer;
    private onPickCallback;
    private debugBufferView?;
    private debugRenderTarget?;
    private mouseMoved;
    private mouseDownHandler;
    private mouseMoveHandler;
    private mouseUpHandler;
    constructor(element: HTMLElement, renderer: WebGLRenderer, camera: PerspectiveCamera, scenes: Scenes, meshes: MeshCache, drapedFeatureMaterials: Map<string, Material>, onPickCallback: (pickArr: number[]) => void, inputBuffer: WebGLRenderTarget, globe: Globe, options?: PickHelperOptions);
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    enablePick(bPick: boolean): void;
    private traverseModel;
    private togglePickable;
    processRender(target: WebGLRenderTarget): void;
    protected _renderWithWorld(renderer: WebGLRenderer, scene: Scene): void;
    renderDebugCanvas(): void;
    private onMouseClick;
    dispose(): void;
}
