import { BufferGeometry, type Camera, Mesh, ShaderMaterial, Uniform, Vector3, Vector2, Color } from "three";
export type RainConfig = {
    particleCount: number;
    speed: number;
    color: number;
    areaWidth: number;
    areaHeight: number;
    width: number;
    height: number;
    radius: number;
    opacity: number;
    /** Maximum alpha value for the lit side of raindrops */
    alphaMax: number;
    /** Minimum alpha value for the shadowed side of raindrops */
    alphaMin: number;
    /** The mesh follows a camera. It takes an effect that looks like the mesh is rendered infinitely. */
    followCamera: boolean;
    /** Opacity is reduced in proportion to the maximum height and the camera height. */
    maxHeight: number;
};
export declare const DefaultRainConfig: RainConfig;
declare class RainMaterial extends ShaderMaterial {
    uniforms: {
        time: Uniform<number>;
        speed: Uniform<number>;
        color: Uniform<Color>;
        areaWidth: Uniform<number>;
        areaHeight: Uniform<number>;
        size: Uniform<Vector2>;
        opacity: Uniform<number>;
        alphaMax: Uniform<number>;
        alphaMin: Uniform<number>;
        meshOffset: Uniform<Vector3>;
        bounds: Uniform<Vector3>;
        cameraRight: Uniform<Vector3>;
        cameraUp: Uniform<Vector3>;
        followCamera: Uniform<boolean>;
        radius: Uniform<number>;
    };
    constructor();
}
export declare class RainMesh extends Mesh<BufferGeometry, RainMaterial> {
    private readonly _config;
    private readonly _material;
    private _lastCameraPosition;
    private readonly _cameraOffset;
    private readonly xAxisBase;
    private readonly yAxisBase;
    private readonly zAxisBase;
    private readonly baseMatrix4;
    constructor(config?: Partial<RainConfig>);
    private updateUniforms;
    private updateBounds;
    set particleCount(value: number);
    get particleCount(): number;
    set speed(value: number);
    get speed(): number;
    set color(value: number);
    get color(): number;
    set areaWidth(value: number);
    get areaWidth(): number;
    set areaHeight(value: number);
    get areaHeight(): number;
    set width(value: number);
    get width(): number;
    set height(value: number);
    get height(): number;
    set radius(value: number);
    get radius(): number;
    set opacity(value: number);
    get opacity(): number;
    set alphaMax(value: number);
    get alphaMax(): number;
    set alphaMin(value: number);
    get alphaMin(): number;
    set followCamera(value: boolean);
    get followCamera(): boolean;
    set maxHeight(value: number);
    get maxHeight(): number;
    updateConfig(newConfig: Partial<RainConfig>): void;
    getConfig(): RainConfig;
    /**
     * Update the rain mesh
     * @param time Current time
     * @param camera Camera instance
     */
    update(time: number, camera: Camera): void;
    updateTime(time: number): void;
    dispose(): void;
}
export {};
