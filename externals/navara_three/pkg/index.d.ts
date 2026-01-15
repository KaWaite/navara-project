import { AerialPerspectiveEffect } from '@takram/three-atmosphere';
import { AmbientLight as AmbientLight_2 } from 'three';
import { AnimationAction } from 'three';
import { AnimationClip } from 'three';
import { ArrowHelper } from 'three';
import { AtmosphereOverlay } from '@takram/three-atmosphere';
import { AtmosphereShadow } from '@takram/three-atmosphere';
import { AtmosphereShadowLength } from '@takram/three-atmosphere';
import { AxesHelper } from 'three';
import { B3dmLayerDescription } from '@navara/engine';
import { BillboardMaterial } from '@navara/engine';
import { BillboardMesh as BillboardMesh_2 } from '@navara/engine';
import { BlendFunction } from 'postprocessing';
import { BoxGeometry } from 'three';
import { BufferAttribute } from 'three';
import { BufferGeometry } from 'three';
import { BufferGeometryEventMap } from 'three';
import { Camera } from 'three';
import { CameraControlUpdateEvent } from '@navara/engine';
import { CameraFrustum } from '@navara/engine-api';
import { CameraOrientation } from '@navara/engine';
import { CanvasTexture } from 'three';
import { CascadedDirectionalLights } from '@navara/three_csm';
import { CascadedShadowMaps } from '@navara/three_csm';
import { Cesium3dTilesLayerDescription } from '@navara/engine';
import { CloudLayer as CloudLayer_2 } from '@takram/three-clouds';
import { CloudLayerLike } from '@takram/three-clouds';
import { CloudsEffect } from '@takram/three-clouds';
import { CloudsQualityPreset } from '@takram/three-clouds';
import { Color as Color_3 } from 'three';
import { CopyPass as CopyPass_2 } from 'postprocessing';
import { Core } from '@navara/engine';
import { CSMHelper } from '@navara/three_csm';
import { CubeTexture } from 'three';
import { CylinderGeometry } from 'three';
import { Data3DTexture } from 'three';
import { DataTexture } from 'three';
import { DepthCopyPass } from 'postprocessing';
import { DepthOfFieldEffect } from 'postprocessing';
import { DepthPackingStrategies } from 'three';
import { DepthTexture } from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { Effect as Effect_2 } from 'postprocessing';
import { EffectComposer } from 'postprocessing';
import { EffectPass } from 'postprocessing';
import { ElevationDecoder } from '@navara/engine';
import { EllipsoidGeodesic } from '@navara/engine-api';
import { FXAAEffect } from 'postprocessing';
import { GaussianBlurPass } from 'postprocessing';
import { GeoJsonLayerDescription } from '@navara/engine';
import { Globe } from '@navara/engine';
import { GLTFLoader } from 'three-stdlib';
import { Group } from 'three';
import { ImageLoader } from 'three';
import { InstancedBufferGeometry } from 'three';
import { LensFlareEffect } from '@takram/three-geospatial-effects';
import { Light as Light_2 } from 'three';
import { LightProbe } from 'three';
import { LightShadow } from 'three';
import { Line2 } from 'three-stdlib';
import { LineMaterial } from 'three-stdlib';
import { LLE } from '@navara/engine-api';
import { Loader } from 'three';
import { LUT3DEffect } from 'postprocessing';
import { Material } from 'three';
import { Matrix4 } from 'three';
import { Mesh } from 'three';
import { Mesh as Mesh_2 } from '@navara/engine';
import { MeshAdded } from '@navara/engine';
import { MeshBasicMaterial } from 'three';
import { MeshChanged } from '@navara/engine';
import { MeshLambertMaterial } from 'three';
import { MeshPhysicalMaterial } from 'three';
import { MeshStandardMaterial } from 'three';
import { ModelMaterial as ModelMaterial_2 } from '@navara/engine';
import { ModelMesh as ModelMesh_2 } from '@navara/engine';
import { MvtLayerDescription } from '@navara/engine';
import { N8AOPostPass } from 'n8ao';
import { NormalBufferAttributes } from 'three';
import { Object3D } from 'three';
import { Object3DEventMap } from 'three';
import { OrthographicCamera } from 'three';
import { Pass as Pass_2 } from 'postprocessing';
import { PerspectiveCamera } from 'three';
import { Plane } from '@navara/engine-api';
import { PlaneGeometry } from 'three';
import { PntsLayerDescription } from '@navara/engine';
import { PointMaterial } from '@navara/engine';
import { PointMesh as PointMesh_2 } from '@navara/engine';
import { Points } from 'three';
import { PolygonMaterial } from '@navara/engine';
import { PolygonMesh as PolygonMesh_2 } from '@navara/engine';
import { PolylineMaterial } from '@navara/engine';
import { PolylineMesh as PolylineMesh_2 } from '@navara/engine';
import { PrecomputedTextures } from '@takram/three-atmosphere';
import { Ray } from '@navara/engine-api';
import { ReconstructableEntity } from '@navara/engine';
import { RenderPass as RenderPass_2 } from 'postprocessing';
import { Resolution } from 'postprocessing';
import { ReturnedTransferablePolygonBatchedFeature } from '@navara/engine';
import { ReturnedTransferablePolylineBatchedFeature } from '@navara/engine';
import { Scene } from 'three';
import { ShaderMaterial } from 'three';
import { ShaderMaterialParameters } from 'three';
import { ShaderPass } from 'postprocessing';
import { SkyLightProbe as SkyLightProbe_2 } from '@takram/three-atmosphere';
import { SkyMaterial } from '@takram/three-atmosphere';
import { SMAAEffect } from 'postprocessing';
import { SphereGeometry } from 'three';
import { SphericalHarmonics3 } from 'three';
import { Sprite } from 'three';
import { QualityMode as SSAOQualityMode } from 'n8ao';
import { StarsGeometry } from '@takram/three-atmosphere';
import { StarsMaterial } from '@takram/three-atmosphere';
import { SunDirectionalLight } from '@takram/three-atmosphere';
import { TerrainHeightUpdatedEvent } from '@navara/engine';
import { TerrainLayerDescription } from '@navara/engine';
import { Text as Text_2 } from 'troika-three-text';
import { TextMaterial } from '@navara/engine';
import { TextMesh as TextMesh_2 } from '@navara/engine';
import { Texture } from 'three';
import { TextureChannel } from '@takram/three-clouds';
import { TextureDataType } from 'three';
import { TextureLoader } from 'three';
import { TileLayerDescription } from '@navara/engine';
import { ToneMappingEffect } from 'postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { TransferableMartini } from '@navara/engine';
import { TransferableTile } from '@navara/engine';
import { Transform } from '@navara/engine-api';
import { TubeGeometry } from 'three';
import { Uniform } from 'three';
import { UniformsLib } from 'three';
import { Vector2 } from 'three';
import { Vector3 } from 'three';
import { VectorTileState } from '@navara/engine';
import { WebGLCubeRenderTarget } from 'three';
import { WebGLProgramParametersWithUniforms } from 'three';
import { WebGLRenderer } from 'three';
import { WebGLRenderTarget } from 'three';
import { Window as Window_2 } from '@navara/engine-api';
import { Promise as WorkerPoolPromise } from '@navara/worker';

export declare const ABORTABLE_IMAGE_LOADER: AbortableImageLoader;

export declare const ABORTABLE_TEXTURE_LOADER: AbortableTextureLoader;

declare class AbortableImageLoader extends Loader<HTMLImageElement> {
    loadAsyncWithAbort(url: string, abort?: AbortController, onProgress?: (event: ProgressEvent) => void): Promise<HTMLImageElement>;
    load(url: string, onLoad: (data: HTMLImageElement) => void, _onProgress?: (event: ProgressEvent) => void, onError?: (err: unknown, isAborted?: boolean) => void, abort?: AbortController, timeout?: number): HTMLImageElement;
}

declare class AbortableTextureLoader extends Loader {
    loadAsyncWithAbort(url: string, abort?: AbortController, onProgress?: (event: ProgressEvent) => void): Promise<Texture>;
    load(url: string, onLoad: (data: Texture) => void, onProgress?: (event: ProgressEvent) => void, onError?: (err: unknown, isAborted?: boolean) => void, abort?: AbortController): Texture;
}

export declare type AbortControllers = Map<string, AbortController>;

declare type ActualLayerDescription = LayerDescription;

export declare class AerialPerspective extends Pass<CustomEffectPass, AerialPerspectiveEffect, AerialPerspectiveOptions> {
    atmosphere: Atmosphere;
    private cloudsShadows;
    constructor(atmosphere: Atmosphere, camera: PerspectiveCamera, normalBuffer: Texture, _options?: AerialPerspectiveOptions);
    onUpdate: () => void;
    init(): void;
    onTextureLoaded: () => void;
    onOverlayChanged: (v: AtmosphereOverlay | null) => void;
    onShadowChanged: (v: AtmosphereShadow | null) => void;
    onShadowLengthChanged: (v: AtmosphereShadowLength | null) => void;
    onEnableShadowChanged: (v: boolean) => void;
    _update(): void;
    get inscatter(): boolean;
    set inscatter(v: boolean);
    get transmittance(): boolean;
    set transmittance(v: boolean);
    get irradiance(): boolean;
    set irradiance(v: boolean);
    get sky(): boolean;
    set sky(v: boolean);
    get sun(): boolean;
    set sun(v: boolean);
    get moon(): boolean;
    set moon(v: boolean);
}

export declare type AerialPerspectiveConfig = LayerDescription_21 & EffectLayerConfig;

export declare class AerialPerspectiveEffectLayer extends EffectLayerDeclaration<AerialPerspectiveConfig, AerialPerspectiveUpdate, AerialPerspective> {
    static key: string;
    static insertAfter: string[];
    private config;
    constructor(view: ViewContext, config: AerialPerspectiveConfig);
    createPass(): AerialPerspective;
    onUpdateConfig(updates: AerialPerspectiveUpdate): void;
    update(_time: number): void;
}

export declare type AerialPerspectiveOptions = {
    inscatter?: boolean;
    transmittance?: boolean;
    irradiance?: boolean;
    sky?: boolean;
    sun?: boolean;
    moon?: boolean;
} & EffectOptions;

export declare type AerialPerspectiveUpdate = LayerDescription_21 & EffectLayerUpdate;

/**
 * A pass that copies and optionally merges depth buffers.
 * This is used to accumulate depths from multiple render stages.
 */
