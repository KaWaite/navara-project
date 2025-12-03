import type { WebGLRenderer, WebGLRenderTarget } from "three";
export declare class BufferView {
    canvas: HTMLCanvasElement;
    canvasForImage: HTMLCanvasElement;
    constructor(width: number, height: number, { styleWidth, styleHeight, }?: {
        styleWidth?: string;
        styleHeight?: string;
    });
    render(renderer: WebGLRenderer, renderTarget: WebGLRenderTarget): void;
    dispose(): void;
}
