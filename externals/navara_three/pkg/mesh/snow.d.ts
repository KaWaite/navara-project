import type { XYZ } from "@navara/core";
import { BufferGeometry, CanvasTexture, Points, Uniform, Vector3, type WebGLProgramParametersWithUniforms, Camera, ShaderMaterial, UniformsLib, Color } from "three";
declare class SnowPointsMaterial extends ShaderMaterial {
    uniforms: (typeof UniformsLib)["points"] & {
        areaWidth: Uniform<number>;
        areaHeight: Uniform<number>;
        speed: Uniform<number>;
        time: Uniform<number>;
        movementStrength: Uniform<Vector3>;
        movementSpeed: Uniform<Vector3>;
        cameraPosition: Uniform<Vector3>;
        meshOffset: Uniform<Vector3>;
        bounds: Uniform<Vector3>;
        followCamera: Uniform<boolean>;
    };
    isPointsMaterial: boolean;
    color: Color;
    map: CanvasTexture;
    size: number;
    fog: boolean;
    sizeAttenuation: boolean;
    constructor();
    onBeforeCompile(shader: WebGLProgramParametersWithUniforms): void;
}
export type SnowConfig = {
    particleCount: number;
    radius: number;
    areaWidth: number;
    areaHeight: number;
    speed: number;
    size: number;
    color: number;
    movementStrength: XYZ;
    movementSpeed: XYZ;
    /** The mesh follows a camera. It takes an effect that looks like the mesh is rendered infinitely. */
    followCamera: boolean;
    /** Opacity is reduced in proportion to the maximum height and the camera height. */
    maxHeight: number;
    opacity: number;
};
export declare const DefaultSnowConfig: SnowConfig;
export declare class SnowMesh extends Points<BufferGeometry, SnowPointsMaterial> {
    private readonly _config;
    private readonly _material;
    private readonly _lastCameraPosition;
    private readonly _cameraOffset;
    private readonly xAxisBase;
    private readonly yAxisBase;
    private readonly zAxisBase;
    private readonly baseMatrix4;
    constructor(config?: Partial<SnowConfig>);
    private initializeGeometry;
    private updateMaterial;
    set particleCount(value: number);
    get particleCount(): number;
    set radius(value: number);
    get radius(): number;
    set areaWidth(value: number);
    get areaWidth(): number;
    set areaHeight(value: number);
    get areaHeight(): number;
    set speed(value: number);
    get speed(): number;
    set size(value: number);
    get size(): number;
    set color(value: number);
    get color(): number;
    set movementStrength(value: XYZ);
    get movementStrength(): XYZ;
    set movementSpeed(value: XYZ);
    get movementSpeed(): XYZ;
    set followCamera(value: boolean);
    get followCamera(): boolean;
    set maxHeight(value: number);
    get maxHeight(): number;
    set opacity(value: number);
    get opacity(): number;
    updateConfig(newConfig: Partial<SnowConfig>): void;
    getConfig(): SnowConfig;
    update(time: number, camera: Camera): void;
    updateTime(time: number): void;
    dispose(): void;
}
export {};