export declare class AllDepthCopyPass extends Pass_2 {
    private _renderTarget;
    private _material;
    private _merge;
    private _copyPassRenderTarget;
    private _copyPass;
    constructor(renderTarget?: WebGLRenderTarget);
    get texture(): Texture;
    /**
     * Set the depth texture to copy from.
     */
    setDepthTexture(texture: DepthTexture | Texture | null, packing?: DepthPackingStrategies): void;
    /**
     * Copy depth buffer, optionally merging with existing depth.
     * @param merge - If true, merge with existing depth by keeping the minimum (closest) depth
     */
    copyDepth(merge?: boolean): void;
    setSize(width: number, height: number): void;
    render(renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    dispose(): void;
}

export declare class AmbientLight extends EventHandler<AmbientLightEvents> {
    raw: AmbientLight_2;
    private options;
    constructor(options?: AmbientLightOptions);
    get color(): Color_3;
    set color(v: Color_3);
    get intensity(): number;
    set intensity(v: number);
    get visible(): boolean;
    set visible(v: boolean);
}

export declare type AmbientLightEvents = {
    _needsUpdate: () => void;
};

export declare class AmbientLightLayer extends LightLayerDeclaration<AmbientLightLayerConfig, AmbientLightLayerUpdate, AmbientLight> {
    private config;
    constructor(view: ViewContext, config: AmbientLightLayerConfig);
    createLight(): AmbientLight;
    onUpdateConfig(updates: AmbientLightLayerUpdate): void;
}

export declare type AmbientLightLayerConfig = LightLayerConfig & LayerDescription_19;

export declare type AmbientLightLayerUpdate = LightLayerUpdate & LayerDescription_19;

export declare type AmbientLightOptions = {
    color?: Color_3;
    intensity?: number;
};

declare type AnimationDetails = {
    name: string;
    duration: number;
    tracks: number;
    isLooping: boolean;
    timeScale: number;
};

declare type AnimationState = {
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

export declare type AntialiasOptions = {
    enabled?: boolean;
    quality?: Quality;
    edgeDetectionMode?: EdgeDetectionMode;
} & EffectOptions;

/**
 * Apply depth clip to a mask render target
 *
 * @param renderer - WebGL renderer
 * @param depthClipMaterial - Depth clip shader material
 * @param depthClipScene - Scene containing the depth clip quad
 * @param fullscreenCamera - Orthographic camera for fullscreen rendering
 * @param maskRT - Source mask render target (with depth texture)
 * @param baseDepthTexture - Base scene depth texture (RGBA packed)
 * @param outputRT - Output render target for clipped result
 */
export declare function applyDepthClip(renderer: WebGLRenderer, depthClipMaterial: ShaderMaterial, depthClipScene: Scene, fullscreenCamera: OrthographicCamera, maskRT: WebGLRenderTarget, baseDepthTexture: Texture | null, outputRT: WebGLRenderTarget): void;

/**
 * Apply render state for mask pass rendering.
 * Sets depth behavior based on occlusion mode.
 *
 * @param material - Material to modify
 * @param isSilhouette - Whether Silhouette occlusion mode is active
 */
export declare function applyMaskPassRenderState(material: Material, isSilhouette: boolean): void;

/**
 * Apply render state for mask pass skip.
 * Used when mesh doesn't contribute to current mask pass.
 *
 * @param material - Material to modify
 */
export declare function applyMaskPassSkipState(material: Material): void;

export declare class ArcLine extends Object3D {
    private readonly _config;
    private _subMeshes;
    constructor(config?: Partial<ArcLineConfig>[]);
    private initSubMeshes;
    private createSubMesh;
    /**
     * Calculate the arc length between two points considering elevation.
     * Uses circular arc approximation for better performance.
     *        ╱‾‾‾╲
     *      ╱   h   ╲  ← sagitta (arcHeight)
     *     ╱_________╲
     *          c        ← chord (surfaceDistance)
     * Given chord length (surface distance) and sagitta (arc height),
     * we calculate the arc length using the formula:
     * - Radius: R = c²/(8h) + h/2
     * - Central angle: θ = 2 * arcsin(c/(2R))
     * - Arc length: L = R * θ
     */
    private calculateArcLength;
    private fillSingleConfigAttributes;
    private fillSingleConfigInstanceData;
    private createMaterial;
    private updateBoundingSphere;
    updateConfig(newConfig: Partial<ArcLineConfig>[]): void;
    updateMaterials(config: ArcLineConfig, subMesh: Mesh<InstancedBufferGeometry, ShaderMaterial>): void;
    onResize(width: number, height: number): void;
    dispose(): void;
}

export declare type ArcLineConfig = {
    thickness: number;
    transparent: boolean;
    opacity: number;
    segments: number;
    srcColor: Color;
    tgtColor: Color;
    height: number;
    arcHeightScale: number;
    gradation: number;
    dashed: boolean;
    dashSize: number;
    gapSize: number;
    dashOffset: number;
    geometry: LngLat[];
};

export declare class ArclineMeshLayer extends MeshLayerDeclaration<ArclineMeshLayerConfig, ArclineMeshLayerUpdate, ArcLine> {
    private config;
    constructor(view: ViewContext, config: ArclineMeshLayerConfig);
    protected getPassKey(): "mrt";
    createMesh(): ArcLine;
    onUpdateConfig(updates: ArclineMeshLayerUpdate): void;
    onResize(width: number, height: number): void;
    protected disposeMesh(): void;
}

export declare type ArclineMeshLayerConfig = MeshLayerConfig & LayerDescription_15;

export declare type ArclineMeshLayerUpdate = MeshLayerUpdate & LayerDescription_15;

export declare class ArrowHelperLayer extends MeshLayerDeclaration<ArrowHelperLayerConfig, ArrowHelperLayerUpdate, ArrowHelper> {
    private config;
    constructor(view: ViewContext, config: ArrowHelperLayerConfig);
    createMesh(): ArrowHelper;
    onUpdateConfig(updates: ArrowHelperLayerUpdate): void;
    protected disposeMesh(): void;
}

export declare type ArrowHelperLayerConfig = MeshLayerConfig & LayerDescription_14;

export declare type ArrowHelperLayerUpdate = Pick<MeshLayerConfig, "position" | "visible"> & LayerDescription_14;

/**
 * Context for atmosphere.
 * Some variables are shared with Clouds and AerialPerspective.
 */
declare class Atmosphere extends EventHandler<AtmosphereEvents> {
    private renderer;
    sunDirection: Vector3;
    moonDirection: Vector3;
    private rotationMatrix;
    textures?: PrecomputedTextures;
    /**
     * @private
     */
    _overlay: Observed<AtmosphereOverlay | null>;
    /**
     * @private
     */
    _shadow: Observed<AtmosphereShadow | null>;
    /**
     * @private
     */
    _shadowLength: Observed<AtmosphereShadowLength | null>;
    /**
     * @private
     */
    _enableShadows: Observed<boolean>;
    private needsUpdate;
    private options;
    constructor(renderer: WebGLRenderer, options?: AtmosphereOptions);
    onUpdate: () => void;
    initTextures(): Promise<void>;
    init(): Promise<void>;
    dispose(): void;
    getSunDirection(): Vector3;
    getMoonDirection(): Vector3;
    getRotationMatrix(): Matrix4;
    _update(): void;
    isAtNight(position: XYZ): boolean;
    get date(): Date;
    set date(v: Date);
}

export declare const ATMOSPHERE_ASSETS_URL: string;

declare type AtmosphereEvents = {
    _needsUpdate: () => void;
    _textureLoaded: () => void;
    _disposed: () => void;
    sunChanged: (sunDirection: Vector3) => void;
};

declare type AtmosphereOptions = {
    atmosphereAssetsUrl?: string;
    stbnUrl?: string;
    date?: Date;
};

declare type Attributes = BatchedFeatureAttributes<{
    position?: BufferAttribute;
    position_3d_high?: BufferAttribute;
    position_3d_low?: BufferAttribute;
    normal: BufferAttribute;
    scaleNormalAndCap: BufferAttribute;
    attrBatchId: BufferAttribute;
}>;

declare type Attributes_2 = BatchedFeatureAttributes<{
    position: BufferAttribute;
    start: BufferAttribute;
    normal: BufferAttribute;
    start_normal: BufferAttribute;
    right_normal_and_texture_coordinate_normalization_y: BufferAttribute;
    end_normal_and_texture_coordinate_normalization_x: BufferAttribute;
    forward_offset: BufferAttribute;
    attrBatchId: BufferAttribute;
}>;

declare type AvailableMaterialProperty = ExtractProperties<PointMaterial & PolylineMaterial & PolygonMaterial & ModelMaterial_2 & TextMaterial>;

export declare class AxesHelperLayer extends MeshLayerDeclaration<AxesHelperLayerConfig, AxesHelperLayerUpdate, AxesHelper> {
    private config;
    constructor(view: ViewContext, config: AxesHelperLayerConfig);
    createMesh(): AxesHelper;
    onUpdateConfig(updates: AxesHelperLayerUpdate): void;
    private recreate;
    protected disposeMesh(): void;
}

export declare type AxesHelperLayerConfig = MeshLayerConfig & LayerDescription_13;

export declare type AxesHelperLayerUpdate = Pick<MeshLayerConfig, "position" | "visible"> & LayerDescription_13;

export declare type B3dmLayer = WithColorSupport<Layer_2<B3dmLayerDescription & {
    type: "b3dm";
}>>;

declare type BaseEventMap = Record<string, (...args: any[]) => unknown>;

declare type BaseInstance = {
    visible: boolean;
};

export declare const BATCH_TEXTURE_ROW: readonly ["COLOR_SHOW", "HEIGHT", "EXTRUDED_HEIGHT"];

export declare const BATCHED_ATTRIBUTE_NAMES: readonly ["color", "show", "height", "extrudedHeight"];

export declare type BatchedAttributeName = (typeof BATCHED_ATTRIBUTE_NAMES)[number];

export declare type BatchedFeatureAttributes<Attr extends NormalBufferAttributes = NormalBufferAttributes> = {
    _batchid?: BufferAttribute;
} & Attr;

export declare class BatchedFeatureMesh<Buf extends BufferGeometry<BatchedFeatureAttributes> = BufferGeometry<BatchedFeatureAttributes>, M extends Material = Material, E extends CustomObject3DEventMap = CustomObject3DEventMap> extends Mesh<Buf, M, E> implements FeatureMesh, PickableMesh {
    static _isBatchedAttributeName(v: string): v is BatchedAttributeName;
    _setBatchIndex(batchIndex: Float32Array | null | undefined, size: number | null | undefined): void;
    _initBatchedMaterial(): void;
    _initBatchDataTexture(batchLength: number): void;
    _getBatchDataTexture(): DataTexture | undefined;
    _updateBatchAttribute(batchId: number, attribute: BatchedAttributeName, value: number | number[] | boolean): void;
    needsUpdate(): void;
    _getDefaultBatchAttributeValues(): DefaultBatchAttributeValues;
    _setFeatureColor(color: Color_3): void;
    _getFeatureColor(): Color_3;
    _setFeatureShow(visible: boolean): void;
    _setFeatureExtrudedHeight(height: number): void;
    _setFeatureHeight(height: number): void;
    _setFrustumCulled(_culled: boolean): void;
    _setPickable(pickable: boolean): void;
    clone(): this;
}

export declare type BatchTextureConfig = {
    rows: BatchTextureRowKey[];
    batchLength: number;
};

export declare type BatchTextureRowKey = (typeof BATCH_TEXTURE_ROW)[number];

export declare class BillboardMesh extends Sprite implements FeatureMesh {
    constructor();
    _init(material: BillboardMaterial, batchId: number, active: boolean): Promise<void>;
    private initMaterial;
    _update(material: BillboardMaterial, active: boolean): Promise<void>;
    _setFeatureColor(color: Color_3): void;
    _getFeatureColor(): Color_3;
    _setFeatureShow(visible: boolean): void;
    _setFrustumCulled(culled: boolean): void;
    _setFeatureExtrudedHeight(_height: number): void;
    _setFeatureHeight(height: number): void;
}

export declare type BlendMode = "skip" | "set" | "add" | "alpha" | "average" | "color" | "colorBurn" | "colorDodge" | "darken" | "difference" | "divide" | "dst" | "exclusion" | "hardLight" | "hardMix" | "hue" | "invert" | "invertRgb" | "lighten" | "linearBurn" | "linearDodge" | "linearLight" | "luminosity" | "multiply" | "negation" | "normal" | "overlay" | "pinLight" | "reflect" | "saturation" | "screen" | "softLight" | "src" | "subtract" | "vividLight";

declare type BoxMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

export declare class BoxMeshLayer extends MeshLayerDeclaration<BoxMeshLayerConfig, BoxMeshLayerUpdate, Mesh<BoxGeometry, MeshLambertMaterial, BoxMeshEventMap>> {
    private config;
    constructor(view: ViewContext, config: BoxMeshLayerConfig);
    createMesh(): Mesh<BoxGeometry, MeshLambertMaterial, BoxMeshEventMap>;
    onUpdateConfig(updates: BoxMeshLayerUpdate): void;
    protected disposeMesh(): void;
}

export declare type BoxMeshLayerConfig = MeshLayerConfig & LayerDescription_6;

export declare type BoxMeshLayerUpdate = MeshLayerUpdate & LayerDescription_6;

declare type BufferLoader = {
    u8: (handle: number) => Uint8Array | null;
    f32: (handle: number) => Float32Array | null;
    f64: (handle: number) => Float64Array | null;
    u32: (handle: number) => Uint32Array | null;
    removeU8: (handle: number) => Uint8Array | null;
    removeF32: (handle: number) => Float32Array | null;
    removeF64: (handle: number) => Float64Array | null;
    removeU32: (handle: number) => Uint32Array | null;
    setU8: (handle: number, bits: bigint, bytes: Uint8Array) => void;
    newU8: (bytes: Uint8Array) => number | undefined;
    newU32: (bytes: Uint32Array) => number | undefined;
    newF32: (bytes: Float32Array) => number | undefined;
    newF64: (bytes: Float64Array) => number | undefined;
    remove: (handle: number) => void;
    triggerDataRequesterFailed: (bits: bigint) => void;
};

declare class BufferView {
    canvas: HTMLCanvasElement;
    canvasForImage: HTMLCanvasElement;
    constructor(width: number, height: number, { styleWidth, styleHeight, }?: {
        styleWidth?: string;
        styleHeight?: string;
    });
    render(renderer: WebGLRenderer, renderTarget: WebGLRenderTarget): void;
    dispose(): void;
}

export declare const calcCameraPosition: (cameraPosition: Vector3, modelMatrixWorld: Matrix4) => {
    high: Vector3;
    low: Vector3;
};

export declare const calcModelMatrixRTE: (objectMatrixWorld: Matrix4, matrixWorldInverse: Matrix4, result?: Matrix4) => Matrix4;

export declare type CameraEvent = {
    movestart: () => void;
    move: () => void;
    moveend: () => void;
    frustumChanged: () => void;
};

export { CameraFrustum }

export declare type CameraOptions = ExtractProperties<RemoveFreeRecursively<CameraControlUpdateEvent>>;

declare type CameraOrientation_2 = {
    pitch?: number;
    heading?: number;
    roll?: number;
};

declare type CameraPosition = Partial<LngLatHeight> & CameraOrientation_2;

export { CascadedShadowMaps }

export declare type Cesium3dTilesLayer = WithColorSupport<Layer_2<Cesium3dTilesLayerDescription & {
    type: "cesium3dtiles";
}>>;

export declare const CLOUD_ASSETS_URL: string;

/**
 * See [CloudLayer](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#cloudlayer).
 */
declare class CloudLayer extends EventHandler<CloudLayerEvents> {
    impl: CloudLayer_2;
    constructor(defaultOptions?: CloudLayerLike, options?: CloudLayerOptions);
    onUpdate(): void;
    get channel(): TextureChannel;
    set channel(v: TextureChannel);
    get altitude(): number;
    set altitude(v: number);
    get height(): number;
    set height(v: number);
    get densityScale(): number;
    set densityScale(v: number);
    get shapeAmount(): number;
    set shapeAmount(v: number);
    get shapeDetailAmount(): number;
    set shapeDetailAmount(v: number);
    get weatherExponent(): number;
    set weatherExponent(v: number);
    get shapeAlteringBias(): number;
    set shapeAlteringBias(v: number);
    get coverageFilterWidth(): number;
    set coverageFilterWidth(v: number);
    get shadow(): boolean;
    set shadow(v: boolean);
    /**
     * `expTerm` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get expTerm(): number;
    set expTerm(v: number);
    /**
     * `exponent` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get exponent(): number;
    set exponent(v: number);
    /**
     * `linearTerm` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get linearTerm(): number;
    set linearTerm(v: number);
    /**
     * `constantTerm` of [DensityProfile](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#densityprofile).
     */
    get constantTerm(): number;
    set constantTerm(v: number);
}

declare type CloudLayerEvents = {
    _needsUpdate: () => void;
};

declare type CloudLayerOptions = Pick<CloudLayer, "channel" | "altitude" | "height" | "densityScale" | "shapeAmount" | "shapeDetailAmount" | "weatherExponent" | "shapeAlteringBias" | "coverageFilterWidth" | "shadow" | "expTerm" | "exponent" | "linearTerm" | "constantTerm">;

export declare class Clouds extends Pass<CustomEffectPass, CloudsEffect, Required<CloudsOptions>> {
    atmosphere: Atmosphere;
    private _cloudLayers;
    constructor(camera: Camera, atmosphere: Atmosphere, options?: CloudsOptions);
    init(): void;
    private onTextureLoaded;
    private onDisposed;
    _update(): void;
    dispose(): void;
    initializeCloudLayers(options?: CloudLayerOptions[]): void;
    get inner(): CloudsEffect;
    loadAll(): Promise<[void, void, void, void, void]>;
    onLocalWeatherLoad: (texture: Texture) => void;
    onShapeLoad: (texture: Data3DTexture) => void;
    onShapeDetailLoad: (texture: Data3DTexture) => void;
    onTurbulenceLoad: (texture: Texture) => void;
    onSTBNLoad: (texture: Data3DTexture) => void;
    get qualityPreset(): CloudsQualityPreset;
    set qualityPreset(v: CloudsQualityPreset);
    get localWeatherVelocity(): Vector2;
    set localWeatherVelocity(v: Vector2);
    get coverage(): number;
    set coverage(v: number);
    get lightShafts(): boolean;
    set lightShafts(v: boolean);
    get resolutionScale(): number;
    set resolutionScale(v: number);
    get maxIterationCount(): number;
    set maxIterationCount(v: number);
    get minStepSize(): number;
    set minStepSize(v: number);
    get maxStepSize(): number;
    set maxStepSize(v: number);
    get shadows(): boolean;
    set shadows(v: boolean);
    get shadowCascadeCount(): number;
    set shadowCascadeCount(v: number);
    get shadowMapSize(): Vector2;
    set shadowMapSize(v: Vector2);
    get shadowFarScale(): number;
    set shadowFarScale(v: number);
    get haze(): boolean;
    set haze(v: boolean);
    get hazeDensityScale(): number;
    set hazeDensityScale(v: number);
    get hazeExponent(): number;
    set hazeExponent(v: number);
    get hazeScatteringCoefficient(): number;
    set hazeScatteringCoefficient(v: number);
    get hazeAbsorptionCoefficient(): number;
    set hazeAbsorptionCoefficient(v: number);
    get localWeatherRepeat(): Vector2;
    set localWeatherRepeat(v: Vector2);
    get localWeatherOffset(): Vector2;
    set localWeatherOffset(v: Vector2);
    get shapeRepeat(): Vector3;
    set shapeRepeat(v: Vector3);
    get shapeOffset(): Vector3;
    set shapeOffset(v: Vector3);
    get shapeDetailRepeat(): Vector3;
    set shapeDetailRepeat(v: Vector3);
    get shapeDetailOffset(): Vector3;
    set shapeDetailOffset(v: Vector3);
    get turbulenceRepeat(): Vector2;
    set turbulenceRepeat(v: Vector2);
    get turbulenceDisplacement(): number;
    set turbulenceDisplacement(v: number);
    get scatteringCoefficient(): number;
    set scatteringCoefficient(v: number);
    get absorptionCoefficient(): number;
    set absorptionCoefficient(v: number);
    get scatterAnisotropy1(): number;
    set scatterAnisotropy1(v: number);
    get scatterAnisotropy2(): number;
    set scatterAnisotropy2(v: number);
    get scatterAnisotropyMix(): number;
    set scatterAnisotropyMix(v: number);
    get skyLightScale(): number;
    set skyLightScale(v: number);
    get groundBounceScale(): number;
    set groundBounceScale(v: number);
    get powderScale(): number;
    set powderScale(v: number);
    get powderExponent(): number;
    set powderExponent(v: number);
    /**
     * See [CloudLayers](https://github.com/takram-design-engineering/three-geospatial/tree/main/packages/clouds#cloudlayers).
     */
    get cloudLayers(): CloudLayer[];
}

export declare type CloudsConfig = LayerDescription_22 & EffectLayerConfig;

export declare class CloudsEffectLayer extends EffectLayerDeclaration<CloudsConfig, CloudsUpdate, Clouds> {
    static key: string;
    static insertAfter: string[];
    private config;
    constructor(view: ViewContext, config: CloudsConfig);
    createPass(): Clouds;
    onUpdateConfig(updates: CloudsUpdate): void;
    update(_time: number): void;
}

export declare type CloudsOptions = {
    assetsUrl?: string;
    stbnUrl?: string;
    qualityPreset?: CloudsQualityPreset;
    localWeatherVelocity?: Vector2;
    coverage?: number;
    lightShafts?: Nullable<boolean>;
    maxIterationCount?: Nullable<number>;
    minStepSize?: Nullable<number>;
    maxStepSize?: Nullable<number>;
    resolutionScale?: number;
    shadows?: boolean;
    shadowCascadeCount?: number;
    shadowMapSize?: Vector2;
    shadowFarScale?: number;
    haze?: boolean;
    hazeDensityScale?: number;
    hazeExponent?: number;
    hazeScatteringCoefficient?: number;
    hazeAbsorptionCoefficient?: number;
    localWeatherRepeat?: Vector2;
    localWeatherOffset?: Vector2;
    shapeRepeat?: Vector3;
    shapeOffset?: Vector3;
    shapeDetailRepeat?: Vector3;
    shapeDetailOffset?: Vector3;
    turbulenceRepeat?: Vector2;
    turbulenceDisplacement?: number;
    scatteringCoefficient?: number;
    absorptionCoefficient?: number;
    scatterAnisotropy1?: number;
    scatterAnisotropy2?: number;
    scatterAnisotropyMix?: number;
    skyLightScale?: number;
    groundBounceScale?: number;
    powderScale?: number;
    powderExponent?: number;
    cloudLayers?: Nullable<CloudLayerOptions[]>;
} & EffectOptions;

export declare type CloudsUpdate = LayerDescription_22 & EffectLayerUpdate;

/**
 * Class representing a color.
 * This class assumes that the specified color represents the sRGB color space.
 *
 * ```
 * const red = new Color().setRGB(1.0, 0.0, 0.0);
 * const green = new Color().setHex(0x00ff00);
 * const blue = new Color().setStyle("#0000ff");
 * ```
 */
export declare class Color implements Color_2 {
    #private;
    /**
     * Sets RGB. The range is: 0.0 ~ 1.0
     */
    setRGB(r: number, g: number, b: number): this;
    setRGBLinear(r: number, g: number, b: number): this;
    /**
     * Sets hex color: 0xffffff
     */
    setHex(hex: number): this;
    /**
     * Sets this color from a CSS context style string.
     */
    setStyle(style: string): this;
    copy(color: Color): this;
    clone(): this;
    toArray(): [r: number, g: number, b: number];
    srgb(): this;
    toHex(): number;
    get raw(): Color_3;
}

declare abstract class Color_2 {
    abstract setRGB(r: number, g: number, b: number): this;
    abstract setHex(hex: number): this;
    abstract setStyle(style: string): this;
    abstract copy(color: this): this;
    abstract clone(): this;
    abstract srgb(): this;
    abstract toArray(): [r: number, g: number, b: number];
    abstract toHex(): number;
}

export declare class ColorGradingLUT extends Effect<LUT3DEffect, ColorGradingLUTOptions> {
    private static lutCubeLoader;
    private static lut3dlLoader;
    private static textureLoader;
    constructor(camera: Camera, options?: ColorGradingLUTOptions);
    private loadLUT;
    set url(url: string);
    set blendMode(mode: BlendMode);
    set opacity(value: number);
    dispose(): void;
    protected onMounted(): void;
}

export declare type ColorGradingLUTConfig = LayerDescription_36 & EffectLayerConfig;

export declare class ColorGradingLUTEffectLayer extends EffectLayerDeclaration<ColorGradingLUTConfig, ColorGradingLUTUpdate, ColorGradingLUT> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: ColorGradingLUTConfig);
    createPass(): ColorGradingLUT;
    onUpdateConfig(updates: ColorGradingLUTUpdate): void;
}

export declare type ColorGradingLUTOptions = {
    /** URL of the LUT file to load, supported formats are .cube, .3dl, .png, .jpg, .jpeg
     *
     *  Example LUTs can be found at:
     *
     *  web/navara-three/example/helpers/constants.ts: LUT_DATASETS
     */
    url?: string;
    /** Blend mode of the effect. */
    blendMode?: BlendMode;
    /** Opacity of the effect. */
    opacity?: number;
} & EffectOptions;

export declare type ColorGradingLUTUpdate = LayerDescription_36 & EffectLayerUpdate;

export declare class ColorMap<T extends ColorMapType = ColorMapType> {
    #private;
    readonly type: T;
    readonly name: string;
    lut: ColorTuple[];
    constructor(type: T, name: string, lut: LUT);
    linear(value: number): ColorTuple;
    buildLinear(): void;
    get count(): number;
    ticks(range: [min: number, max: number], count: number): number[];
    quantize(count: number): ColorTuple[];
    createImage(): HTMLCanvasElement;
    /**
     * Flatten the color map LUT into a Float32Array for WASM/GPU usage.
     * Each color tuple [r, g, b] is flattened into consecutive array elements.
     * @returns A Float32Array with length = lut.length * 3
     */
    flatten(): Float32Array;
}

declare type ColorMapType = "sequential" | "diverging";

export declare type ColorTuple = [number, number, number];

declare type CommonUniforms = {
    viewportAndPixelRatio: RefThree<[x: number, y: number, z: number]>;
    frustumRatio: RefThree<[x: number, y: number, z: number, w: number]>;
    frustumNearFar: RefThree<[x: number, y: number]>;
    tGlobeDepth: RefThree<Texture>;
    tGlobeNormal: RefThree<Texture>;
    tSkyEnvMap: RefThree<Texture>;
    inverseProjectionMatrix: RefThree<Matrix4>;
    fov: RefThree<number>;
    screenHeightPx: RefThree<number>;
    time: RefThree<number>;
    colorMapTexture: RefThree<Texture>;
    waterTexture: RefThree<Texture>;
};

export declare class ConeTracingMaterial extends ShaderMaterial {
    constructor(params?: ConeTracingMaterialParameters);
    setSize(width: number, height: number): void;
    copyCameraSettings(camera?: Camera | null): void;
    get depthBuffer(): Texture | null;
    set depthBuffer(value: Texture | null);
    get colorBuffer(): Texture | null;
    set colorBuffer(value: Texture | null);
    get inputBuffer(): Texture | null;
    set inputBuffer(value: Texture | null);
    get rayTracingBuffer(): Texture | null;
    set rayTracingBuffer(value: Texture | null);
    get normalBuffer(): Texture | null;
    set normalBuffer(value: Texture | null);
    get specularBuffer(): Texture | null;
    set specularBuffer(value: Texture | null);
    get indirectSpecularBuffer(): Texture | null;
    set indirectSpecularBuffer(value: Texture | null);
    get fadeStart(): number;
    set fadeStart(value: number);
    get fadeEnd(): number;
    set fadeEnd(value: number);
    get maxDistance(): number;
    set maxDistance(value: number);
    get iteration(): number;
    set iteration(value: number);
    get ior(): number;
    set ior(value: number);
}

export declare type ConeTracingMaterialParameters = {
    colorBuffer?: Texture | null;
    rayTracingBuffer?: Texture | null;
    normalBuffer?: Texture | null;
    specularBuffer?: Texture | null;
    indirectSpecularBuffer?: Texture | null;
    numMips?: number;
    fadeStart?: number;
    fadeEnd?: number;
    maxDistance?: number;
    iteration?: number;
    ior?: number;
} & ShaderMaterialParameters;

export declare class ConeTracingPass extends ShaderPass {
    readonly coneTracingMaterial: ConeTracingMaterial;
    readonly blurPass: GaussianBlurPass;
    readonly copyPass: CopyPass_2;
    readonly mippedRenderTarget: WebGLRenderTarget;
    readonly blurredRenderTarget: WebGLRenderTarget;
    constructor(options?: ConeTracingPassOptions);
    update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, _deltaTime?: number): void;
    initialize(renderer: WebGLRenderer, alpha: boolean, frameBufferType: TextureDataType): void;
    setDepthTexture(depthTexture: Texture, depthPacking?: DepthPackingStrategies): void;
    setSize(width: number, height: number): void;
    dispose(): void;
}

export declare type ConeTracingPassOptions = {
    width?: number;
    height?: number;
    kernelSize?: number;
    coneTracingFadeStart?: number;
    coneTracingFadeEnd?: number;
    coneTracingMaxDistance?: number;
    coneTracingIteration?: number;
    coneTracingIor?: number;
    rayTracingBuffer?: Texture | null;
    normalBuffer?: Texture | null;
} & ConeTracingMaterialParameters;

/**
 * Helper type to add Navara Color object support to color-related number fields.
 * This recursively transforms any field named 'color' or ending with 'Color'
 * to accept both number and Navara Color objects.
 */
declare type ConvertColorFields<T> = {
    [K in keyof T]: K extends `${string}Color` | "color" ? T[K] extends number | undefined ? Color | undefined : T[K] extends number ? Color : T[K] : T[K] extends object | undefined ? ConvertColorFields<T[K]> | Extract<T[K], undefined> : T[K];
};

export declare function convertScreenToWorld(window: Window_2, camera: PerspectiveCamera, vec2: Vector2): Vector3 | undefined;

export declare function convertWorldToScreen(window: Window_2, camera: PerspectiveCamera, worldPos: Vector3): Vector2 | undefined;

export declare class CopyPass extends CopyPass_2 {
    get visible(): boolean;
    set visible(v: boolean);
}

/**
 * Create depth clip material for clipping mask by base scene depth
 * Shared between Bloom and Outline passes
 */
export declare function createDepthClipMaterial(): ShaderMaterial;

/**
 * Create fullscreen rendering infrastructure
 */
export declare function createFullscreenQuad(): {
    camera: OrthographicCamera;
    geometry: PlaneGeometry;
};

export { CSMHelper }

declare class CustomEffectPass extends EffectPass {
    private customDepthTexture;
    private customDepthPacking;
    /**
     * Override setDepthTexture to use custom depth texture if provided.
     */
    setDepthTexture(): void;
    setCustomDepthTexture(texture: Texture | null, depthPacking?: DepthPackingStrategies): void;
    getCustomDepthTexture(): Texture | null;
}

declare type CustomObject3DEventMap = Object3DEventMap & {
    removedFromWorld: undefined;
    needsUpdate: undefined;
};

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
    private selectiveEffectRegistry?;
    private maskController;
    constructor(scenes: Scenes, camera: PerspectiveCamera, meshes: MeshCache, drapedFeatureMaterials: Map<string, Material>, inputBuffer: WebGLRenderTarget, globe: Globe_2, options?: CustomRenderPassOptions);
    protected _renderWithLight(renderer: WebGLRenderer, scene: Scene): void;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    setDepthTexture(depthTexture: DepthTexture): void;
    setSize(width: number, height: number): void;
    protected _renderDrapedMesh(renderer: WebGLRenderer): void;
    /**
     * Set mask render targets for selective effect rendering.
     * Called by SelectiveEffectLayer to register their mask RTs.
     *
     * @param effectKey - Effect key (e.g., "selectiveBloom", "selectiveOutline")
     * @param rt - WebGLRenderTarget for mask rendering
     */
    setMaskRenderTarget(effectKey: string, rt: WebGLRenderTarget): void;
    /**
     * Remove mask render target.
     *
     * @param effectKey - Effect key to remove
     */
    removeMaskRenderTarget(effectKey: string): void;
    /**
     * Set occlusion mode-specific mask render targets.
     * Used by effects that need separate Normal and Silhouette masks (selectiveBloom, selectiveOutline).
     *
     * @param effectKey - Effect key (e.g., "selectiveBloom", "selectiveOutline")
     * @param targets - Object with optional normal and silhouette WebGLRenderTargets
     */
    setOcclusionMaskRenderTargets(effectKey: string, targets: {
        normal?: WebGLRenderTarget;
        silhouette?: WebGLRenderTarget;
    }): void;
    /**
     * Remove occlusion mode-specific mask render targets.
     *
     * @param effectKey - Effect key to remove
     */
    removeOcclusionMaskRenderTargets(effectKey: string): void;
}

/**
 * Options for CustomRenderPass
 */
export declare type CustomRenderPassOptions = {
    debugNormal?: boolean;
    disableShadow?: boolean;
    allowTransparent?: boolean;
    /** SelectiveEffectHelper for mask context (optional for backwards compatibility) */
    selectiveEffectRegistry?: SelectiveEffectHelper;
};

declare type CylinderMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

