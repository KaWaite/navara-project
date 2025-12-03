import { ShaderMaterial, type Camera, type ShaderMaterialParameters, type Texture } from "three";
export type SSRMaterialParameters = {
    inputBuffer?: Texture | null;
    geometryBuffer?: Texture | null;
    depthBuffer?: Texture | null;
    iterations?: number;
    binarySearchIterations?: number;
    pixelZSize?: number;
    pixelStride?: number;
    pixelStrideZCutoff?: number;
    maxRayDistance?: number;
    screenEdgeFadeStart?: number;
    eyeFadeStart?: number;
    eyeFadeEnd?: number;
    jitter?: number;
    generateRayTracingBuffer?: boolean;
} & ShaderMaterialParameters;
export declare const ssrMaterialParametersDefaults: {
    iterations: number;
    binarySearchIterations: number;
    pixelZSize: number;
    pixelStride: number;
    pixelStrideZCutoff: number;
    maxRayDistance: number;
    screenEdgeFadeStart: number;
    eyeFadeStart: number;
    eyeFadeEnd: number;
    jitter: number;
    generateRayTracingBuffer: true;
};
export declare class SSRMaterial extends ShaderMaterial {
    constructor(params?: SSRMaterialParameters);
    setSize(width: number, height: number): void;
    copyCameraSettings(camera?: Camera | null): void;
    get inputBuffer(): Texture | null;
    set inputBuffer(value: Texture | null);
    get geometryBuffer(): Texture | null;
    set geometryBuffer(value: Texture | null);
    get depthBuffer(): Texture | null;
    set depthBuffer(value: Texture | null);
    get depthPacking(): number;
    set depthPacking(value: number);
    get generateRayTracingBuffer(): boolean;
    set generateRayTracingBuffer(value: boolean);
}