export declare class CylinderMeshLayer extends MeshLayerDeclaration<CylinderMeshLayerConfig, CylinderMeshLayerUpdate, Mesh<CylinderGeometry, MeshLambertMaterial, CylinderMeshEventMap>> {
    private config;
    constructor(view: ViewContext, config: CylinderMeshLayerConfig);
    createMesh(): Mesh<CylinderGeometry, MeshLambertMaterial, CylinderMeshEventMap>;
    onUpdateConfig(updates: CylinderMeshLayerUpdate): void;
    protected disposeMesh(): void;
}

export declare type CylinderMeshLayerConfig = MeshLayerConfig & LayerDescription_9;

export declare type CylinderMeshLayerUpdate = MeshLayerUpdate & LayerDescription_9;

export declare function decompressDraco(buffer: ArrayBuffer, dracoLoader: DRACOLoader): Promise<BufferGeometry | undefined>;

export declare const DEFAULT_AERIAL_PERSPECTIVE_OPTIONS: Required<AerialPerspectiveOptions>;

export declare const DEFAULT_ANTIALIAS_OPTIONS: AntialiasOptions;

export declare const DEFAULT_CLOUDS_OPTIONS: Required<CloudsOptions>;

export declare const DEFAULT_COLOR_GRADING_LUT_OPTIONS: {
    url: string;
    blendMode: "colorBurn";
    opacity: number;
};

export declare const DEFAULT_DEPTH_OF_FIELD_OPTIONS: Required<DepthOfFieldOptions>;

export declare const DEFAULT_EFFECT_OPTIONS: Required<EffectOptions>;

export declare const DEFAULT_FOG_LIGHT_EFFECT_OPTIONS: FogLightEffectOptions;

export declare const DEFAULT_FOG_LIGHT_OPTIONS: FogLightOptions;

export declare const DEFAULT_LENS_FLARE_OPTIONS: Required<LensFlareOptions>;

export declare const DEFAULT_RAIN_DROP_OPTIONS: RainDropOptions;

export declare const DEFAULT_SSAO_OPTIONS: Required<SSAOOptions>;

export declare const DEFAULT_SSR_OPTIONS: Required<SSROptions>;

export declare const DEFAULT_STARS_OPTIONS: Required<StarsOptions>;

export declare const DEFAULT_TONE_MAPPING_OPTIONS: Required<ToneMappingOptions>;

export declare const DefaultArcLineConfig: ArcLineConfig;

export declare type DefaultBatchAttributeValues = {
    color: Color_3;
};

export declare const DefaultRainConfig: RainConfig;

export declare const DefaultSmoothLineConfig: SmoothLineConfig;

export declare const DefaultSnowConfig: SnowConfig;

export declare function degreeToRadian(degree: number): number;

export declare class DepthOfField extends Effect<DepthOfFieldEffect, DepthOfFieldOptions> {
    constructor(camera: Camera, options?: DepthOfFieldOptions);
    protected onMounted(): void;
    get focusDistance(): number;
    set focusDistance(v: number);
    get focalLength(): number;
    set focalLength(v: number);
    get bokehScale(): number;
    set bokehScale(v: number);
}

export declare type DepthOfFieldConfig = LayerDescription_35 & EffectLayerConfig;

export declare class DepthOfFieldEffectLayer extends EffectLayerDeclaration<DepthOfFieldConfig, DepthOfFieldUpdate, DepthOfField> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: DepthOfFieldConfig);
    createPass(): DepthOfField;
    onUpdateConfig(updates: DepthOfFieldUpdate): void;
}

export declare type DepthOfFieldOptions = {
    /** Normalized focus distance that defines where the focus plane is, Range is [0.0, 1.0]. */
    focusDistance?: number;
    /** Virtual lens focal length that controls how quickly sharpness falls off around the focus plane, Range is [0.0, 1.0]. */
    focalLength?: number;
    /** Multiplier applied to the blur kernel that scales the apparent size of bokeh highlights. */
    bokehScale?: number;
} & EffectOptions;

export declare type DepthOfFieldUpdate = LayerDescription_35 & EffectLayerUpdate;

export declare type DevicePixelRatioOptions = {
    /** User-specified pixel ratio override (takes precedence over all other settings) */
    override?: number;
    /** Enable mobile optimization to cap pixel ratio on mobile devices */
    mobileOptimization?: boolean;
};

export declare type DrapedMaterialCache = Map<string, Material>;

export declare function eastNorthUpToFixedFrame(origin: Vector3): Matrix4;

export declare type EdgeDetectionMode = "color" | "depth" | "luma";

export declare class Effect<E extends Effect_2, O extends EffectOptions = EffectOptions, Ev extends EffectEvents = EffectEvents> extends Pass<EffectPass, E, O, Ev> {
    constructor(camera: Camera, effect: E, options?: O);
}

declare type EffectBaseInstance<Instance extends object = object> = Instance extends EffectInstance ? Instance & BaseInstance : Instance extends {
    raw: infer Raw extends Pass_2;
} ? Instance & {
    raw: Raw;
} & BaseInstance : BaseInstance;

export declare type EffectEvents = {
    _needsUpdate: () => void;
};

declare type EffectInstance = Pass_2 | Pass<Pass_2, Effect_2>;

export declare type EffectLayerConfig = {
    type: "effect";
} & LayerDeclarationConfig;

export declare type EffectLayerConstructor = new (view: ViewContext, config: EffectLayerConfig) => EffectLayerDeclaration;

export declare abstract class EffectLayerDeclaration<Config extends EffectLayerConfig = EffectLayerConfig, UpdateConfig extends EffectLayerUpdate = EffectLayerUpdate, InstanceObj extends EffectInstance | {
    raw: EffectInstance;
} = EffectInstance | {
    raw: EffectInstance;
}, Instance extends EffectBaseInstance<InstanceObj> = EffectBaseInstance<InstanceObj>> extends LayerDeclaration<Config, UpdateConfig, Instance> {
    static key: string;
    static insertAfter?: string[];
    static insertBefore?: string[];
    static allowDuplication?: boolean;
    private instanceId;
    constructor(view: ViewContext, config?: Config);
    abstract createPass(): Instance;
    get raw(): Instance | undefined;
    getConstructor(): typeof EffectLayerDeclaration;
    getKey(): string;
    getInsertAfter(): string[] | undefined;
    getInsertBefore(): string[] | undefined;
    onCreate(): void;
    private insertPass;
    onUpdateConfig(updates: UpdateConfig): void;
    onDestroy(): void;
    update?(time: number): void;
    findLayer<Layer extends EffectLayerDeclaration = EffectLayerDeclaration>(key: string): Layer | undefined;
}

export declare type EffectLayerDeclarationDescription = AerialPerspectiveConfig | CloudsConfig | FinalCopyPassConfig | FogLightConfig | FXAAConfig | LensFlareConfig | MRTPassConfig | SkyEnvMapPassConfig | RainDropConfig | SelectiveBloomEffectConfig | SelectiveOutlineEffectConfig | SMAAConfig | SSAOConfig | SSRConfig | ToneMappingConfig | TransparentPassConfig | DepthOfFieldConfig | ColorGradingLUTConfig;

export declare class EffectLayerRegistry extends LayerRegistry<EffectLayerConstructor, EffectLayerDeclaration> {
    create(effectType: string, config: EffectLayerConfig): EffectLayerDeclaration;
    /**
     * Find mesh type from config (alias for findTypeFromConfig for backward compatibility)
     */
    findEffectType(config: Record<string, unknown>): string | null;
}

export declare type EffectLayerUpdate = LayerDeclarationConfigUpdate;

export declare type EffectOptions = {
    enabled?: boolean;
};

export { EllipsoidGeodesic }

export declare function encodeFloatToRGBA(value: number): [number, number, number, number];

/**
 * Initialize shader uniforms for SelectiveEffect on material.userData.
 * Values are 0 by default, set during mask passes via onBeforeRender.
 */
export declare function ensureSelectiveEffectUserData(material: MeshStandardMaterial | MeshPhysicalMaterial | MeshLambertMaterial): void;

declare type EvaluatableMaterialProperty = {
    color: AvailableMaterialProperty["color"];
    show: AvailableMaterialProperty["show"];
    extrudedHeight: AvailableMaterialProperty["extrudedHeight"];
    height: AvailableMaterialProperty["height"];
    text: AvailableMaterialProperty["text"];
};

declare type EvaluatableMaterialPropertyKey = keyof EvaluatableMaterialProperty;

declare type EvaluatedMaterialProperty = {
    color: Color;
    show: boolean;
    extrudedHeight: number;
    height: number;
    text: string;
};

declare type EvaluatedValue = {
    [K in EvaluatableMaterialPropertyKey]: EvaluatedMaterialProperty[K];
};

/**
 * Evaluate mask pass participation for a mesh.
 *
 * This function determines whether a mesh should render to the current mask pass
 * based on its SelectiveEffectConfig, the active effects in the context, and occlusion mode.
 *
 * @param config - SelectiveEffectConfig from the mesh (or undefined)
 * @param registry - SelectiveEffectHelper for effect lookups
 * @param layerId - Layer ID for occlusion mode lookup
 * @param ctx - Current MaskPassContext
 * @returns Evaluation result with render decisions
 */
export declare function evaluateMaskPassParticipation(config: SelectiveEffectConfig | undefined, registry: SelectiveEffectHelper | undefined, layerId: string | undefined, ctx: MaskPassContext): MaskPassEvaluation;

declare class EventHandler<T extends BaseEventMap = BaseEventMap, K extends keyof T = keyof T> {
    events: {
        [E in K]?: Set<T[E]>;
    };
    onceEvents: {
        [E in K]?: Set<T[E]>;
    };
    on<E extends K>(k: E, f: T[E]): void;
    off<E extends K>(k: E, f: T[E]): void;
    clear<E extends K>(k: E): void;
    size<E extends K>(k: E): number | undefined;
    /**
     * Register a callback that will be executed only once and then removed
     */
    once<E extends K>(k: E, f: T[E]): void;
    emit<E extends K>(k: E, ...args: Parameters<T[E]>): void;
}

export declare type ExtractProperties<T> = {
    [K in keyof T]?: T[K] extends (...args: any) => any ? ReturnType<T[K]> extends (...args: any) => any ? ExtractProperties<ReturnType<T[K]>> : ReturnType<T[K]> : Partial<T[K]>;
};

export declare const FEATURE_BATCH_TEXTURE_CONFIG: BatchTextureConfig;

declare class FeatureEvaluator {
    private handler;
    private featureId;
    private cachedBatchedProperties?;
    private batchIds;
    obj: Object3D;
    private result;
    constructor(handler: FeatureHandler, featureId: FeatureId, obj: Object3D);
    get id(): bigint;
    readFeatureProperties(): Map<string, unknown> | undefined;
    /**
     * Evaluate feature styles by feature's property.
     * Note that layer color is overridden by the evaluated color.
     */
    evaluate(f: (batchId: number, property: Map<string, unknown> | undefined) => Partial<EvaluatedValue>): void;
    private update;
    private apply;
}

export declare type FeatureEvaluatorCallback = (evaluator: FeatureEvaluator) => void;

declare type FeatureHandler = {
    getTransferablePolygonBatchedFeature: (bits: bigint) => ReturnedTransferablePolygonBatchedFeature | undefined;
    getTransferablePolylineBatchedFeature: (bits: bigint) => ReturnedTransferablePolylineBatchedFeature | undefined;
    markFeatureIsRendered: (type: "point" | "polyline" | "polygon" | "model", bits: bigint) => void;
    readPropertiesFromFeature(bits: bigint, callback: (batchIdx: number, batchId: number, properties?: Map<string, unknown>) => void): void;
};

declare type FeatureId = bigint;

export declare class FeatureMesh {
    _setFeatureColor(_color: Color_3, _material?: Material): void;
    _getFeatureColor(): Color_3;
    _setFeatureShow(_visible: boolean): void;
    _setFeatureExtrudedHeight(_height: number): void;
    _setFeatureHeight(_height: number): void;
    _setFrustumCulled(_culled: boolean): void;
}

export declare class FinalCopyEffectLayer extends EffectLayerDeclaration<FinalCopyPassConfig, FinalCopyPassUpdate, CopyPass> {
    static key: string;
    createPass(): CopyPass;
}

export declare type FinalCopyPassConfig = LayerDescription_23 & EffectLayerConfig;

export declare type FinalCopyPassUpdate = LayerDescription_23 & EffectLayerUpdate;

export declare class FogLight extends Pass<FogLightDownsampledPass, FogLightEffect, FogLightOptions, FogLightEvents> {
    constructor(camera: Camera, options?: FogLightOptions);
    protected onMounted(): void;
    private updateLights;
    private updateFogDensity;
    get lights(): FogLightDefinition[];
    set lights(lights: FogLightDefinition[]);
    get fogDensity(): number;
    set fogDensity(value: number);
    get useSurfaceLighting(): boolean;
    set useSurfaceLighting(value: boolean);
    private updateUseSurfaceLighting;
    get downsample(): number;
    set downsample(value: number);
    get maxLightsPerTile(): number;
    set maxLightsPerTile(value: number);
    get extentScale(): number;
    set extentScale(value: number);
    get maxFar(): number;
    set maxFar(value: number);
    get debugShowGrid(): boolean;
    set debugShowGrid(v: boolean);
}

export declare type FogLightConfig = LayerDescription_24 & EffectLayerConfig;

export declare type FogLightDefinition = {
    position: {
        x: number;
        y: number;
        z: number;
    };
    color: number | Color_3;
    intensity: number;
    /** World-space influence radius of the fog light. Defaults to 500 if omitted. */
    radius?: number;
};

declare type FogLightDownsampledOptions = {
    /** 1: full-res, 2: half, 4: quarter */
    downsample: number;
};

declare class FogLightDownsampledPass extends Pass_2 {
    private options;
    private inner;
    private effect;
    private lowRT;
    private compositeMat;
    readonly resolution: Resolution;
    constructor(camera: Camera, effect: FogLightEffect, opts: FogLightDownsampledOptions);
    setDepthTexture(depthTexture: Texture, depthPacking?: DepthPackingStrategies): void;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget | null, deltaTime: number, stencilTest?: boolean): void;
    setSize(width: number, height: number): void;
    initialize(renderer: WebGLRenderer, alpha: boolean, frameBufferType: TextureDataType): void;
    dispose(): void;
    get downsample(): number;
    set downsample(value: number);
}

export declare class FogLightEffect extends Effect_2 {
    private camera;
    private invProjectionMatrix;
    private invViewMatrix;
    private viewMatrix;
    private _vpM;
    private _frustum;
    private _viewScratch;
    private _ndcScratch;
    private _sphereScratch;
    private lightTex0;
    private lightTex1;
    private buf0;
    private buf1;
    private depthCopyPass;
    private lightGridTex?;
    private lightIndexTex?;
    private gridBuf?;
    private indexBuf?;
    private tileCounts?;
    private gridW;
    private gridH;
    private indexTexW;
    private indexTexH;
    private tileSizePx;
    private _maxLightsPerTile;
    private _extentScale;
    private _maxFar;
    constructor(camera: PerspectiveCamera | OrthographicCamera, options?: FogLightEffectOptions);
    setDepthTexture(depthTexture: Texture, depthPacking?: DepthPackingStrategies): void;
    update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, deltaTime: number): void;
    writeLight(i: number, color: Color_3, intensity: number, position: Vector3, radius?: number): void;
    updateLightTextures(): void;
    updateDepthBuffer(depthBuffer: Texture | null): void;
    setSize(width: number, height: number): void;
    get lightCount(): number;
    set maxLightsPerTile(v: number);
    get maxLightsPerTile(): number;
    set extentScale(v: number);
    get extentScale(): number;
    set maxFar(v: number);
    get maxFar(): number;
    private allocateGridTextures;
    private populateLightGrid;
    private estimatePointLightRange;
    set debugShowGrid(v: boolean);
    get debugShowGrid(): boolean;
}

export declare class FogLightEffectLayer extends EffectLayerDeclaration<FogLightConfig, FogLightUpdate, FogLight> {
    static key: string;
    static insertBefore: string[];
    static allowDuplication: boolean;
    private config;
    constructor(view: ViewContext, config: FogLightConfig);
    createPass(): FogLight;
    onUpdateConfig(updates: FogLightUpdate): void;
}

export declare type FogLightEffectOptions = {
    /** Array of fog light definitions with position, color, and intensity */
    lights?: FogLightDefinition[];
    /** Density of the volumetric fog (default: 5) */
    fogDensity?: number;
    /** Maximum number of lights supported (default: 100) */
    maxLights?: number;
    /** Optional normal buffer texture for surface lighting calculations */
    normalBuffer?: Texture;
    /** Whether to apply surface lighting effects (default: true) */
    useSurfaceLighting?: boolean;
    /** Tile size in pixels for tiled/clustered culling */
    tileSize?: number;
    /** Maximum lights iterated per tile on GPU (shader safety) */
    maxLightsPerTile?: number;
    /** Safety scale applied to analytic closest-approach distance h to get world radius */
    extentScale?: number;
    /** Debug: show grid extent overlay in the shader */
    debugShowGrid?: boolean;
    /**
     * Maximum distance from the camera at which fog lights are considered.
     * Lights whose entire influence sphere is farther than this value are culled on CPU.
     * Defaults to the camera's current `far` value.
     */
    maxFar?: number;
};

export declare type FogLightEvents = EffectEvents;

export declare type FogLightOptions = FogLightEffectOptions & EffectOptions & {
    downsample?: number;
};

export declare type FogLightUpdate = LayerDescription_24 & EffectLayerUpdate;

export declare class FXAA extends Effect<FXAAEffect, AntialiasOptions> {
    constructor(camera: Camera, options?: AntialiasOptions);
}

export declare type FXAAConfig = LayerDescription_25 & EffectLayerConfig;

export declare class FXAAEffectLayer extends EffectLayerDeclaration<FXAAConfig, FXAAUpdate, FXAA> {
    static key: string;
    static insertBefore: string[];
    createPass(): FXAA;
}

export declare type FXAAUpdate = LayerDescription_25 & EffectLayerUpdate;

export declare const generateMixOverlaidTexturesMacro: (numTextures: number, insert?: (texColorVar: string, idx: number) => string) => string | undefined;

export declare function geodeticSurfaceNormal(lle: LLE): Vector3;

export declare function geodeticToVector3(lle: LLE): Vector3;

export declare type GeoJsonLayer = WithColorSupport<Layer_2<GeoJsonLayerDescription & {
    type: "geojson";
}>>;

export declare function getBatchDataTexture(material: Material): DataTexture | undefined;

/**
 * Gets an appropriate pixel ratio for the current device.
 * Caps the ratio on mobile devices only when mobileOptimization is enabled.
 *
 * @param options - Configuration options for pixel ratio
 * @returns Pixel ratio appropriate for the device
 */
export declare function getDevicePixelRatio(options?: DevicePixelRatioOptions): number;

export declare function getHeightFromEllipsoid(point: Vector3): number;

/**
 * Get the current mask pass context.
 * Used by mesh onBeforeRender callbacks to determine rendering behavior.
 *
 * @returns Current MaskPassContext (readonly)
 */
export declare function getMaskPassContext(): Readonly<MaskPassContext>;

export declare function getPickRay(window: Window_2, camera: PerspectiveCamera, vec2: Vector2): Ray;

export declare function getPlaneFromPointNormal(point: Vector3, normal: Vector3): Plane;

export declare function getRayPlaneIntersection(ray: Ray, plane: Plane): Vector3 | undefined;

export declare function getRowIndex(material: Material, row: BatchTextureRowKey): number;

/**
 * Get SelectiveEffectConfig from an object safely
 */
export declare function getSelectiveEffectConfig(obj: unknown): SelectiveEffectConfig | undefined;

export declare function getWGS84Eccentricity(): number;

export declare function getWGS84EccentricitySquared(): number;

export declare function getWGS84Flattening(): number;

export declare function getWGS84SemiMajorAxis(): number;

export declare function getWGS84SemiMinorAxis(): number;

/**
 * Globe configuration manager.
 *
 * Provides an interface for accessing and modifying globe properties
 * that are shared across different material types (VectorTile, RasterTile, RasterTerrain).
 */
declare class Globe_2 implements Omit<Globe, "free" | "elevationColormap" | "color"> {
    private handler;
    private _elevationColormap?;
    constructor(handler: GlobeHandler, options?: GlobeOptions);
    setOptions(options?: GlobeOptions): void;
    get maxSse(): number;
    set maxSse(value: number);
    get segments(): number;
    set segments(value: number);
    get color(): Color_2 | undefined;
    set color(value: Color_2);
    get hideUnderground(): boolean;
    set hideUnderground(value: boolean);
    get shouldComputeNormalFromVertex(): boolean;
    set shouldComputeNormalFromVertex(value: boolean);
    get transparent(): boolean;
    set transparent(value: boolean);
    get opacity(): number;
    set opacity(value: number);
    get wireframe(): boolean;
    set wireframe(value: boolean);
    get elevationColormap(): ColorMap | undefined;
    set elevationColormap(value: ColorMap);
}

/**
 * Handler for accessing individual Globe properties from WASM.
 * This provides a reference-based interface instead of copying the entire Globe object.
 */
declare type GlobeHandler = {
    getTransparent: () => boolean | undefined;
    getMaxSse: () => number | undefined;
    getSegments: () => number | undefined;
    getColor: () => Color_2 | undefined;
    getHideUnderground: () => boolean | undefined;
    getShouldComputeNormalFromVertex: () => boolean | undefined;
    getOpacity: () => number | undefined;
    getWireframe: () => boolean | undefined;
    getElevationColormap: () => Float32Array | undefined;
    setTransparent: (value: boolean) => void;
    setMaxSse: (value: number) => void;
    setSegments: (value: number) => void;
    setColor: (value: Color_2) => void;
    setHideUnderground: (value: boolean) => void;
    setShouldComputeNormalFromVertex: (value: boolean) => void;
    setOpacity: (value: number) => void;
    setWireframe: (value: boolean) => void;
    setElevationColormap: (value: ColorMap) => void;
};

declare type GlobeOptions = Partial<Omit<Globe, "constructor" | "free" | "elevationColormap" | "color">> & {
    elevationColormap?: ColorMap;
    color?: Color_2;
};

export declare class GlowGlobeMeshLayer extends MeshLayerDeclaration<GlowGlobeMeshLayerConfig, GlowGlobeMeshLayerUpdate, Mesh<SphereGeometry, ShaderMaterial>> {
    private config;
    constructor(view: ViewContext, config: GlowGlobeMeshLayerConfig);
    createMesh(): Mesh<SphereGeometry, ShaderMaterial, Object3DEventMap>;
    onUpdateConfig(updates: GlowGlobeMeshLayerUpdate): void;
    protected disposeMesh(): void;
}

export declare type GlowGlobeMeshLayerConfig = MeshLayerConfig & LayerDescription_8;

export declare type GlowGlobeMeshLayerUpdate = MeshLayerUpdate & LayerDescription_8;

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
    private originalWorldPosition;
    private modelPositionHigh;
    private modelPositionLow;
    constructor(view: ViewContext, config: GLTFModelLayerConfig);
    onCreate(): void;
    createMesh(): Group;
    private loadModel;
    private setupModel;
    private setPositionRTE;
    private setupRTEShadersForMesh;
    private modifyMaterialForRTE;
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
    getWorldPosition(): Vector3 | undefined;
    private lastUpdateTime?;
}

export declare type GLTFModelLayerConfig = MeshLayerConfig & LayerDescription_12;

declare type GLTFModelLayerEvent = {
    load: () => void;
    animationReady: () => void;
};

export declare type GLTFModelLayerUpdate = MeshLayerUpdate & LayerDescription_12;

/**
 * Check if Bloom effect is enabled
 */
export declare function hasSelectiveBloomEffect(config: SelectiveEffectConfig | undefined, registry?: SelectiveEffectHelper): boolean;

/**
 * Type guard to check if an object has SelectiveEffectConfig
 */
export declare function hasSelectiveEffectConfig(obj: unknown): obj is {
    userData: {
        selectiveEffectConfig: SelectiveEffectConfig;
    };
};

/**
 * Check if Outline effect is enabled
 */
export declare function hasSelectiveOutlineEffect(config: SelectiveEffectConfig | undefined, registry?: SelectiveEffectHelper): boolean;

export declare const IMAGE_LOADER: ImageLoader;

export declare function initBatchDataTexture(material: Material, config: BatchTextureConfig): void;

/**
 * Set batched texture rows to the material.
 */
export declare function initBatchedMaterial(material: Material, config: BatchTextureConfig): void;

export declare const initializeDracoLoader: () => DRACOLoader;

export declare const initializeGltfLoader: () => GLTFLoader;

export declare function initNavaraApi(): Promise<void>;

export declare class InstancedBillboardMesh extends InstancedMesh<BillboardMesh> {
    /** ViewContext for SelectiveEffect handling */
    private _viewContext;
    /** Layer ID for SelectiveEffect handling */
    private _layerId;
    constructor(options: InstancedMeshOptions);
    _init(m: BillboardMesh_2, buf: BufferLoader): Promise<void>;
    private initMeshes;
    _update(m: BillboardMesh_2, buf: BufferLoader, active: boolean): Promise<void>;
}

export declare class InstancedMesh<M extends Object3D> extends Mesh implements PickableMesh {
    constructor(options: InstancedMeshOptions);
    addWithBatchIndex(m: M, batchIndex: number): void;
    meshes(): M[];
    getMeshByBatchIndex(batchIndex: number): M;
    setFeatureColorByBatchIndex(batchIndex: number, color: Color_3): void;
    setFeatureShowByBatchIndex(batchIndex: number, visible: boolean): void;
    setFeatureHeightByBatchIndex(batchIndex: number, height: number): void;
    _setPickable(pickable: boolean): void;
}

export declare type InstancedMeshOptions = {
    renderOrder?: number;
    viewContext: ViewContext;
    layerId: string;
};

export declare class InstancedPointMesh extends InstancedMesh<PointMesh> {
    /** ViewContext for SelectiveEffect handling */
    private _viewContext;
    /** Layer ID for SelectiveEffect handling */
    private _layerId;
    constructor(m: PointMesh_2, buf: BufferLoader, options: InstancedMeshOptions);
    private initMeshes;
    _update(m: PointMesh_2, buf: BufferLoader, active: boolean): void;
}

export declare class InstancedTextMesh extends InstancedMesh<TextMesh> {
    constructor(m: TextMesh_2, buf: BufferLoader, uniforms: CommonUniforms, options: InstancedMeshOptions);
    private initMeshes;
    _update(m: TextMesh_2, buf: BufferLoader, active: boolean, needRender?: () => void): void;
    setTextByNatchIndex(batchIndex: number, text: string): void;
}

export declare const isFeatureMesh: (v: object) => v is FeatureMesh;

/**
 * Device detection and adaptive quality utilities for mobile optimization.
 */
/**
 * Detects if the current device is a mobile device.
 * Uses user agent and touch capability heuristics.
 * Result is memoized since it doesn't change during runtime.
 */
export declare function isMobileDevice(): boolean;

export declare const isPickableMesh: (v: object) => v is PickableMesh;

export declare const JAPAN_GSI_ELEVATION_DECODER: () => ElevationDecoder;

export declare class Layer extends EventHandler<LayerEvent> {
    id: string;
    private core;
    private featureEvaluators;
    private needUpdate;
    private convertColors?;
    constructor(id: string, core: Core, convertColors?: (obj: unknown) => unknown);
    /* Excluded from this release type: _registerFeatureEvaluator */
    /* Excluded from this release type: _getFeatureEvaluator */
    /* Excluded from this release type: _unregisterFeatureEvaluator */
    /* Excluded from this release type: _processFeatureUpdates */
    forceUpdate(): void;
    update(l: LayerDescription): void;
    delete(): void;
}

declare type Layer_2<LD> = ExtractProperties<RemoveFreeRecursively<LD>>;

export declare abstract class LayerDeclaration<Config extends LayerDeclarationConfig = LayerDeclarationConfig, UpdateConfig extends LayerDeclarationConfigUpdate = LayerDeclarationConfigUpdate, Instance extends BaseInstance = BaseInstance, CustomEvent extends BaseEventMap = BaseEventMap> extends EventHandler<LayerDeclarationEvents & CustomEvent> {
    readonly id: string;
    readonly sort?: number;
    protected view: ViewContext;
    protected _instance: Instance | undefined;
    private _visible?;
    constructor(view: ViewContext, config?: Config);
    abstract onCreate(): void;
    onUpdateConfig(updates: UpdateConfig): void;
    onDestroy(): void;
    get visible(): boolean;
    set visible(v: boolean);
}

export declare type LayerDeclarationConfig = {
    id?: string;
    visible?: boolean;
    sort?: number;
};

export declare type LayerDeclarationConfigUpdate = Pick<LayerDeclarationConfig, "visible">;

declare type LayerDeclarationEvents = {
    _needsUpdate: () => void;
};

export declare type LayerDescription = ResourceLayerDescription | MeshLayerDeclarationDescription | LightLayerDeclarationDescription | EffectLayerDeclarationDescription;

declare type LayerDescription_10 = {
    tube?: {
        points?: XYZ[];
        tubularSegments?: number;
        radius?: number;
        radialSegments?: number;
        closed?: boolean;
        tension?: number;
        color?: Color;
        emissiveColor?: number;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
        effectIds?: string[];
        selectiveEffectOcclusion?: SelectiveEffectOcclusion;
    };
};

declare type LayerDescription_11 = {
    plane?: {
        width?: number;
        height?: number;
        widthSegments?: number;
        heightSegments?: number;
        color?: Color;
        emissiveColor?: number;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
        effectIds?: string[];
        selectiveEffectOcclusion?: SelectiveEffectOcclusion;
    };
};

declare type LayerDescription_12 = {
    gltfModel?: {
        url: string;
        castShadow?: boolean;
        receiveShadow?: boolean;
        useRTE?: boolean;
        animationEnabled?: boolean;
        animationClips?: string[];
        animationActiveClip?: string;
        animationSpeed?: number;
        animationLoop?: boolean;
        animationCrossfadeDuration?: number;
        animationAutoPlay?: boolean;
    };
};

declare type LayerDescription_13 = {
    axesHelper?: {
        size?: number;
    };
};

declare type LayerDescription_14 = {
    arrowHelper?: {
        direction: XYZ;
        origin?: XYZ;
        length?: number;
        color?: Color;
        headLength?: number;
        headWidth?: number;
    };
};

declare type LayerDescription_15 = {
    arcLines?: Partial<ArcLineConfig> | Partial<ArcLineConfig>[];
};

declare type LayerDescription_16 = {
    smoothLines?: Partial<SmoothLineConfig> | Partial<SmoothLineConfig>[];
};

declare type LayerDescription_17 = {
    /**
     * Sun light configuration options. Includes all CSM (Cascaded Shadow Maps) settings.
     * Color can be specified as a number (hex value) or Navara Color instance.
     */
    sun?: Omit<SunLightOptions, "color"> & {
        color?: Color;
    };
};

declare type LayerDescription_18 = {
    skyLightProbe?: SkyLightProbeOptions;
};

declare type LayerDescription_19 = {
    ambient?: Omit<AmbientLightOptions, "color"> & {
        color?: Color;
    };
};

declare type LayerDescription_2 = {
    rain?: Partial<RainConfig>;
};

declare type LayerDescription_20 = {
    lightProbe?: {
        intensity?: number;
        sh?: SphericalHarmonics3;
        coefficients?: number[][];
    };
};

declare type LayerDescription_21 = {
    aerialPerspective?: Omit<AerialPerspectiveOptions, "enabled">;
};

declare type LayerDescription_22 = {
    clouds?: Omit<CloudsOptions, "enabled">;
};

declare type LayerDescription_23 = {
    final?: {};
};

declare type LayerDescription_24 = {
    fogLight?: Omit<FogLightOptions, "enabled">;
};

declare type LayerDescription_25 = {
    fxaa?: {};
};

declare type LayerDescription_26 = {
    lensFlare?: Omit<LensFlareOptions, "enabled">;
};

declare type LayerDescription_27 = {
    mrt?: {
        debugNormal?: boolean;
    };
};

declare type LayerDescription_28 = {
    skyEnvMap?: {
        resolution?: number;
    };
};

declare type LayerDescription_29 = {
    rainDrop?: Omit<RainDropOptions, "enabled">;
};

declare type LayerDescription_3 = {
    snow?: Partial<SnowConfig>;
};

declare type LayerDescription_30 = {
    smaa?: Omit<AntialiasOptions, "enabled">;
};

declare type LayerDescription_31 = {
    ssao?: Omit<SSAOOptions, "enabled">;
};

declare type LayerDescription_32 = {
    ssr?: Omit<SSROptions, "enabled" | "geometryBuffer">;
};

declare type LayerDescription_33 = {
    toneMapping?: Omit<ToneMappingOptions, "enabled">;
};

declare type LayerDescription_34 = {
    transparent?: {};
};

declare type LayerDescription_35 = {
    depthOfField?: Omit<DepthOfFieldOptions, "enabled">;
};

declare type LayerDescription_36 = {
    colorGradingLUT?: ColorGradingLUTOptions;
};

declare type LayerDescription_4 = {
    sky?: Partial<SkyMeshOptions>;
};

declare type LayerDescription_5 = {
    stars?: Partial<StarsOptions> & {
        assetsUrl?: string;
    };
};

declare type LayerDescription_6 = {
    box?: {
        width?: number;
        height?: number;
        depth?: number;
        widthSegments?: number;
        heightSegments?: number;
        depthSegments?: number;
        color?: Color;
        emissiveColor?: number;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
        effectIds?: string[];
        selectiveEffectOcclusion?: SelectiveEffectOcclusion;
    };
};

declare type LayerDescription_7 = {
    sphere?: {
        radius?: number;
        widthSegments?: number;
        heightSegments?: number;
        phiStart?: number;
        phiLength?: number;
        thetaStart?: number;
        thetaLength?: number;
        color?: Color;
        emissiveColor?: number;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
        effectIds?: string[];
        selectiveEffectOcclusion?: SelectiveEffectOcclusion;
    };
};

declare type LayerDescription_8 = {
    /**
     * Configuration for the glow globe mesh layer.
     *
     * Implements a Fresnel-based glow effect that creates a halo
     * around a spherical body. The glow intensity varies based on the viewing angle,
     * with maximum intensity at the center and minimum at the edges.
     */
    glowGlobe?: {
        /**
         * The scale factor for the glow globe radius relative to the WGS84 semi-major axis.
         *
         * This value is multiplied by the WGS84 semi-major axis (Earth's equatorial radius)
         * to determine the final glow globe radius. Values greater than 1.0 create a glow
         * globe larger than Earth, which is necessary for the atmospheric effect to be visible
         * around the surface. The globe also respects Earth's flattening factor to maintain
         * an oblate spheroid shape matching the planet.
         *
         * @default 1.2 (120% of Earth's equatorial radius: ~7,653,764 meters)
         * @example 1.1 - Glow globe 10% larger than Earth (typical atmospheric effect)
         * @example 1.05 - Subtle glow close to the surface
         * @example 1.2 - Extended atmospheric glow
         */
        radiusScale?: number;
        /**
         * The coefficient controlling the glow threshold in the Fresnel calculation.
         *
         * This value is subtracted from the facing ratio (dot product of surface normal
         * and view direction) to control where the glow begins. Higher values create
         * a more pronounced glow that extends further toward the edges of the globe.
         *
         * Formula: `intensity = pow(max(coefficient - facing_ratio, 0.0), exponent)`
         *
         * @default 0.5
         * @range Typically 0.0 to 1.0, though values outside this range are valid
         */
        coefficient?: number;
        /**
         * The exponent controlling the glow falloff intensity in the Fresnel calculation.
         *
         * Higher values create a sharper, more concentrated glow at the center.
         * Lower values create a softer, more diffuse glow that extends outward.
         * This parameter controls how quickly the glow intensity decreases from
         * the center toward the edges of the globe.
         *
         * Formula: `intensity = pow(max(coefficient - facing_ratio, 0.0), exponent)`
         *
         * @default 5.0
         * @range Typically 1.0 to 10.0, though higher values are valid
         */
        exponent?: number;
        /**
         * The color of the glow effect as a hexadecimal value or NavaraColor instance.
         *
         * Accepts standard hex color formats (e.g., 0x8cf3ff for light cyan) or
         * a NavaraColor instance. The RGB components determine the hue of the glow,
         * which is then modulated by the calculated Fresnel intensity and the opacity value.
         *
         * @default 0x8cf3ff - Light cyan
         * @example 0xff0000 - Red glow
         * @example 0x00ff00 - Green glow
         * @example 0x0080ff - Blue glow
         * @example new Color().setHex(0xff0000) - Red glow using Color instance
         */
        glowColor?: Color;
        /**
         * The opacity/alpha channel of the glow effect.
         *
         * Controls the overall transparency of the glow layer. This value is used
         * as the alpha component in the shader's color uniform. Lower values create
         * a more subtle, transparent glow, while higher values make it more opaque.
         *
         * @default 0.5
         * @range 0.0 (fully transparent) to 1.0 (fully opaque)
         */
        opacity?: number;
    };
};

declare type LayerDescription_9 = {
    cylinder?: {
        radiusTop?: number;
        radiusBottom?: number;
        height?: number;
        radialSegments?: number;
        heightSegments?: number;
        openEnded?: boolean;
        thetaStart?: number;
        thetaLength?: number;
        color?: Color;
        emissiveColor?: number;
        emissiveIntensity?: number;
        opacity?: number;
        transparent?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
        effectIds?: string[];
        selectiveEffectOcclusion?: SelectiveEffectOcclusion;
    };
};

export declare type LayerEvent = {
    featureCreated: (evaluator: FeatureEvaluator) => void;
    featureUpdated: (evaluator: FeatureEvaluator, updatedAt: number) => void;
    afterFeatureUpdated: () => void;
    deleted: () => void;
};

export declare class LayerHandle<T extends LayerDeclaration = LayerDeclaration> extends EventHandler<LayerHandleEvent> {
    private layer;
    constructor(layer: T);
    update(updates: T extends LayerDeclaration<infer _A, infer B> ? B : LayerDeclarationConfigUpdate): void;
    get ref(): T;
    delete(): void;
    get id(): string;
    get visible(): boolean;
    set visible(visible: boolean);
    get sort(): number | undefined;
}

declare type LayerHandleEvent = {
    deleted: () => void;
};

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

declare class LayersManager {
    private layers;
    add(l: Layer | LayerHandle): void;
    get(id: string): Layer | LayerHandle<LayerDeclaration<LayerDeclarationConfig, LayerDeclarationConfigUpdate, BaseInstance, BaseEventMap>> | undefined;
    emitById<K extends keyof LayerEvent>(k: K, id: string, ...args: Parameters<LayerEvent[K]>): void;
    emitAll<K extends keyof LayerEvent>(k: K, ...args: Parameters<LayerEvent[K]>): void;
    getResourceLayers(): Generator<Layer, void, unknown>;
    getEffectLayers(): Generator<LayerHandle<EffectLayerDeclaration>>;
    getDeclarationLayers(): Generator<LayerHandle>;
}

export declare class LensFlare extends Effect<LensFlareEffect, LensFlareOptions> {
    constructor(camera: Camera, options?: LensFlareOptions);
    protected onMounted(): void;
    get intensity(): number;
    set intensity(v: number);
}

export declare type LensFlareConfig = LayerDescription_26 & EffectLayerConfig;

export declare class LensFlareEffectLayer extends EffectLayerDeclaration<LensFlareConfig, LensFlareUpdate, LensFlare> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: LensFlareConfig);
    createPass(): LensFlare;
    onUpdateConfig(updates: LensFlareUpdate): void;
}

export declare type LensFlareOptions = {
    intensity?: number;
} & EffectOptions;

export declare type LensFlareUpdate = LayerDescription_26 & EffectLayerUpdate;

export declare type Light = {
    ambient?: {
        enabled?: boolean;
        color?: number;
        intensity?: number;
    };
    sun?: {
        enabled?: boolean;
        color?: number;
        position?: Vector3;
        intensity?: number;
    };
};

declare type LightBaseInstance<Instance extends object = object> = Instance extends Light_2 ? Instance : Instance extends {
    raw: infer Raw extends Light_2;
} ? Instance & {
    raw: Raw;
} & BaseInstance : BaseInstance;

export declare type LightLayerConfig = {
    type: "light";
    position?: XYZ;
} & LayerDeclarationConfig;

export declare type LightLayerConstructor = new (view: ViewContext, config: LightLayerConfig) => LightLayerDeclaration;

export declare abstract class LightLayerDeclaration<Config extends LightLayerConfig = LightLayerConfig, UpdateConfig extends LightLayerUpdate = LightLayerUpdate, InstanceObj extends Light_2 | {
    raw: Light_2;
} = Light_2 | {
    raw: Light_2;
}, Instance extends LightBaseInstance<InstanceObj> = LightBaseInstance<InstanceObj>> extends LayerDeclaration<Config, UpdateConfig, Instance> {
    position?: XYZ;
    constructor(view: ViewContext, config?: Config);
    abstract createLight(): Instance;
    get raw(): (Instance extends Light_2<LightShadow<Camera> | undefined> ? Instance : never) | (Instance extends {
        raw: infer Raw extends Light_2;
    } ? Raw : never) | undefined;
    onCreate(): void;
    onUpdateConfig(updates: UpdateConfig): void;
    onDestroy(): void;
    update?(time: number): void;
}

export declare type LightLayerDeclarationDescription = SunLightLayerConfig | SkyLightProbeLayerConfig | AmbientLightLayerConfig | LightProbeLayerConfig;

export declare class LightLayerRegistry extends LayerRegistry<LightLayerConstructor, LightLayerDeclaration, LightLayerConfig> {
    create(name: string, config: LightLayerConfig): LightLayerDeclaration;
    /**
     * Find light type from config (alias for findTypeFromConfig for backward compatibility)
     */
    findLightType(config: Record<string, unknown>): string | null;
}

export declare type LightLayerUpdate = Pick<LightLayerConfig, "position"> & LayerDeclarationConfigUpdate;

export declare class LightProbeLayer extends LightLayerDeclaration<LightProbeLayerConfig, LightProbeLayerUpdate, LightProbe> {
    private config;
    constructor(view: ViewContext, config: LightProbeLayerConfig);
    createLight(): LightProbe;
    onUpdateConfig(updates: LightProbeLayerUpdate): void;
    protected disposeLight(): void;
}

export declare type LightProbeLayerConfig = LightLayerConfig & LayerDescription_20;

export declare type LightProbeLayerUpdate = LightLayerUpdate & LayerDescription_20;

export { LLE }

export declare type LngLat = {
    lng: number;
    lat: number;
};

export declare type LngLatHeight = {
    lng: number;
    lat: number;
    height: number;
};

export declare type LUT = readonly (ColorTuple | Color_2)[];

export declare const MAPBOX_ELEVATION_DECODER: () => ElevationDecoder;

export declare type MapMouseEvent = {
    map: XYZ;
} & MouseEvent;

/**
 * Context for mask pass rendering.
 * Provides runtime state for mesh onBeforeRender callbacks to determine
 * their rendering behavior during mask passes.
 *
 * SoT Hierarchy:
 * - SelectiveEffectManager: Source of truth for layer configurations
 * - SelectiveEffectHelper: Resource management (maskRTs) and object cache
 * - MaskPassContext: Runtime state for current frame's mask rendering
 */
export declare type MaskPassContext = {
    /** Current mask pass phase */
    phase: MaskPassPhaseType;
    /** Active effect keys for this mask pass (e.g., ["selectiveBloom", "selectiveOutline"]) */
    activeEffects: readonly string[];
    /** Current occlusion mode filter (Normal, Silhouette, or undefined for all) */
    currentOcclusionMode: SelectiveEffectOcclusionValue | undefined;
    /** Mask render targets by effect key */
    maskRenderTargets: ReadonlyMap<string, WebGLRenderTarget>;
    /** SelectiveEffectHelper reference for occlusion lookups and effect checks */
    registry: SelectiveEffectHelper | undefined;
};

/**
 * Result of mask pass participation evaluation.
 */
export declare type MaskPassEvaluation = {
    /** Whether this mesh should render to the current mask pass */
    shouldRender: boolean;
    /** Whether this mesh uses Silhouette occlusion mode */
    isSilhouette: boolean;
    /** Resolved occlusion value (Normal or Silhouette) */
    occlusion: SelectiveEffectOcclusionValue;
    /** Whether bloom effect is active for this mesh in this pass */
    bloomActive: boolean;
    /** Whether outline effect is active for this mesh in this pass */
    outlineActive: boolean;
};

/**
 * Mask pass phase identifiers
 * - none: No mask pass active (normal rendering)
 * - baseMRT: Mask rendering during BaseMRT phase (CustomRenderPass)
 */
export declare const MaskPassPhase: {
    readonly None: "none";
    readonly BaseMRT: "baseMRT";
};

export declare type MaskPassPhaseType = (typeof MaskPassPhase)[keyof typeof MaskPassPhase];

declare type MeshBaseInstance<Instance extends object = object> = Instance extends Object3D ? Instance : Instance extends {
    raw: infer Raw extends Object3D;
} ? Instance & {
    raw: Raw;
} & BaseInstance : Instance & BaseInstance;

export declare type MeshCache = Map<string, Mesh | Sprite | Object3D>;

export declare type MeshLayerConfig = {
    type: "mesh";
    position?: XYZ;
    scale?: XYZ;
    rotation?: XYZ;
    effectIds?: string[];
    selectiveEffectOcclusion?: SelectiveEffectOcclusion;
} & LayerDeclarationConfig;

export declare type MeshLayerConstructor<TConfig extends MeshLayerConfig = MeshLayerConfig> = new (view: ViewContext, config: TConfig) => MeshLayerDeclaration;

export declare abstract class MeshLayerDeclaration<Config extends MeshLayerConfig = MeshLayerConfig, UpdateConfig extends MeshLayerUpdate = MeshLayerUpdate, InstanceObj extends Object3D | {
    raw: Object3D;
} = Object3D | {
    raw: Object3D;
}, CustomEvent extends BaseEventMap = BaseEventMap, Instance extends MeshBaseInstance<InstanceObj> = MeshBaseInstance<InstanceObj>> extends LayerDeclaration<Config, UpdateConfig, Instance, CustomEvent> {
    position?: XYZ;
    scale?: XYZ;
    rotation?: XYZ;
    private prevPassKey?;
    private _effectIds;
    private _selectiveEffectOcclusion?;
    constructor(view: ViewContext, config?: Config);
    protected getPassKey(): PassKey;
    abstract createMesh(): Instance;
    get raw(): (Instance extends Object3D<Object3DEventMap> ? Instance : never) | (Instance extends {
        raw: infer Raw extends Object3D;
    } ? Raw : never) | undefined;
    onCreate(): void;
    /**
     * Setup onBeforeRender callback for MaskPass context-based rendering.
     * This enables Box, Sphere, and other standard meshes to participate in mask rendering.
     */
    private setupMeshOnBeforeRender;
    removeFromScene(passKey: PassKey): void;
    addToScene(passKey: PassKey): void;
    onUpdateConfig(updates: UpdateConfig): void;
    onPassKeyChange(): void;
    onDestroy(): void;
    update?(time: number): void;
    onResize?(width: number, height: number): void;
}

export declare type MeshLayerDeclarationDescription = RainMeshLayerConfig | SnowMeshLayerConfig | SkyMeshLayerConfig | StarsLayerConfig | BoxMeshLayerConfig | SphereMeshLayerConfig | GlowGlobeMeshLayerConfig | CylinderMeshLayerConfig | TubeMeshLayerConfig | PlaneMeshLayerConfig | GLTFModelLayerConfig | AxesHelperLayerConfig | ArrowHelperLayerConfig | ArclineMeshLayerConfig | SmoothLineMeshLayerConfig;

export declare class MeshLayerRegistry extends LayerRegistry<MeshLayerConstructor, MeshLayerDeclaration, MeshLayerConfig> {
    create(name: string, config: MeshLayerConfig): MeshLayerDeclaration;
    /**
     * Find mesh type from config (alias for findTypeFromConfig for backward compatibility)
     */
    findMeshType(config: Record<string, unknown>): string | null;
}

export declare type MeshLayerUpdate = Pick<MeshLayerConfig, "position" | "scale" | "rotation"> & LayerDeclarationConfigUpdate & {
    effectIds?: string[];
    selectiveEffectOcclusion?: SelectiveEffectOcclusion;
};

export declare const MODEL_BATCH_TEXTURE_CONFIG: BatchTextureConfig;

export declare type ModelBatchedAttributeName = "color" | "show" | "height";

export declare type ModelMaterial = MeshStandardMaterial | MeshPhysicalMaterial;

export declare class ModelMesh extends Object3D<CustomObject3DEventMap> implements FeatureMesh, PickableMesh {
    water: boolean;
    private waterNormalMapTexture;
    private viewContext;
    /** Layer ID for SelectiveEffect handling */
    private _layerId;
    private _uniforms?;
    private mixer;
    /**
     * Returns the shared water normal map texture if water is enabled.
     * The texture must be enabled via Options.waterTexture.enabled.
     */
    private enableWaterNormalMap;
    private actions;
    private currentAction;
    private animationSpeed;
    private lastUpdateTime?;
    constructor(rawScene: Group, m: ModelMesh_2, uniforms: CommonUniforms, buf: BufferLoader, viewEvents: EventHandler<ViewEvents>, viewContext: ViewContext, layerId: string);
    private init;
    _initBatchedMaterial(mesh: Mesh<BufferGeometry<NormalBufferAttributes>, ModelMaterial>): void;
    _initBatchDataTexture(mesh: Mesh<BufferGeometry<NormalBufferAttributes>, ModelMaterial>, batchLength: number): void;
    _getBatchDataTexture(mesh: Mesh<BufferGeometry<NormalBufferAttributes>, ModelMaterial>): DataTexture | undefined;
    _updateBatchAttribute(mesh: Mesh<BufferGeometry<NormalBufferAttributes>, ModelMaterial>, batchId: number, attribute: ModelBatchedAttributeName, value: number | number[] | boolean): void;
    setupWaterMaterial(mesh: Mesh<BufferGeometry, Material>, meshMaterial: ModelMaterial_2): void;
    private overrideCesium3DTilesMaterial;
    /**
     * Setup onBeforeRender callback for a mesh to handle SelectiveEffect rendering
     *
     * Mesh determines its own depth/mask flags via onBeforeRender.
     * Uses MaskPassContext for self-determination during BaseMRT phase.
     *
     * SoT Flow:
     * - MaskPassContext provides runtime state (phase, activeEffects)
     * - SelectiveEffectManager provides layer configuration (occlusion), accessed via registry
     * - Mesh reads SoT, never modifies it
     */
    private setupMeshOnBeforeRender;
    /**
     * Apply mask pass state based on MaskPassContext.
     * Called during BaseMRT phase for context-based self-determination.
     *
     * Uses shared helper for evaluation and render state, then applies
     * model-specific shader uniforms for future custom shader support.
     */
    private applyMaskPassState;
    /**
     * Set material state to skip mask pass rendering.
     * Used when mesh doesn't contribute to current pass.
     */
    private setMaskPassSkipState;
    private traversePoints;
    private overridePntsMaterial;
    /**
     * Override a material that is used to generate a shadow map.
     */
    initDepthMaterial(mesh: Mesh<BufferGeometry<NormalBufferAttributes>, ModelMaterial>): void;
    _update(material: ModelMaterial_2, active: boolean): void;
    private setMaterial;
    traverseMesh(callback: (m: Mesh<BufferGeometry<NormalBufferAttributes>, ModelMaterial>) => void): void;
    _setFeatureColor(color: Color_3, m?: ModelMaterial): void;
    _getFeatureColor(): Color_3;
    _setFeatureShow(visible: boolean): void;
    _setFeatureExtrudedHeight(_height: number): void;
    _setFrustumCulled(culled: boolean): void;
    _setPickable(pickable: boolean): void;
    _setFeatureHeight(height: number, m?: ModelMaterial): void;
    dispose(viewEvents: EventHandler<ViewEvents>): void;
}

export declare type MRTPassConfig = LayerDescription_27 & EffectLayerConfig;

export declare class MRTPassEffectLayer extends EffectLayerDeclaration<MRTPassConfig, MRTPassUpdate, CustomRenderPass> {
    static key: string;
    private config;
    constructor(view: ViewContext, config: MRTPassConfig);
    createPass(): CustomRenderPass;
    onUpdateConfig(updates: MRTPassUpdate): void;
}

export declare type MRTPassUpdate = LayerDescription_27 & EffectLayerUpdate;

export declare type MvtLayer = WithColorSupport<Layer_2<MvtLayerDescription & {
    type: "mvt";
}>>;

export declare const NOISE_ASSETS_URL: string;

/**
 * A pass that copies normal buffer contents to a render target.
 */
export declare class NormalCopyPass extends Pass_2 {
    private _renderTarget;
    private _material;
    private _autoResize;
    constructor(renderTarget?: WebGLRenderTarget, autoResize?: boolean);
    get texture(): Texture;
    get autoResize(): boolean;
    set autoResize(value: boolean);
    set unpackNormal(v: boolean);
    setNormalTexture(texture: Texture): void;
    setSize(width: number, height: number): void;
    render(renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    dispose(): void;
}

export declare function northEastDownToFixedFrame(origin: Vector3): Matrix4;

export declare function northUpEastToFixedFrame(origin: Vector3): Matrix4;

export declare function northWestUpToFixedFrame(origin: Vector3): Matrix4;

export declare type Nullable<T> = T | null | undefined;

declare class Observed<T> extends EventHandler<ObservedEvent<T>> {
    private _value;
    constructor(v: T);
    get value(): T;
    set value(v: T);
    changed(f: (v: T) => void): void;
}

declare type ObservedEvent<T> = {
    changed: (v: T) => void;
};

export declare type Options = {
    container?: HTMLElement;
    canvas?: HTMLCanvasElement | OffscreenCanvas;
    pixelRatio?: number;
    disableAutoResize?: boolean;
    debug?: boolean;
    atmosphere?: AtmosphereOptions;
    backgroundColor?: Color_2;
    picking?: Picking;
    selectiveEffects?: {
        debugViews?: boolean;
    };
    animation?: boolean;
    multisampling?: number;
    halfFloat?: boolean;
    logarithmicDepthBuffer?: boolean;
    shadow?: boolean;
    mobileOptimization?: boolean;
    waterTexture?: {
        enabled: boolean;
        url?: string;
    };
} & GlobeOptions;

export declare function overrideLineMaterialForMRT(material: LineMaterial): void;

export declare function overrideMaterialsForMRT(): void;

export declare function overrideShaderMaterialForMRT(material: ShaderMaterial, normalVariableName?: string): void;

/**
 * Convert string occlusion value to numeric value for shader uniforms
 * @param value - String occlusion value ("normal" | "silhouette") or undefined
 * @returns Numeric SelectiveEffectOcclusionValue, or undefined if input is undefined
 */
export declare function parseSelectiveEffectOcclusion(value: SelectiveEffectOcclusion | undefined): SelectiveEffectOcclusionValue | undefined;

export declare class Pass<P extends Pass_2, E extends Effect_2 | unknown, O extends EffectOptions = EffectOptions, BaseEv extends BaseEventMap = BaseEventMap, Ev extends BaseEventMap & EffectEvents = BaseEv & EffectEvents> extends EventHandler<Ev> {
    rawPass: P;
    rawEffect: E;
    protected options: O;
    constructor(pass: P, effect: E, options?: O);
    get raw(): P;
    get enabled(): boolean;
    set enabled(v: boolean);
    get visible(): boolean;
    set visible(v: boolean);
    protected onMounted(): void;
    dispose(): void;
}

declare type PassKey = keyof Pick<Scenes, "opaque" | "transparent" | "mrt" | "skyEnvMap">;

export declare class PickableMesh {
    _setPickable(_pickable: boolean): void;
}

export declare type PickedFeature = {
    properties: Map<string, unknown>;
    batchId: Nullable<number>;
    layerId: Nullable<string>;
};

declare type Picking = {
    enable: boolean;
};

export { Plane }

declare type PlaneMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

export declare class PlaneMeshLayer extends MeshLayerDeclaration<PlaneMeshLayerConfig, PlaneMeshLayerUpdate, Mesh<PlaneGeometry, MeshLambertMaterial, PlaneMeshEventMap>> {
    private config;
    constructor(view: ViewContext, config: PlaneMeshLayerConfig);
    createMesh(): Mesh<PlaneGeometry, MeshLambertMaterial, PlaneMeshEventMap>;
    onUpdateConfig(updates: PlaneMeshLayerUpdate): void;
    protected disposeMesh(): void;
}

export declare type PlaneMeshLayerConfig = MeshLayerConfig & LayerDescription_11;

export declare type PlaneMeshLayerUpdate = MeshLayerUpdate & LayerDescription_11;

export declare type PntsLayer = WithColorSupport<Layer_2<PntsLayerDescription & {
    type: "pnts";
}>>;

export declare class PointMesh extends Sprite implements FeatureMesh {
    constructor(material: PointMaterial, batchId: number, active: boolean);
    private initMaterial;
    _update(material: PointMaterial, active: boolean): void;
    _setFeatureColor(color: Color_3): void;
    _getFeatureColor(): Color_3;
    _setFeatureShow(visible: boolean): void;
    _setFrustumCulled(culled: boolean): void;
    _setFeatureExtrudedHeight(_height: number): void;
    _setFeatureHeight(height: number): void;
}

export declare class PolygonMesh extends BatchedFeatureMesh<BufferGeometry<Attributes>, MeshLambertMaterial> {
    outline?: PolygonOutlineMesh;
    private _baseBoundingSphere?;
    /** ViewContext for SelectiveEffect handling */
    private _viewContext;
    /** Layer ID for SelectiveEffect handling */
    private _layerId;
    private _uniforms?;
    constructor(buf?: BufferGeometry<Attributes>, mat?: MeshLambertMaterial);
    init(mesh: PolygonMesh_2, buf: BufferLoader, uniforms: CommonUniforms, tileHandle: TileHandle | undefined, viewEvents: EventHandler<ViewEvents>, viewContext: ViewContext, layerId: string): this;
    clone(): this;
    private initGeometry;
    private enableWater;
    private initMaterial;
    /**
     * Override a material that is used to generate a shadow map.
     */
    initDepthMaterial(): void;
    _update(material: PolygonMaterial, active: boolean, isTexturized: boolean): void;
    private _recalculateBoundingSphere;
    _getDefaultBatchAttributeValues(): DefaultBatchAttributeValues;
    _setFeatureColor(color: Color_3): void;
    _setFeatureShow(visible: boolean): void;
    _setFeatureExtrudedHeight(height: number): void;
    _setFeatureHeight(height: number): void;
    get water(): boolean;
    set water(v: boolean);
    dispose(viewEvents: EventHandler<ViewEvents>): void;
}

export declare class PolygonOutlineMesh extends Line2 implements FeatureMesh {
    private resizeEventUnsubscribe?;
    constructor(mesh: PolygonMesh_2, buf: BufferLoader, viewEvents: EventHandler<ViewEvents>);
    private initGeometry;
    private initScaleNormalCapAttributes;
    private initMaterial;
    _update(material: PolygonMaterial, active: boolean): void;
    _setFeatureColor(color: Color_3): void;
    _getFeatureColor(): Color_3;
    _setFeatureShow(visible: boolean): void;
    _setFrustumCulled(culled: boolean): void;
    _setFeatureExtrudedHeight(height: number): void;
    _setFeatureHeight(height: number): void;
    updateResolution(width: number, height: number): void;
    dispose(): void;
}

export declare class PolylineMesh extends BatchedFeatureMesh<BufferGeometry<Attributes_2>, ShaderMaterial> {
    /** ViewContext for SelectiveEffect handling */
    private _viewContext;
    /** Layer ID for SelectiveEffect handling */
    private _layerId;
    constructor(mesh: PolylineMesh_2, buf: BufferLoader, uniforms: CommonUniforms, viewEvents: EventHandler<ViewEvents>, viewContext: ViewContext, layerId: string);
    private initGeometry;
    private initMaterial;
    _update(material: PolylineMaterial, active: boolean): void;
    get color(): any;
    _getDefaultBatchAttributeValues(): DefaultBatchAttributeValues;
    _setFeatureColor(color: Color_3): void;
    _setFeatureShow(visible: boolean): void;
    dispose(viewEvents: EventHandler<ViewEvents>): void;
}

declare type Private = {
    meshes: MeshCache;
    drapedMaterials: DrapedMaterialCache;
};

declare type Quality = "low" | "medium" | "high" | "ultra";

export declare function radianToDegree(radian: number): number;

export declare const RAIN_ASSETS_URL: string;

export declare type RainConfig = {
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

export declare type RainDropConfig = LayerDescription_29 & EffectLayerConfig;

export declare class RainDropEffect extends Effect<RainDropPostEffect, RainDropOptions, RainDropEvents> {
    constructor(camera: Camera, options?: RainDropOptions);
    protected onMounted(): void;
    update(time: number): void;
    get opacity(): number;
    set opacity(v: number);
    get dropGridSize(): number;
    set dropGridSize(value: number);
    get dropDensity(): number;
    set dropDensity(value: number);
    get dropLayers(): number;
    set dropLayers(value: number);
    get dropSizeFactor(): number;
    set dropSizeFactor(value: number);
    get noiseScale(): number;
    set noiseScale(value: number);
    get refractionStrength(): number;
    set refractionStrength(value: number);
    get minDropStrength(): number;
    set minDropStrength(value: number);
    get dropFadeStart(): number;
    set dropFadeStart(value: number);
    get dropFadeEnd(): number;
    set dropFadeEnd(value: number);
    get dropThresholdFactor(): number;
    set dropThresholdFactor(value: number);
    get gridDensityLow(): number;
    set gridDensityLow(value: number);
    get gridDensityHigh(): number;
    set gridDensityHigh(value: number);
    get jitterStrengthLow(): number;
    set jitterStrengthLow(value: number);
    get jitterStrengthHigh(): number;
    set jitterStrengthHigh(value: number);
}

export declare class RainDropEffectLayer extends EffectLayerDeclaration<RainDropConfig, RainDropUpdate, RainDropEffect> {
    static key: string;
    static insertBefore: string[];
    static allowDuplication: boolean;
    private config;
    constructor(view: ViewContext, config: RainDropConfig);
    createPass(): RainDropEffect;
    onUpdateConfig(updates: RainDropUpdate): void;
    update(time: number): void;
}

/** Optional knobs exposed to whoever constructs the effect. */
declare type RainDropEffectOptions = {
    /** Opacity applied after the shader runs, useful for blending the effect. */
    opacity?: number;
    /** Size of the UV grid used to place droplets; larger values yield smaller cells. */
    dropGridSize?: number;
    /** Multiplier applied in the shader to control how many droplets are spawned. */
    dropDensity?: number;
    /** Active number of simulated layers; higher values add small droplets at extra cost. */
    dropLayers?: number;
    /** Controls how tightly droplets are packed by scaling the grid size. */
    dropSizeFactor?: number;
    /** Scales the noise that drives jitter and refraction wobble. */
    noiseScale?: number;
    /** Intensity of UV distortion caused by refraction. */
    refractionStrength?: number;
    /** Minimum strength required before rendering a droplet. */
    minDropStrength?: number;
    /** Fade window (start) for smooth drop visibility. */
    dropFadeStart?: number;
    /** Fade window (end) paired with dropFadeStart. */
    dropFadeEnd?: number;
    /** Base threshold factor controlling spawn probability. */
    dropThresholdFactor?: number;
    /** Adjustment applied when density is low; pairs with gridDensityHigh. */
    gridDensityLow?: number;
    /** Adjustment applied when density is high; pairs with gridDensityLow. */
    gridDensityHigh?: number;
    /** Maximum jitter for sparse drops; pairs with jitterStrengthHigh. */
    jitterStrengthLow?: number;
    /** Minimum jitter for dense drops; pairs with jitterStrengthLow. */
    jitterStrengthHigh?: number;
};

export declare type RainDropEvents = EffectEvents;

export declare type RainDropOptions = RainDropEffectOptions & EffectOptions;

/**
 * Wraps the GLSL rain drop shader so it can be slotted into the post-processing
 * pipeline with adjustable density, grid size, and opacity.
 */
declare class RainDropPostEffect extends Effect_2 {
    private readonly dropGridSizeUniform;
    private readonly dropDensityUniform;
    private readonly dropLayersUniform;
    private readonly dropSizeFactorUniform;
    private readonly noiseScaleUniform;
    private readonly refractionStrengthUniform;
    private readonly minDropStrengthUniform;
    private readonly dropFadeStartUniform;
    private readonly dropFadeEndUniform;
    private readonly dropThresholdFactorUniform;
    private readonly gridDensityLowUniform;
    private readonly gridDensityHighUniform;
    private readonly jitterStrengthLowUniform;
    private readonly jitterStrengthHighUniform;
    constructor(options?: RainDropEffectOptions);
    setSize(width: number, height: number): void;
    updateTime(time: number): void;
    set dropGridSize(value: number);
    get dropGridSize(): number;
    set dropDensity(value: number);
    get dropDensity(): number;
    set dropLayers(value: number);
    get dropLayers(): number;
    set dropSizeFactor(value: number);
    get dropSizeFactor(): number;
    set noiseScale(value: number);
    get noiseScale(): number;
    set refractionStrength(value: number);
    get refractionStrength(): number;
    set minDropStrength(value: number);
    get minDropStrength(): number;
    set dropFadeStart(value: number);
    get dropFadeStart(): number;
    set dropFadeEnd(value: number);
    get dropFadeEnd(): number;
    set dropThresholdFactor(value: number);
    get dropThresholdFactor(): number;
    set gridDensityLow(value: number);
    get gridDensityLow(): number;
    set gridDensityHigh(value: number);
    get gridDensityHigh(): number;
    set jitterStrengthLow(value: number);
    get jitterStrengthLow(): number;
    set jitterStrengthHigh(value: number);
    get jitterStrengthHigh(): number;
}

export declare type RainDropUpdate = LayerDescription_29 & EffectLayerUpdate;

declare class RainMaterial extends ShaderMaterial {
    uniforms: {
        time: Uniform<number>;
        speed: Uniform<number>;
        color: Uniform<Color_3>;
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

export declare class RainMeshLayer extends MeshLayerDeclaration<RainMeshLayerConfig, RainMeshLayerUpdate, RainMesh> {
    private config;
    constructor(view: ViewContext, config: RainMeshLayerConfig);
    getPassKey(): "opaque" | "transparent";
    createMesh(): RainMesh;
    onUpdateConfig(updates: RainMeshLayerUpdate): void;
    update(time: number): void;
    protected disposeMesh(): void;
    getRainMesh(): RainMesh | undefined;
}

export declare type RainMeshLayerConfig = MeshLayerConfig & LayerDescription_2;

export declare type RainMeshLayerUpdate = MeshLayerUpdate & LayerDescription_2;

declare type Ref<K extends string, T> = Record<K, T | undefined | null>;

declare type RefThree<T> = Ref<"value", T>;

/**
 * Centralized registry manager that bundles all registry types.
 * This provides direct property access to different types of registries
 * in the Navara system.
 */
export declare class Registries {
    mesh: MeshLayerRegistry;
    light: LightLayerRegistry;
    effect: EffectLayerRegistry;
    constructor(view: ViewContext);
    /**
     * Get registry statistics for debugging and monitoring
     */
    getStats(): {
        mesh: {
            registeredCount: number;
            types: string[];
        };
        light: {
            registeredCount: number;
            types: string[];
        };
        effect: {
            registeredCount: number;
            types: string[];
        };
    };
    /**
     * Clear all registries
     */
    clearAll(): void;
}

export declare type RemoveFreeRecursively<T> = T extends {
    free: any;
} ? Omit<{
    [K in keyof T]: RemoveFreeRecursively<T[K]>;
}, "free"> : T;

export declare type RenderFlag = {
    forceUpdate: boolean;
    animation: boolean;
};

export declare class RenderPass extends RenderPass_2 {
    get visible(): boolean;
    set visible(v: boolean);
}

/**
 * Orchestrate rendering passes with ordered management and flexible insertion.
 */
declare class RenderPassOrchestrator {
    lights: Group<Object3DEventMap>;
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
    addPass(name: string, pass: Pass_2): void;
    /**
     * Insert a pass before the specified target pass.
     */
    insertPassBefore(targetName: string, name: string, pass: Pass_2): void;
    /**
     * Insert a pass after the specified target pass.
     */
    insertPassAfter(targetName: string, name: string, pass: Pass_2): void;
    /**
     * Remove a pass by name.
     */
    removePass(name: string): void;
    /**
     * Get a pass by name.
     */
    getPass(name: string): Pass_2 | undefined;
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

declare type RenderPassOrchestratorOptions = {
    halfFloat?: boolean;
    multisampling?: number;
};

/**
 * A pass that copies normal buffer contents to a render target.
 */
export declare class RenderTargetCopyPass extends Pass_2 {
    private _renderTarget;
    private _material;
    private _autoResize;
    constructor(renderTarget: WebGLRenderTarget, autoResize?: boolean);
    get texture(): Texture;
    get autoResize(): boolean;
    set autoResize(value: boolean);
    setTexture(texture: Texture): void;
    setDepthTexture(texture: Texture): void;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    dispose(): void;
}

/**
 * Reset mask pass context to default state.
 * Called by CustomRenderPass after BaseMRT phase completes.
 */
export declare function resetMaskPassContext(): void;

/**
 * Resolve SelectiveEffectOcclusionValue from registry for mask pass rendering.
 * @returns Normal or Silhouette (never SKIP)
 */
export declare function resolveSelectiveEffectOcclusion(registry: SelectiveEffectHelper | undefined, layerId: string | undefined): SelectiveEffectOcclusionValue;

export declare type ResourceLayerDescription = TilesLayer | TerrainLayer | GeoJsonLayer | B3dmLayer | PntsLayer | Cesium3dTilesLayer | MvtLayer;

/**
 * Restore material to normal rendering state.
 * Called after mask pass or when not in mask pass.
 *
 * @param material - Material to restore
 */
export declare function restoreMaterialState(material: Material): void;

declare class SceneGroup extends Group {
}

declare type Scenes = {
    light: Group;
    mrt: Scene;
    globe: Scene;
    draped: Scene;
    opaque: Scene;
    transparent: Scene;
    skyEnvMap: Scene;
};

/** Effect key for Bloom selective effect */
export declare const SELECTIVE_BLOOM_EFFECT_KEY: "selectiveBloom";

/** Effect key for Outline selective effect */
export declare const SELECTIVE_OUTLINE_EFFECT_KEY: "selectiveOutline";

export declare type SelectiveBloomEffectConfig = {
    selectiveEffect: true;
    selectiveBloom: {
        strength?: number;
        radius?: number;
        threshold?: number;
        debugMode?: number;
        resolutionScale?: number;
        debugViews?: boolean;
    };
} & EffectLayerConfig;

/**
 * Selective Bloom Effect Layer
 * Renders selective bloom using mask-based filtering.
 * Masks are pre-rendered by CustomRenderPass during BaseMRT phase.
 */
export declare class SelectiveBloomEffectLayer extends SelectiveEffectLayer<SelectiveBloomEffectConfig, SelectiveBloomEffectUpdate> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    private bloomPass?;
    get bloomStrength(): number;
    get bloomRadius(): number;
    get bloomThreshold(): number;
    get debugMode(): number;
    protected getEffectKey(): string;
    protected getResolutionScale(): number;
    protected getDebugViews(): boolean;
    constructor(view: ViewContext, config: EffectLayerConfig);
    createPass(): Pass<SelectiveBloomPass, null> & BaseInstance;
    /**
     * Override: Don't register simple maskRT.
     * SelectiveBloomPass registers occlusion-specific RTs directly.
     */
    protected registerMaskRenderTarget(): void;
    /**
     * Override: Unregister occlusion-specific RTs.
     */
    protected unregisterMaskRenderTarget(): void;
    onUpdateConfig(updates: SelectiveBloomEffectUpdate): void;
}

export declare type SelectiveBloomEffectUpdate = {
    selectiveBloom?: {
        strength?: number;
        radius?: number;
        threshold?: number;
        debugMode?: number;
        resolutionScale?: number;
        debugViews?: boolean;
    };
} & EffectLayerUpdate;

/**
 * Custom PostProcessing Pass for PostEffect Bloom
 * Renders only objects with Bloom effect enabled
 */
declare class SelectiveBloomPass extends Pass_2 {
    private layer;
    private bloom;
    private depthEnabledMaskRT;
    private depthClipRT;
    private depthClipMaterial;
    private depthClipScene;
    private silhouetteMaskRT;
    private depthEnabledBloomRT;
    private silhouetteBloomRT;
    private copyMaterial;
    private copyScene;
    private fullscreenCamera;
    private fullscreenGeometry;
    private compositeScene;
    private compositeMaterial;
    private size;
    private debugView1?;
    private debugView2?;
    constructor(layer: SelectiveBloomEffectLayer);
    setParameters(strength: number, radius: number, threshold: number): void;
    private updateSizes;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget | null, deltaTime?: number): void;
    /**
     * Copy texture from source RT to destination RT using copy shader
     */
    private copyTexture;
    dispose(): void;
}

/**
 * Post Effect Config
 * Represents the configuration of selective effects for an object.
 * Stored in Object3D.userData.selectiveEffectConfig
 *
 * Note: postEffectOcclusion is NOT stored here.
 * SoT for occlusion is SelectiveEffectManager, cached in SelectiveEffectHelper.occlusionCache,
 * accessed via layerId at runtime.
 */
export declare type SelectiveEffectConfig = {
    effectIds: string[];
    emissiveIntensity?: number;
    emissiveColor?: number;
    layerId?: string;
};

/**
 * Helper for managing selective effect render targets and metadata
 */
export declare class SelectiveEffectHelper {
    private resources;
    private effectKeys;
    private effectObjectCache;
    private width;
    private height;
    private occlusionCache;
    constructor(width: number, height: number);
    /**
     * Get cached objects for a specific effect key
     * @param effectKey - Effect key (e.g., "selectiveBloom", "selectiveOutline")
     * @returns Set of objects with this effect enabled
     */
    getObjectsForEffect(effectKey: string): ReadonlySet<Object3D>;
    /**
     * Get all objects that have any effect enabled
     * @returns Set of all effect-enabled objects
     */
    getAllEffectObjects(): ReadonlySet<Object3D>;
    /**
     * Create resources for a selective effect
     */
    create(effectId: string, effectKey: string, options?: SelectiveEffectOptions): SelectiveEffectResources;
    /**
     * Get effect key (e.g., "selectiveBloom") for an effect ID
     */
    getEffectKey(effectId: string): string | undefined;
    /**
     * Get resources for an effect
     */
    get(effectId: string): SelectiveEffectResources | undefined;
    /**
     * Sync occlusion cache from SelectiveEffectManager
     * Called by Manager when occlusion setting changes
     */
    syncOcclusionCache(layerId: string, occlusion: SelectiveEffectOcclusionValue): void;
    /**
     * Get Post Effect Occlusion setting for a layer (from cache)
     */
    getLayerSelectiveEffectOcclusion(layerId: string): SelectiveEffectOcclusionValue;
    /**
     * Renderable object type for selective effects (Mesh, Points, Line)
     */
    private forEachRenderableObject;
    /**
     * Update selective effect links for an object
     * Handles linking new effects and unlinking removed effects
     */
    updateLinksForObject(target: Object3D, effectIds: string[], prevEffectIds: string[], layerId: string): void;
    /**
     * Link an object to a selective effect
     */
    link(effectId: string, sourceObject: Object3D, layerId?: string): void;
    /**
     * Unlink an object from a selective effect
     */
    unlink(effectId: string, sourceObject: Object3D): void;
    /**
     * Resize render targets
     */
    setSize(width: number, height: number): void;
    /**
     * Destroy resources for an effect
     */
    destroy(effectId: string): void;
    /**
     * Destroy all resources
     */
    dispose(): void;
    /**
     * Render debug buffer views for all postEffect effects
     */
    renderDebugViews(renderer: WebGLRenderer): void;
    /**
     * Enable/disable debug views for all effects
     * When enabled, creates BufferView for effects that don't have one
     * When disabled, disposes all BufferViews and removes canvas from DOM
     */
    setDebugViewsAll(enabled: boolean): void;
}

/**
 * Base class for selective effect layers.
 * Provides resource management, mask RT registration with CustomRenderPass,
 * and debug visualization helpers.
 * Mask rendering is handled by CustomRenderPass via MaskPassContext.
 */
export declare abstract class SelectiveEffectLayer<Config extends SelectiveEffectLayerConfig = SelectiveEffectLayerConfig, UpdateConfig extends SelectiveEffectLayerUpdate = SelectiveEffectLayerUpdate> extends EffectLayerDeclaration<Config, UpdateConfig> {
    protected resources: SelectiveEffectResources;
    protected config: Config;
    protected abstract getEffectKey(): string;
    /** Get resolution scale from effect-specific config (e.g., bloom.resolutionScale) */
    protected abstract getResolutionScale(): number;
    /** Get debug views flag from effect-specific config (e.g., bloom.debugViews) */
    protected abstract getDebugViews(): boolean;
    constructor(view: ViewContext, config: Config);
    /**
     * Get the ViewContext for accessing camera, scenes, registry, etc.
     */
    get viewContext(): ViewContext;
    /**
     * Get the layer configuration
     */
    get layerConfig(): Config;
    /**
     * Get the PostEffect resources (maskRT, options, maskDebug)
     */
    get selectiveEffectResources(): SelectiveEffectResources;
    onCreate(): void;
    /**
     * Register this layer's maskRT with CustomRenderPass.
     * This enables context-based mask rendering during BaseMRT phase.
     *
     * Override this method in subclasses that need occlusion mode-specific RTs
     * (e.g., PostEffectBloomLayer, PostEffectOutlineLayer).
     */
    protected registerMaskRenderTarget(): void;
    /**
     * Unregister this layer's maskRT from CustomRenderPass.
     *
     * Override this method in subclasses that need occlusion mode-specific RTs.
     */
    protected unregisterMaskRenderTarget(): void;
    /**
     * Get CustomRenderPass for mask registration.
     * Used by subclasses and Pass classes for occlusion-specific RT registration.
     */
    getCustomRenderPass(): CustomRenderPass | undefined;
    /**
     * Render debug mask visualization
     */
    renderDebugMask(): void;
    /**
     * Get the base depth texture from MRT pass for depth comparison
     * Uses allDepthCopyPass.texture which contains the entire scene depth (globe + MRT + opaque)
     * Format: RGBA packed depth, requires unpackRGBAToDepth() in shader
     */
    getBaseDepthTexture(): Texture | null;
    onUpdateConfig(updates: UpdateConfig): void;
    /**
     * Helper method for subclasses to update resolution scale
     * Call this when effect-specific resolutionScale changes (e.g., updates.selectiveBloom.resolutionScale)
     */
    protected updateResolutionScale(resolutionScale: number): void;
    /**
     * Helper method for subclasses to update debug views
     * Call this when effect-specific debugViews changes (e.g., updates.selectiveBloom.debugViews)
     */
    protected updateDebugViews(debugViews: boolean): void;
    onDestroy(): void;
}

export declare type SelectiveEffectLayerConfig = {
    selectiveEffect: true;
} & EffectLayerConfig;

export declare type SelectiveEffectLayerUpdate = EffectLayerUpdate;

export declare class SelectiveEffectManager {
    private readonly options;
    private readonly layerConfigs;
    /**
     * Layer-level single source of truth for effect configuration.
     * PostEffectRegistry only consumes these layer settings; no per-object overrides are applied here.
     */
    constructor(options: SelectiveEffectManagerOptions);
    registerLayerEffects(layerId: string, effectIds: string[], selectiveEffectOcclusion?: SelectiveEffectOcclusionValue, emissiveIntensity?: number): void;
    unregisterLayerEffects(layerId: string): void;
    getLayerEffects(layerId: string): string[] | undefined;
    setLayerEmissiveColor(layerId: string, emissiveColor: number | undefined): void;
    updateLayerEffects(layerId: string, effectIds: string[] | undefined, emissiveIntensity?: number): void;
    private ensureConfig;
    private updateLayerEffectCaches;
    /**
     * Get occlusion setting for a layer (SoT)
     */
    getLayerOcclusion(layerId: string): SelectiveEffectOcclusionValue;
    /**
     * Set occlusion setting for a layer (SoT)
     */
    setLayerOcclusion(layerId: string, occlusion: SelectiveEffectOcclusionValue): void;
}

declare type SelectiveEffectManagerOptions = {
    selectiveEffectRegistry?: SelectiveEffectHelper;
};

/**
 * Controller for SelectiveEffect mask rendering.
 * Manages mask render targets and orchestrates mask pass rendering.
 *
 * This separates SelectiveEffect-specific logic from CustomRenderPass,
 * keeping CustomRenderPass focused on BaseMRT rendering while
 * SelectiveEffectMaskController handles effect-specific knowledge.
 */
export declare class SelectiveEffectMaskController {
    private maskRenderTargets;
    private occlusionMaskRenderTargets;
    /**
     * Set mask render target for selective effect rendering.
     * Called by SelectiveEffectLayer to register their mask RTs.
     *
     * @param effectKey - Effect key (e.g., "selectiveBloom", "selectiveOutline")
     * @param rt - WebGLRenderTarget for mask rendering
     */
    setMaskRenderTarget(effectKey: string, rt: WebGLRenderTarget): void;
    /**
     * Remove mask render target.
     *
     * @param effectKey - Effect key to remove
     */
    removeMaskRenderTarget(effectKey: string): void;
    /**
     * Set occlusion mode-specific mask render targets.
     * Used by effects that need separate Normal and Silhouette masks (selectiveBloom, selectiveOutline).
     *
     * @param effectKey - Effect key (e.g., "selectiveBloom", "selectiveOutline")
     * @param targets - Object with optional normal and silhouette WebGLRenderTargets
     */
    setOcclusionMaskRenderTargets(effectKey: string, targets: {
        normal?: WebGLRenderTarget;
        silhouette?: WebGLRenderTarget;
    }): void;
    /**
     * Remove occlusion mode-specific mask render targets.
     *
     * @param effectKey - Effect key to remove
     */
    removeOcclusionMaskRenderTargets(effectKey: string): void;
    /**
     * Render to all registered maskRTs.
     * Uses context-based mesh self-determination (no traverse needed).
     *
     * Each mesh determines its own mask contribution via onBeforeRender
     * by checking the MaskPassContext.
     *
     * Supports two registration modes:
     * 1. Simple: Single RT per effect (both occlusion modes to same RT)
     * 2. Occlusion-specific: Separate RTs for Normal and Silhouette
     *
     * @param renderer - WebGL renderer
     * @param baseRT - Base render target to restore after mask passes
     * @param renderFn - Function to render the MRT scene (delegate from CustomRenderPass)
     * @param registry - SelectiveEffectHelper for context
     */
    renderMaskPasses(renderer: WebGLRenderer, baseRT: WebGLRenderTarget, renderFn: () => void, registry?: SelectiveEffectHelper): void;
    /**
     * Render to a single maskRT for a specific occlusion mode.
     */
    private renderToMaskRT;
}

/**
 * Post effect occlusion mode type for API layer.
 * Used in Rust/WASM API and TypeScript public interfaces.
 */
export declare type SelectiveEffectOcclusion = "normal" | "silhouette";

/**
 * Post effect occlusion modes (numeric values for shader uniforms)
 * - Normal: Standard depth test/write (default)
 * - Silhouette: No depth test/write, renders as silhouette
 */
export declare const SelectiveEffectOcclusionMode: {
    readonly Normal: 0;
    readonly Silhouette: 2;
};

export declare type SelectiveEffectOcclusionValue = (typeof SelectiveEffectOcclusionMode)[keyof typeof SelectiveEffectOcclusionMode];

export declare type SelectiveEffectOptions = {
    resolutionScale?: number;
    debugViews?: boolean;
};

export declare type SelectiveEffectResources = {
    maskRT: WebGLRenderTarget;
    options: SelectiveEffectOptions;
    maskDebug?: BufferView;
};

export declare type SelectiveOutlineEffectConfig = {
    selectiveEffect: true;
    selectiveOutline: {
        color?: number;
        thickness?: number;
        edgeStrength?: number;
        resolutionScale?: number;
        debugViews?: boolean;
    };
} & EffectLayerConfig;

/**
 * Selective Outline Effect Layer
 * Renders selective outline using mask-based filtering.
 * Masks are pre-rendered by CustomRenderPass during BaseMRT phase.
 */
export declare class SelectiveOutlineEffectLayer extends SelectiveEffectLayer<SelectiveOutlineEffectConfig, SelectiveOutlineEffectUpdate> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    private outlinePass?;
    get outlineColor(): number;
    get outlineThickness(): number;
    get outlineEdgeStrength(): number;
    protected getEffectKey(): string;
    protected getResolutionScale(): number;
    protected getDebugViews(): boolean;
    constructor(view: ViewContext, config: EffectLayerConfig);
    createPass(): Pass<SelectiveOutlinePass, null> & BaseInstance;
    /**
     * Override: Don't register simple maskRT.
     * SelectiveOutlinePass registers occlusion-specific RTs directly.
     */
    protected registerMaskRenderTarget(): void;
    /**
     * Override: Unregister occlusion-specific RTs.
     */
    protected unregisterMaskRenderTarget(): void;
    onUpdateConfig(updates: SelectiveOutlineEffectUpdate): void;
}

export declare type SelectiveOutlineEffectUpdate = {
    selectiveOutline?: {
        color?: number;
        thickness?: number;
        edgeStrength?: number;
        resolutionScale?: number;
        debugViews?: boolean;
    };
} & EffectLayerUpdate;

/**
 * Custom PostProcessing Pass for PostEffect Outline
 * Implements pass separation for per-object occlusion handling
 */
declare class SelectiveOutlinePass extends Pass_2 {
    private layer;
    private depthEnabledMaskRT;
    private silhouetteMaskRT;
    private depthEnabledEdgeRT;
    private silhouetteEdgeRT;
    private depthClipRT;
    private depthClipMaterial;
    private depthClipScene;
    private fullscreenCamera;
    private fullscreenGeometry;
    private edgeDetectScene;
    private edgeDetectMaterial;
    private compositeScene;
    private compositeMaterial;
    private size;
    private debugView1?;
    private debugView2?;
    constructor(layer: SelectiveOutlineEffectLayer);
    setParameters(color: number, thickness: number, edgeStrength: number): void;
    private updateSizes;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget | null, _deltaTime?: number): void;
    dispose(): void;
}

/**
 * Set mask pass context for the current frame.
 * Called by CustomRenderPass at the start of BaseMRT phase.
 *
 * @param ctx - Partial context to merge with current state
 */
export declare function setMaskPassContext(ctx: Partial<MaskPassContext>): void;

export declare type ShadowMode = "uniform" | "logarithmic" | "practical";

export declare class SkyEnvMapEffectLayer extends EffectLayerDeclaration<SkyEnvMapPassConfig, SkyEnvMapPassUpdate, SkyEnvMapPass> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: SkyEnvMapPassConfig);
    createPass(): SkyEnvMapPass;
    onUpdateConfig(updates: SkyEnvMapPassUpdate): void;
}

export declare class SkyEnvMapPass extends RenderPass {
    private _scenes;
    private _camera;
    private cubeCamera;
    cubeRenderTarget: WebGLCubeRenderTarget;
    constructor(scenes: Scenes, camera: PerspectiveCamera, resolution?: number);
    render(renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget | null, _outputBuffer: WebGLRenderTarget | null): void;
    getEnvMapTexture(): CubeTexture;
    dispose(): void;
}

export declare type SkyEnvMapPassConfig = LayerDescription_28 & EffectLayerConfig;

export declare type SkyEnvMapPassUpdate = LayerDescription_28 & EffectLayerUpdate;

export declare class SkyLightProbe extends EventHandler<SkyLightProbeEvents> {
    raw: SkyLightProbe_2;
    constructor(options?: SkyLightProbeOptions);
    setTextures(textures: PrecomputedTextures): void;
    updateSunDirection(sunDirection: Vector3): void;
    updatePosition(position: Vector3): void;
    get visible(): boolean;
    set visible(v: boolean);
    get intensity(): number;
    set intensity(v: number);
    update(): void;
}

export declare type SkyLightProbeEvents = {
    _needsUpdate: () => void;
};

export declare class SkyLightProbeLayer extends LightLayerDeclaration<SkyLightProbeLayerConfig, SkyLightProbeLayerUpdate, SkyLightProbe> {
    private config;
    constructor(view: ViewContext, config: SkyLightProbeLayerConfig);
    createLight(): SkyLightProbe;
    onUpdateConfig(updates: SkyLightProbeLayerUpdate): void;
    update(_time: number): void;
}

export declare type SkyLightProbeLayerConfig = LightLayerConfig & LayerDescription_18;

export declare type SkyLightProbeLayerUpdate = LightLayerUpdate & LayerDescription_18;

export declare type SkyLightProbeOptions = {
    intensity?: number;
};

export declare class SkyMesh extends EventHandler<SkyMeshEvents> {
    raw: Mesh<PlaneGeometry, SkyMaterial>;
    private options;
    private handleShadowLengthChanged?;
    constructor(options?: SkyMeshOptions);
    setTextures(textures: PrecomputedTextures): void;
    setShadowLengthHandler(shadowLengthObservable: Observed<AtmosphereShadowLength | null>): void;
    updateSunDirection(sunDirection: Vector3): void;
    updateMoonDirection(moonDirection: Vector3): void;
    private setupMoonProperties;
    get visible(): boolean;
    set visible(v: boolean);
    get sun(): boolean;
    set sun(v: boolean);
    get moon(): boolean;
    set moon(v: boolean);
    get moonScale(): number;
    set moonScale(v: number);
    get moonIntensity(): number;
    set moonIntensity(v: number);
    get sunAngularRadius(): number;
    set sunAngularRadius(v: number);
    dispose(): void;
}

export declare type SkyMeshEvents = {
    _needsUpdate: () => void;
};

export declare class SkyMeshLayer extends MeshLayerDeclaration<SkyMeshLayerConfig, SkyMeshLayerUpdate, SkyMesh> {
    private config;
    private _skyMesh;
    constructor(view: ViewContext, config: SkyMeshLayerConfig);
    getPassKey(): "opaque" | "skyEnvMap";
    createMesh(): SkyMesh;
    onUpdateConfig(updates: SkyMeshLayerUpdate): void;
    update(_time: number): void;
    protected disposeMesh(): void;
    getSkyMesh(): SkyMesh | null;
}

export declare type SkyMeshLayerConfig = MeshLayerConfig & LayerDescription_4;

export declare type SkyMeshLayerUpdate = MeshLayerUpdate & LayerDescription_4;

export declare type SkyMeshOptions = {
    visible?: boolean;
    sun?: boolean;
    moon?: boolean;
    /**
     * @default 1
     */
    moonScale?: number;
    /**
     * @default 1
     */
    moonIntensity?: number;
    /**
     * @default 0.004675
     */
    sunAngularRadius?: number;
    /**
     * Render as env map
     */
    envMap?: boolean;
};

export declare class SMAA extends Effect<SMAAEffect, AntialiasOptions> {
    constructor(camera: Camera, options?: AntialiasOptions);
    protected onMounted(): void;
    get quality(): AntialiasOptions["quality"];
    set quality(v: AntialiasOptions["quality"]);
    get edgeDetectionMode(): AntialiasOptions["edgeDetectionMode"];
    set edgeDetectionMode(v: AntialiasOptions["edgeDetectionMode"]);
}

export declare type SMAAConfig = LayerDescription_30 & EffectLayerConfig;

export declare class SMAAEffectLayer extends EffectLayerDeclaration<SMAAConfig, SMAAUpdate, SMAA> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: SMAAConfig);
    createPass(): SMAA;
    onUpdateConfig(updates: SMAAUpdate): void;
}

export declare type SMAAUpdate = LayerDescription_30 & EffectLayerUpdate;

export declare class SmoothLine extends Object3D {
    private readonly _config;
    private _lineMeshes;
    private _pointsMeshes;
    private _pointsData;
    constructor(config?: Partial<SmoothLineConfig>[]);
    private updatePointsData;
    private initSubMeshes;
    private createLinePosAttr;
    private createLineMesh;
    private createSpherePointMesh;
    updateConfig(newConfig: Partial<SmoothLineConfig>[]): void;
    updateLineCfg(cfg: Partial<SmoothLineConfig>, i: number): void;
    updatePointsCfg(cfg: Partial<SmoothLineConfig>, i: number): void;
    dispose(): void;
    onResize(width: number, height: number): void;
}

export declare type SmoothLineConfig = {
    tension: number;
    closed: boolean;
    segments: number;
    lineWidth: number;
    dashed: boolean;
    dashSize: number;
    dashOffset: number;
    gapSize: number;
    color: number;
    showPoints: boolean;
    pointSize: number;
    pointColor: number;
    points: LngLatHeight[];
};

export declare class SmoothLineMeshLayer extends MeshLayerDeclaration<SmoothLineMeshLayerConfig, SmoothLineMeshLayerUpdate, SmoothLine> {
    private config;
    constructor(view: ViewContext, config: SmoothLineMeshLayerConfig);
    protected getPassKey(): "mrt";
    createMesh(): SmoothLine;
    onUpdateConfig(updates: SmoothLineMeshLayerUpdate): void;
    onResize(width: number, height: number): void;
    protected disposeMesh(): void;
}

export declare type SmoothLineMeshLayerConfig = MeshLayerConfig & LayerDescription_16;

export declare type SmoothLineMeshLayerUpdate = MeshLayerUpdate & LayerDescription_16;

export declare type SnowConfig = {
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

export declare class SnowMeshLayer extends MeshLayerDeclaration<SnowMeshLayerConfig, SnowMeshLayerUpdate, SnowMesh> {
    private config;
    constructor(view: ViewContext, config: SnowMeshLayerConfig);
    getPassKey(): "opaque" | "transparent";
    createMesh(): SnowMesh;
    onUpdateConfig(updates: SnowMeshLayerUpdate): void;
    update(time: number): void;
    protected disposeMesh(): void;
}

export declare type SnowMeshLayerConfig = MeshLayerConfig & LayerDescription_3;

export declare type SnowMeshLayerUpdate = MeshLayerUpdate & LayerDescription_3;

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
    color: Color_3;
    map: CanvasTexture;
    size: number;
    fog: boolean;
    sizeAttenuation: boolean;
    constructor();
    onBeforeCompile(shader: WebGLProgramParametersWithUniforms): void;
}

declare type SphereMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

export declare class SphereMeshLayer extends MeshLayerDeclaration<SphereMeshLayerConfig, SphereMeshLayerUpdate, Mesh<SphereGeometry, MeshLambertMaterial, SphereMeshEventMap>> {
    private config;
    constructor(view: ViewContext, config: SphereMeshLayerConfig);
    createMesh(): Mesh<SphereGeometry, MeshLambertMaterial, SphereMeshEventMap>;
    onUpdateConfig(updates: SphereMeshLayerUpdate): void;
    protected disposeMesh(): void;
}

export declare type SphereMeshLayerConfig = MeshLayerConfig & LayerDescription_7;

export declare type SphereMeshLayerUpdate = MeshLayerUpdate & LayerDescription_7;

export declare type SpherePointOptions = {
    visible?: boolean;
    size?: number;
    color?: number;
};

/**
 * Renders points as spheres using impostor technique.
 */
export declare class SpherePoints extends Points {
    pointOpts: Required<SpherePointOptions>;
    constructor(opts?: SpherePointOptions);
    setPoints(points: Vector3[]): void;
    setOptions(patch: Partial<SpherePointOptions>): void;
    onBeforeRender(renderer: WebGLRenderer, _scene: Scene, camera: Camera): void;
    dispose(): void;
    private _ensurePointsGeometry;
    private _updatePositionsAttr;
    private _makePointsMat;
    private _refreshPoints;
    private _refreshPointsUniforms;
}

export declare class SSAO extends Pass<N8AOPostPass, unknown, SSAOOptions> {
    camera: Camera;
    width: number;
    height: number;
    constructor(camera: Camera, width: number, height: number, options?: SSAOOptions);
    protected onMounted(): void;
    get quality(): SSAOQualityMode;
    set quality(v: SSAOQualityMode);
    get halfRes(): boolean;
    set halfRes(v: boolean);
    get samples(): Nullable<number>;
    set samples(v: Nullable<number>);
    get radius(): Nullable<number>;
    set radius(v: Nullable<number>);
    get intensity(): number;
    set intensity(v: number);
    get color(): Color;
    set color(v: Color);
}

export declare type SSAOConfig = LayerDescription_31 & EffectLayerConfig;

export declare class SSAOEffectLayer extends EffectLayerDeclaration<SSAOConfig, SSAOUpdate, SSAO> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: SSAOConfig);
    createPass(): SSAO;
    onUpdateConfig(updates: SSAOUpdate): void;
}

export declare type SSAOOptions = {
    samples?: Nullable<number>;
    radius?: Nullable<number>;
    intensity?: number;
    color?: Color;
    halfRes?: Nullable<boolean>;
    quality?: SSAOQualityMode;
} & EffectOptions;

export { SSAOQualityMode }

export declare type SSAOUpdate = LayerDescription_31 & EffectLayerUpdate;

export declare class SSR extends Effect<SSREffect, SSROptions> {
    constructor(camera: Camera, _options?: SSROptions);
    init(): void;
    get geometryBuffer(): Texture | null;
    set geometryBuffer(v: Texture | null);
    get resolutionScale(): number;
    set resolutionScale(v: number);
    get iterations(): number;
    set iterations(v: number);
    get binarySearchIterations(): number;
    set binarySearchIterations(v: number);
    get pixelZSize(): number;
    set pixelZSize(v: number);
    get pixelStride(): number;
    set pixelStride(v: number);
    get pixelStrideZCutoff(): number;
    set pixelStrideZCutoff(v: number);
    get maxRayDistance(): number;
    set maxRayDistance(v: number);
    get screenEdgeFadeStart(): number;
    set screenEdgeFadeStart(v: number);
    get eyeFadeStart(): number;
    set eyeFadeStart(v: number);
    get eyeFadeEnd(): number;
    set eyeFadeEnd(v: number);
    get jitter(): number;
    set jitter(v: number);
    get useConeTracing(): boolean;
    set useConeTracing(v: boolean);
    get coneTracingFadeStart(): number;
    set coneTracingFadeStart(v: number);
    get coneTracingFadeEnd(): number;
    set coneTracingFadeEnd(v: number);
    get coneTracingMaxDistance(): number;
    set coneTracingMaxDistance(v: number);
    get coneTracingIteration(): number;
    set coneTracingIteration(v: number);
    get coneTracingIor(): number;
    set coneTracingIor(v: number);
}

export declare type SSRConfig = LayerDescription_32 & EffectLayerConfig;

export declare class SSREffect extends Effect_2 {
    private camera;
    readonly resolution: Resolution;
    readonly renderTarget: WebGLRenderTarget;
    readonly ssrMaterial: SSRMaterial;
    readonly ssrPass: ShaderPass;
    readonly coneRenderTarget: WebGLRenderTarget;
    readonly coneTracingPass: ConeTracingPass;
    private _useConeTracing;
    constructor(camera: Camera, options?: SSREffectOptions);
    private readonly onResolutionChange;
    get mainCamera(): Camera;
    set mainCamera(value: Camera);
    initialize(renderer: WebGLRenderer, alpha: boolean, frameBufferType: TextureDataType): void;
    update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, deltaTime?: number): void;
    setSize(width: number, height: number): void;
    setDepthTexture(depthTexture: Texture, depthPacking?: DepthPackingStrategies): void;
    get resolutionScale(): number;
    set resolutionScale(value: number);
    get geometryBuffer(): Texture | null;
    set geometryBuffer(value: Texture | null);
    get iterations(): number;
    set iterations(value: number);
    get binarySearchIterations(): number;
    set binarySearchIterations(value: number);
    get pixelZSize(): number;
    set pixelZSize(value: number);
    get pixelStride(): number;
    set pixelStride(value: number);
    get pixelStrideZCutoff(): number;
    set pixelStrideZCutoff(value: number);
    get maxRayDistance(): number;
    set maxRayDistance(value: number);
    get screenEdgeFadeStart(): number;
    set screenEdgeFadeStart(value: number);
    get eyeFadeStart(): number;
    set eyeFadeStart(value: number);
    get eyeFadeEnd(): number;
    set eyeFadeEnd(value: number);
    get jitter(): number;
    set jitter(value: number);
    get useConeTracing(): boolean;
    set useConeTracing(v: boolean);
    get coneTracingFadeStart(): number;
    set coneTracingFadeStart(value: number);
    get coneTracingFadeEnd(): number;
    set coneTracingFadeEnd(value: number);
    get coneTracingMaxDistance(): number;
    set coneTracingMaxDistance(value: number);
    get coneTracingIteration(): number;
    set coneTracingIteration(value: number);
    get coneTracingIor(): number;
    set coneTracingIor(value: number);
}

export declare class SSREffectLayer extends EffectLayerDeclaration<SSRConfig, SSRUpdate, SSR> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: SSRConfig);
    createPass(): SSR;
    onUpdateConfig(updates: SSRUpdate): void;
}

export declare type SSREffectOptions = {
    blendFunction?: BlendFunction;
    resolutionScale?: number;
    width?: number;
    height?: number;
    resolutionX?: number;
    resolutionY?: number;
    kernelSize?: number;
    blur?: boolean;
    useConeTracing?: boolean;
    coneTracingFadeStart?: number;
    coneTracingFadeEnd?: number;
    coneTracingMaxDistance?: number;
    coneTracingIteration?: number;
    coneTracingIor?: number;
} & Omit<SSRMaterialParameters, "inputBuffer" | "depthBuffer">;

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

export declare type SSRMaterialParameters = {
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

export declare type SSROptions = {
    /** Texture containing geometry information (normals, depth) for reflection calculations */
    geometryBuffer?: Texture | null;
    /** Resolution scale factor for SSR rendering (0-1, lower values improve performance) */
    resolutionScale?: number;
    /** Maximum number of ray marching iterations for finding reflection intersections */
    iterations?: number;
    /** Number of binary search refinement steps to improve reflection accuracy */
    binarySearchIterations?: number;
    /** Depth buffer precision threshold for pixel rejection */
    pixelZSize?: number;
    /** Step size in pixels for ray marching along screen space */
    pixelStride?: number;
    /** Depth cutoff value for reducing pixel stride in distant areas */
    pixelStrideZCutoff?: number;
    /** Maximum distance a reflection ray can travel in world units */
    maxRayDistance?: number;
    /** Screen position (0-1) where edge fade begins to hide artifacts */
    screenEdgeFadeStart?: number;
    /** Start angle (radians) for fading reflections based on viewing angle */
    eyeFadeStart?: number;
    /** End angle (radians) for fading reflections based on viewing angle */
    eyeFadeEnd?: number;
    /** Amount of random jitter to reduce artifact */
    jitter?: number;
    /** Blend function for compositing reflections with the scene */
    blendFunction?: BlendFunction;
    /** Gaussian blur kernel size. Should be an odd number in the range [3, 1020]. */
    kernelSize?: number;
    /** Enable cone tracing that improves visual quality, but it might take a cost. */
    useConeTracing?: boolean;
    /** A ratio thats starts fading reflections */
    coneTracingFadeStart?: number;
    /** A ratio that ends fading reflections */
    coneTracingFadeEnd?: number;
    /** The max distance at which a reflection is visible */
    coneTracingMaxDistance?: number;
    /** The number of iteration to accumulate the cone tracing */
    coneTracingIteration?: number;
    coneTracingIor?: number;
} & EffectOptions;

export declare type SSRUpdate = LayerDescription_32 & EffectLayerUpdate;

export declare class Stars extends EventHandler<StarsEvents> {
    raw: Points<StarsGeometry, StarsMaterial>;
    options: Required<StarsOptions>;
    constructor(data: ArrayBuffer, options?: StarsOptions);
    static fromUrl(url?: string, options?: StarsOptions): Stars;
    static fromUrlAsync(url?: string, options?: StarsOptions): Promise<Stars | undefined>;
    setTextures(textures: PrecomputedTextures): void;
    setRotationFromMatrix(matrix: Matrix4): void;
    updateSunDirection(sunDirection: Vector3): void;
    get visible(): boolean;
    set visible(v: boolean);
    get pointSize(): number;
    set pointSize(v: number);
    get intensity(): number;
    set intensity(v: number);
    get background(): boolean;
    set background(v: boolean);
}

export declare const STARS_ASSETS_URL: string;

export declare type StarsEvents = {
    _needsUpdate: () => void;
};

export declare class StarsLayer extends MeshLayerDeclaration<StarsLayerConfig, StarsLayerUpdate, Stars> {
    private config;
    private _stars;
    constructor(view: ViewContext, config: StarsLayerConfig);
    getPassKey(): "opaque" | "transparent";
    createMesh(): Stars;
    onUpdateConfig(updates: StarsLayerUpdate): void;
    update(_time: number): void;
    protected disposeMesh(): void;
    getStars(): Stars | null;
}

export declare type StarsLayerConfig = MeshLayerConfig & LayerDescription_5;

export declare type StarsLayerUpdate = MeshLayerUpdate & LayerDescription_5;

export declare type StarsOptions = {
    visible?: boolean;
    pointSize?: number;
    intensity?: number;
    background?: boolean;
};

export declare const STBN_URL: string;

export declare class SunLight extends EventHandler<SunLightEvents> {
    raw: SunDirectionalLight;
    private transmittanceTexture;
    private options;
    private csm;
    private csmHelper;
    private camera;
    constructor(camera: PerspectiveCamera, options?: SunLightOptions);
    updateSunDirection(sunDirection: Vector3): void;
    updateTargetPosition(position: Vector3): void;
    update(): void;
    setTransmittanceTexture(texture: Texture): void;
    clearTransmittanceTexture(): void;
    /**
     * Initialize CSM with current options
     */
    private initializeCSM;
    /**
     * Update CSM (call this in render loop)
     */
    private updateCSM;
    /**
     * Set the camera for CSM calculations
     */
    setCamera(camera: PerspectiveCamera): void;
    /**
     * Setup a material for CSM
     */
    setupMaterialForCSM(material: Material): void;
    /**
     * Remove a material from CSM
     */
    removeMaterialFromCSM(material: Material): void;
    /**
     * Get CSM instance for advanced usage
     */
    getCSM(): CascadedShadowMaps;
    /**
     * Get CSM helper for debug visualization
     */
    getCSMHelper(): CSMHelper | null;
    /**
     * Get the lights that should be added to the scene
     * Returns CSM lights if enabled, otherwise the standard sun light
     */
    getSceneLights(): SunDirectionalLight | CascadedDirectionalLights;
    /**
     * Get the helper that should be added to the scene for debug visualization
     */
    getSceneHelper(): CSMHelper | null;
    get visible(): boolean;
    set visible(v: boolean);
    get intensity(): number;
    set intensity(v: number);
    get shadowIntensity(): number;
    set shadowIntensity(v: number);
    get color(): Color_3;
    set color(v: Color_3);
    get applyColor(): boolean;
    set applyColor(v: boolean);
    get target(): Object3D<Object3DEventMap>;
    get castShadow(): boolean;
    set castShadow(v: boolean);
    get shadowMapSize(): number;
    set shadowMapSize(v: number);
    get shadowFar(): number;
    set shadowFar(v: number);
    get shadowCascadeCount(): number;
    set shadowCascadeCount(v: number);
    get shadowMode(): ShadowMode;
    set shadowMode(v: ShadowMode);
    get shadowLambda(): number;
    set shadowLambda(v: number);
    get shadowMargin(): number;
    set shadowMargin(v: number);
    get shadowFade(): boolean;
    set shadowFade(v: boolean);
    get shadowBias(): number;
    set shadowBias(v: number);
    get shadowNormalBias(): number;
    set shadowNormalBias(v: number);
    get debugCSMHelper(): boolean;
    set debugCSMHelper(v: boolean);
}

export declare type SunLightEvents = {
    _needsUpdate: () => void;
    _csmChanged: () => void;
};

export declare class SunLightLayer extends LightLayerDeclaration<SunLightLayerConfig, SunLightLayerUpdate, SunLight> {
    private config;
    constructor(view: ViewContext, config: SunLightLayerConfig);
    createLight(): SunLight;
    onUpdateConfig(updates: SunLightLayerUpdate): void;
    onCreate(): void;
    update(_time: number): void;
    onDestroy(): void;
    /**
     * Update scene lights based on current CSM state
     */
    private updateSceneLights;
    /**
     * Remove all lights and helpers from scene
     */
    private removeLightsFromScene;
    /**
     * Setup a material for CSM shadows
     */
    setupMaterialForShadows(material: Material): void;
    /**
     * Remove a material from CSM shadows
     */
    removeMaterialFromShadows(material: Material): void;
    /**
     * Get CSM instance for advanced usage
     */
    getCSM(): CascadedShadowMaps | undefined;
    /**
     * Get CSM helper for debug visualization
     */
    getCSMHelper(): CSMHelper | null | undefined;
}

export declare type SunLightLayerConfig = LightLayerConfig & LayerDescription_17;

export declare type SunLightLayerUpdate = LightLayerUpdate & LayerDescription_17;

export declare type SunLightOptions = {
    /**
     * Distance of the sun light from the target position.
     * @default 300
     */
    distance?: number;
    /**
     * Color of the sun light.
     * @default new Color(0xffffff)
     */
    color?: Color_3;
    /**
     * Whether to apply the color directly or use atmospheric scattering calculations.
     * @default false
     */
    applyColor?: boolean;
    /**
     * Intensity of the sun light.
     * @default 1
     */
    intensity?: number;
    /**
     * Whether to cast shadows using Cascaded Shadow Maps (CSM).
     * @default true
     */
    castShadow?: boolean;
    /**
     * Number of shadow cascades. More cascades provide better shadow quality
     * distribution but require more GPU resources.
     * @default 4
     */
    shadowCascadeCount?: number;
    /**
     * Resolution of shadow maps (one per cascade). Higher values provide better
     * shadow quality but require more GPU memory.
     * @default 2048
     */
    shadowMapSize?: number;
    /**
     * Maximum distance from the camera where shadows are rendered.
     * Shadows will not be visible farther than this distance.
     * @default 50000
     */
    shadowFar?: number;
    /**
     * Defines the split scheme for the camera frustum:
     * - "uniform": Linear split distribution
     * - "logarithmic": Logarithmic split distribution (better for large scenes)
     * - "practical": Hybrid approach balancing quality and performance (recommended)
     * @default "practical"
     */
    shadowMode?: ShadowMode;
    /**
     * Lambda parameter for "practical" split mode. Controls the blend between
     * uniform (0.0) and logarithmic (1.0) split schemes.
     * @default 0.8
     */
    shadowLambda?: number;
    /**
     * Defines how far the shadow camera is positioned behind the cascade frustum.
     * Larger values help prevent shadow clipping but may reduce precision.
     * @default 5000
     */
    shadowMargin?: number;
    /**
     * Enables smooth transitions between shadow cascades to reduce visible seams.
     * @default true
     */
    shadowFade?: boolean;
    /**
     * Intensity of the shadows (0 = no shadows, 1 = full shadows).
     * @default 1
     */
    shadowIntensity?: number;
    /**
     * Shadow map bias to reduce shadow acne. Similar to THREE.LightShadow.bias.
     * @default 0.0001
     */
    shadowBias?: number;
    /**
     * Normal-based shadow bias to reduce shadow acne on surfaces at glancing angles.
     * @default 0
     */
    shadowNormalBias?: number;
    /**
     * Whether to show debug visualization of shadow cascades.
     * @default false
     */
    debugCSMHelper?: boolean;
};

export declare type TerrainLayer = Layer_2<TerrainLayerDescription & {
    type: "terrain";
}>;

export declare const TERRARIUM_ELEVATION_DECODER: () => ElevationDecoder;

declare type TestSelectiveEffectConfig = {
    selectiveEffect: true;
    _selectiveTest: {
        debugViews?: boolean;
        resolutionScale?: number;
    };
} & EffectLayerConfig;

/**
 * Test layer for selective effect
 * Renders mask for debugging and passes through the input buffer
 */
export declare class TestSelectiveEffectLayer extends SelectiveEffectLayer<TestSelectiveEffectConfig, SelectiveEffectLayerUpdate> {
    static key: string;
    static insertAfter: string[];
    static insertBefore: string[];
    protected getEffectKey(): string;
    protected getResolutionScale(): number;
    protected getDebugViews(): boolean;
    constructor(view: ViewContext, config: EffectLayerConfig);
    createPass(): Pass<TestSelectivePass, null> & BaseInstance;
}

/**
 * Custom PostProcessing Pass for TestPostEffect
 * Masks are pre-rendered by CustomRenderPass during BaseMRT phase
 */
declare class TestSelectivePass extends Pass_2 {
    private layer;
    private copyPass;
    constructor(layer: TestSelectiveEffectLayer);
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget | null): void;
    dispose(): void;
}

export declare class TextMesh extends Group implements FeatureMesh, PickableMesh {
    text: Text_2;
    background?: Mesh<PlaneGeometry, MeshBasicMaterial>;
    constructor(meshMaterial: TextMaterial, uniforms: CommonUniforms, batchId: number);
    private initText;
    _createBackground(): Mesh<PlaneGeometry, MeshBasicMaterial, Object3DEventMap>;
    _updateTextByMaterial(material: TextMaterial, active: boolean, needRender?: () => void): void;
    updateBackground(): void;
    setText(text: string): void;
    _setFeatureColor(color: Color_3): void;
    _getFeatureColor(): Color_3;
    _setFeatureShow(visible: boolean): void;
    _setFrustumCulled(culled: boolean): void;
    _setFeatureExtrudedHeight(_height: number): void;
    _setFeatureHeight(height: number): void;
    _setPickable(pickable: boolean): void;
    private recalculateOutlineParams;
}

export declare const TEXTURE_LOADER: TextureLoader;

declare type TextureOptions = {
    maxAnisotropy: number;
    minFilter: number;
    magFilter: number;
    useMipmaps: boolean;
    maxTextures: number;
    additionalTexturesInUse?: {
        waterTexture?: boolean;
        colorMapTexture?: boolean;
    };
};

declare class TexturizedSceneByTileCoordinates {
    map: Map<bigint, SceneGroup>;
    renderer: WebGLRenderer;
    camera: OrthographicCamera;
    constructor(renderer: WebGLRenderer);
    get(handle: TileHandle): SceneGroup;
    add(handle: TileHandle, layerId: string, mesh: Mesh, fromParent?: boolean): Object3D<Object3DEventMap>;
    addFromParentScene(handle: TileHandle, layerId: string, parentScene: Scene): void;
    showMeshFromParent(handle: TileHandle, layerId: string, enabledParent: boolean): void;
    hasCurrentMesh(handle: TileHandle, layerId: string): Object3D<Object3DEventMap> | undefined;
    findSceneByLayerId(handle: TileHandle, layerId: string): Scene | undefined;
    remove(handle: TileHandle, layerId: string): void;
    delete(handle: TileHandle): void;
    getNeedsUpdate(handle: TileHandle): boolean;
    setNeedsUpdate(handle: TileHandle, v: boolean): void;
}

declare class ThreeView<CustomLayerDescriptions extends Record<string, unknown> | undefined = undefined, LayerDescription extends ActualLayerDescription = CustomLayerDescriptions extends undefined ? ActualLayerDescription : ActualLayerDescription | CustomLayerDescriptions> extends EventHandler<ViewEvents> {
    camera: ThreeViewCamera;
    renderer: WebGLRenderer;
    control?: {
        update: () => void;
        get target(): Vector3 | undefined;
    };
    globe: Globe_2;
    atmosphere: Atmosphere;
    skyEnvMapLayer?: LayerHandle<SkyEnvMapEffectLayer>;
    mrtPassLayer: LayerHandle<MRTPassEffectLayer>;
    transparentPassLayer: LayerHandle<TransparentPassEffectLayer>;
    finalPassLayer: LayerHandle<FinalCopyEffectLayer>;
    renderPassOrchestrator: RenderPassOrchestrator;
    private _scenes;
    private _drapedFeatureMaterials;
    private _core;
    private _options;
    private _stats;
    private _eventDisposer;
    private _disposed;
    private _renderFlag;
    private _uniforms;
    private _meshes;
    private _abortControllers;
    private _workerPoolPromises;
    private _loadedTexs;
    private _texturizedSceneByTileCoordinates;
    private _tileMapByHandle;
    private _initialized;
    private _buf;
    private _texFragment;
    private _tileHandler;
    private _globeHandler;
    private _workerTaskHandler;
    private _featureHandler;
    private _meshHandler;
    private _eventManager;
    private _pickHelper?;
    private _terrainPicker;
    private _defaultTextureOptions;
    private layersManager;
    private shadowMapViewers;
    private registries;
    selectiveEffectHelper: SelectiveEffectHelper;
    private viewContext;
    constructor(options?: Options);
    /**
     * Convert a mouse event to a MapMouseEvent by adding map coordinates
     */
    private convertMouseEventToMapEvent;
    initializeRenderPass(): Promise<void>;
    private get renderPass();
    get toneMappingExposure(): number;
    set toneMappingExposure(v: number);
    get globeDepthTexture(): Texture;
    get globeNormalTexture(): Texture;
    get normalTexture(): Texture;
    forceUpdate: () => void;
    init(): Promise<void>;
    dispose(): void;
    resize: (width?: number, height?: number, pixelRatio?: number) => void;
    private _updateUniforms;
    /** Returns true if the scene was updated and needs to be rendered. */
    private _update;
    /**
     * Process feature updates for all layers
     * This is called after the main update loop to batch feature updates
     */
    private _forceFeatureUpdates;
    private _render;
    /**
     * Since passing Color class to WASM is tricky, converts Navara Color
     * objects to numbers in layer descriptions.
     * Handles the two-level structure: layer -> material -> color fields.
     */
    private _convertColorsToNumbers;
    addLayer<L = unknown>(l: LayerDescription): L extends LayerDeclaration ? LayerHandle<L> : Layer;
    updateLayerById(layerId: string, l: LayerDescription): void;
    deleteLayerById(layerId: string): void;
    private registerBuiltIns;
    private registerBuiltInMeshes;
    private registerBuiltInLights;
    private registerBuiltInEffects;
    private addMeshLayer;
    private addLightLayer;
    private addEffectLayer;
    registerMesh(name: string, meshClass: MeshLayerConstructor): void;
    registerLight(name: string, lightClass: LightLayerConstructor): void;
    registerEffect(name: string, effectClass: EffectLayerConstructor): void;
    /**
     * Find the sun light layer in the current layers
     */
    private findSunLightLayer;
    /**
     * Setup CSM for a single material
     */
    private setupCSMForMaterial;
    /**
     * Remove CSM for a single material
     */
    private removeCSMForMaterial;
    addDefaultAtmosphereLayers(): {
        sky: LayerHandle<SkyMeshLayer>;
        skyEnv: LayerHandle<SkyMeshLayer>;
        stars: LayerHandle<StarsLayer>;
        skyLightProbe: LayerHandle<SkyLightProbeLayer>;
        sun: LayerHandle<SunLightLayer>;
    };
    /**
     * Adds default effect layers for rendering.
     * On mobile devices (when mobileOptimization is enabled), uses lighter-weight effects.
     */
    addDefaultEffectLayers(): {
        aerialPerspective: LayerHandle<AerialPerspectiveEffectLayer>;
        lensFlare: LayerHandle<LensFlareEffectLayer> | undefined;
        toneMapping: LayerHandle<ToneMappingEffectLayer>;
        antialiasing: LayerHandle<SMAAEffectLayer> | LayerHandle<FXAAEffectLayer>;
    };
    getEffectOrder(): string[];
    setCamera(camPos: CameraPosition): void;
    moveCamera(move: string, amount: number): void;
    moveCameraWithDirection(dir: number[], amount: number): void;
    flyTo(camPos: CameraPosition & Required<Pick<CameraPosition, "lng" | "lat" | "height">>, duration?: number, maxHeight?: number): void;
    lookAt(target: LLE, offset: Vector3): void;
    cameraFollow(enabled: boolean, target?: LLE, offset?: Vector3): void;
    sampleTerrainHeight(pos: LLE): number | undefined;
    addTerrainHeightEvent(pos: LLE, cb: (height: number) => void): () => void;
    rotateAroundAxis(axis: Vector3, angle: number): void;
    private _startMainLoop;
    private _getCanvasSize;
    private _handleResize;
    onPick(pickArr: number[]): void;
    get animation(): boolean;
    set animation(v: boolean);
    get screenSize(): Vector2;
    get pixelRatio(): number;
    /**
     * Display shadow map on the left side of your screen.
     */
    get shadowMapViewersEnabled(): boolean;
    set shadowMapViewersEnabled(v: boolean);
    /**
     * Enable/disable post effect debug views rendering
     * When disabled, disposes all debug view canvas elements
     */
    setSelectiveEffectDebugViews(enabled: boolean): void;
    pickTerrainPosition(x: number, y: number): Nullable<Vector3>;
}
export default ThreeView;

declare class ThreeViewCamera extends EventHandler<CameraEvent> {
    raw: PerspectiveCamera;
    private _core;
    private _status;
    constructor(cam?: PerspectiveCamera);
    set core(core: Core | undefined);
    updateStatus(): void;
    get positionECEF(): XYZ;
    get positionGeographic(): LngLatHeight;
    get orientation(): CameraOrientation;
    get fovy(): number | undefined;
    set fov(val: number);
    set near(val: number);
    get near(): number;
    set far(val: number);
    get far(): number;
    set options(options: CameraOptions);
}

declare type TileHandle = bigint;

declare type TileHandler = {
    getMartini: (bits: ReconstructableEntity) => TransferableMartini | undefined;
    getTile: (handle: bigint) => TransferableTile | undefined;
    getParentTile: (handle: bigint) => TransferableTile | undefined;
    getTileElevationDecoder: (handle: bigint) => ElevationDecoder | undefined;
    getVectorTileStates: (handle: bigint) => VectorTileState[] | undefined;
};

export declare type TileMapByHandle = Map<TileHandle, TileMesh>;

export declare type TileMaterial = MeshBasicMaterial | MeshLambertMaterial;

export declare class TileMesh extends Mesh<BufferGeometry, TileMaterial, CustomObject3DEventMap> implements PickableMesh {
    handle: TileHandle;
    tileHandler: TileHandler;
    maxTextures: number;
    texturizedSceneIndexFrom: number;
    numTexturizedVector: number;
    tileStates?: {
        parentHandle?: TileHandle;
        isRendered: boolean;
        layerId: string;
    }[];
    private shadowMesh?;
    private texturizedSceneByTileCoordinates;
    private texturizedScenes;
    private camera;
    texturizedSceneRenderTargets: WebGLRenderTarget[];
    private warnedExceededTextures;
    constructor(mesh: MeshAdded, texturizedSceneByTileCoordinates: TexturizedSceneByTileCoordinates, textureOptions: TextureOptions, tileMapByHandle: TileMapByHandle, tileHandler: TileHandler);
    private updateTexturizedSceneByTileState;
    private _onBeforeRender;
    _init(scenes: Scenes, meshes: MeshCache, mesh: MeshAdded, buf: BufferLoader, loadedTexes: Map<string, Texture>, textureOptions: TextureOptions, tileMapByHandle: TileMapByHandle, viewEvents: EventHandler<ViewEvents>, uniforms: CommonUniforms): Promise<void>;
    private createMesh;
    createSkirtMesh(globe: Globe, mesh: Mesh_2, buf: BufferLoader, terrainGeometry: BufferGeometry, position: Float32Array, uv: Float32Array | null, indices: Uint32Array): BufferGeometry<NormalBufferAttributes, BufferGeometryEventMap>;
    private initMaterial;
    _update(mesh: MeshChanged, loadedTexes: Map<string, Texture>, textureOptions: TextureOptions, tileMapByHandle: TileMapByHandle, globe: Globe): void;
    private _setupSceneObserver;
    private updateTexturizedSceneTextureVisibility;
    private setUniforms;
    private setupTextureFragments;
    private setupTextures;
    _setPickable(pickable: boolean): void;
    dispose(viewEvents: EventHandler<ViewEvents>, tileMapByHandle?: TileMapByHandle): void;
}

export declare type TilesLayer = WithColorSupport<Layer_2<TileLayerDescription & {
    type: "tiles";
}>>;

export declare class ToneMapping extends Effect<ToneMappingEffect, ToneMappingOptions> {
    constructor(camera: Camera, options?: ToneMappingOptions);
    protected onMounted(): void;
    get mode(): ToneMappingMode;
    set mode(v: ToneMappingMode);
}

export declare type ToneMappingConfig = LayerDescription_33 & EffectLayerConfig;

export declare class ToneMappingEffectLayer extends EffectLayerDeclaration<ToneMappingConfig, ToneMappingUpdate, ToneMapping> {
    static key: string;
    static insertBefore: string[];
    private config;
    constructor(view: ViewContext, config: ToneMappingConfig);
    createPass(): ToneMapping;
    onUpdateConfig(updates: ToneMappingUpdate): void;
}

export { ToneMappingMode }

export declare type ToneMappingOptions = {
    mode?: ToneMappingMode;
} & EffectOptions;

export declare type ToneMappingUpdate = LayerDescription_33 & EffectLayerUpdate;

export { Transform }

export declare type TransparentPassConfig = LayerDescription_34 & EffectLayerConfig;

export declare class TransparentPassEffectLayer extends EffectLayerDeclaration<TransparentPassConfig, TransparentPassUpdate, RenderPass> {
    static key: string;
    static insertAfter: string[];
    light: Group<Object3DEventMap>;
    lightsSyncMap: Map<any, any>;
    createPass(): RenderPass;
    update(_time: number): void;
}

export declare type TransparentPassUpdate = LayerDescription_34 & EffectLayerUpdate;

declare type TubeMeshEventMap = Object3DEventMap & CustomObject3DEventMap;

export declare class TubeMeshLayer extends MeshLayerDeclaration<TubeMeshLayerConfig, TubeMeshLayerUpdate, Mesh<TubeGeometry, MeshLambertMaterial, TubeMeshEventMap>> {
    private config;
    constructor(view: ViewContext, config: TubeMeshLayerConfig);
    createMesh(): Mesh<TubeGeometry, MeshLambertMaterial, TubeMeshEventMap>;
    onUpdateConfig(updates: TubeMeshLayerUpdate): void;
    protected disposeMesh(): void;
}

export declare type TubeMeshLayerConfig = MeshLayerConfig & LayerDescription_10;

export declare type TubeMeshLayerUpdate = MeshLayerUpdate & LayerDescription_10;

export declare function updateBatchAttribute(material: Material, batchId: number, attribute: BatchedAttributeName, value: number | number[] | boolean, defaultValues: DefaultBatchAttributeValues): void;

export declare function vector3ToGeodetic(xyz: Vector3): LLE;

export declare class ViewContext {
    scenes: Scenes;
    camera: PerspectiveCamera;
    atmosphere: Atmosphere;
    layersManager: LayersManager;
    renderPassOrchestrator: RenderPassOrchestrator;
    _privates: Private;
    private eventHandler?;
    selectiveEffectRegistry?: SelectiveEffectHelper;
    debugOptions: ViewDebugOptions;
    globe?: Globe_2;
    private readonly selectiveEffects;
    constructor(scenes: Scenes, camera: PerspectiveCamera, atmosphere: Atmosphere, layersManager: LayersManager, renderPassOrchestrator: RenderPassOrchestrator, _privates: Private, eventHandler?: EventHandler<ViewEvents>, selectiveEffectHelper?: SelectiveEffectHelper, debugOptions?: ViewDebugOptions);
    setGlobe(globe: Globe_2): void;
    setCamera(camera: PerspectiveCamera): void;
    emit(event: "_csmMounted" | "_csmUnmounted", material: Material): void;
    registerLayerEffects(layerId: string, effectIds: string[], selectiveEffectOcclusion?: SelectiveEffectOcclusionValue, emissiveIntensity?: number): void;
    getLayerEffects(layerId: string): string[] | undefined;
    setLayerEmissiveColor(layerId: string, emissiveColor: number | undefined): void;
    setLayerSelectiveEffectOcclusion(layerId: string, selectiveEffectOcclusion: SelectiveEffectOcclusionValue): void;
    unregisterLayerEffects(layerId: string): void;
    updateLayerEffects(layerId: string, effectIds: string[] | undefined, emissiveIntensity?: number): void;
    /**
     * Apply selective effects to a specific Object3D.
     * Useful for pick-based effect application where you have a reference to the object.
     *
     * @param object - The Object3D to apply effects to
     * @param effectIds - Effect IDs to apply (e.g., ["selectiveBloom"], ["selectiveOutline"], ["selectiveBloom", "selectiveOutline"])
     * @param layerId - Optional layer ID for occlusion resolution.
     *                  Resolution order: argument > existing config > Normal occlusion
     */
    applyEffectToObject(object: Object3D, effectIds: string[], layerId?: string): void;
    /**
     * Remove selective effects from a specific Object3D.
     *
     * @param object - The Object3D to remove effects from
     * @param effectIds - Effect IDs to remove. If undefined, removes all effects.
     */
    removeEffectFromObject(object: Object3D, effectIds?: string[]): void;
}

export declare type ViewDebugOptions = {
    selectiveEffectMask?: boolean;
};

export declare type ViewEvents = {
    resize: (w: number, h: number) => void;
    pick: (info: Nullable<PickedFeature>) => void;
    layer: <K extends keyof LayerEvent>(k: K, layerId: string, ...args: Parameters<LayerEvent[K]>) => void;
    /** Emitted before an update process happens */
    preUpdate: (t: number) => void;
    /**
     * Emitted after an update process happened only when any states are changed.
     * */
    postUpdate: (t: number) => void;
    /**
     * Emitted before a rendering process happened.
     * Enabling `animation` flag emits this event every frame.
     * */
    preRender: (t: number) => void;
    /**
     * Emitted after a rendering process happened.
     * Enabling `animation` flag emits this event every frame.
     * */
    postRender: (t: number) => void;
    _sample_terrain_height_received: (ev: TerrainHeightUpdatedEvent) => void;
    /**
     * This event injects a shader code for CSM. The shader code only executed when the shadow is enabled.
     * You should pass a material that needs the shadow when it's initialized.
     */
    _csmMounted: (material: Material) => void;
    _csmUnmounted: (material: Material) => void;
    mousedown: (event: MapMouseEvent) => void;
    mouseenter: (event: MapMouseEvent) => void;
    mouseleave: (event: MapMouseEvent) => void;
    mousemove: (event: MapMouseEvent) => void;
    mouseup: (event: MapMouseEvent) => void;
    click: (event: MapMouseEvent) => void;
};

export declare const WATER_ASSETS_URL: string;

export declare const WATER_NORMAL_URL: string;

export { Window_2 as Window }

/**
 * Helper type to enable Navara Color objects in all color-related fields.
 * This applies to model, point, billboard, text, polyline, polygon, rasterTile, etc.
 * Both number and Navara Color objects are accepted for backward compatibility.
 */
declare type WithColorSupport<T> = ConvertColorFields<T>;

export { WorkerPoolPromise }

export declare type WorkerPoolPromises = Map<string, WorkerPoolPromise<unknown>>;

export declare type XYZ = {
    x: number;
    y: number;
    z: number;
};


export * from "@takram/three-geospatial/shaders";

export { }


declare module "three" {
    interface ShaderLibShader {
        [SETUP]?: boolean;
    }
    interface ShaderMaterial {
        [SETUP]?: boolean;
    }
}
