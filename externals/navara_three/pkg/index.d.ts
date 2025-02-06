import { B3dmLayerDescription } from '@navara/engine';
import { Cesium3dTilesLayerDescription } from '@navara/engine';
import { Color } from 'three';
import { ElevationDecoder } from '@navara/engine';
import { FXAAEffect } from 'postprocessing';
import { GeoJsonLayerDescription } from '@navara/engine';
import { Mesh } from 'three';
import { MvtLayerDescription } from '@navara/engine';
import { Object3D } from 'three';
import { PerspectiveCamera } from 'three';
import { Scene } from 'three';
import { SMAAEffect } from 'postprocessing';
import { Sprite } from 'three';
import { TerrainLayerDescription } from '@navara/engine';
import { TileLayerDescription } from '@navara/engine';
import { Vector3 } from 'three';
import { WebGLRenderer } from 'three';
import { Promise as WorkerPoolPromise } from 'workerpool';

export declare type AbortControllers = Map<string, AbortController>;

export declare type Antialias = {
    enabled: boolean;
    effect?: "fxaa" | "smaa";
};

export declare type B3dmLayer = Layer<B3dmLayerDescription & {
    type: "b3dm";
}>;

export declare type Cesium3dTilesLayer = Layer<Cesium3dTilesLayerDescription & {
    type: "cesium3dtiles";
}>;

export declare const DEFAULT_ANTIALIAS: Antialias;

export declare type Events = {
    resize: () => void;
};

export declare type GeoJsonLayer = Layer<GeoJsonLayerDescription & {
    type: "geojson";
}>;

export declare const JAPAN_GSI_ELEVATION_DECODER: () => ElevationDecoder;

declare type Layer<LD> = RemoveFreeRecursively<LD>;

export declare type LayerDescription = TilesLayer | TerrainLayer | GeoJsonLayer | B3dmLayer | Cesium3dTilesLayer | MvtLayer;

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

export declare const MAPBOX_ELEVATION_DECODER: () => ElevationDecoder;

export declare type MeshCache = Map<string, Mesh | Sprite | Object3D>;

export declare type MvtLayer = Layer<MvtLayerDescription & {
    type: "mvt";
}>;

export declare type Options = {
    container?: HTMLElement;
    canvas?: HTMLCanvasElement | OffscreenCanvas;
    initialWidth?: number;
    initialHeight?: number;
    initialPixelRatio?: number;
    disableAutoResize?: boolean;
    debug?: boolean;
    scene?: Scene;
    globeScene?: Scene;
    camera?: PerspectiveCamera;
    renderer?: WebGLRenderer;
    antialias?: Antialias;
    light?: Light;
    backgroundColor?: number;
    picking?: Picking;
    multisampling?: number;
    halfFloat?: boolean;
};

declare type Picking = {
    enable: boolean;
    highlightColor: Color;
};

declare type RemoveFreeRecursively<T> = T extends {
    free: any;
} ? Omit<{
    [K in keyof T]: RemoveFreeRecursively<T[K]>;
}, "free"> : T;

export declare const selectAntialiasEffect: (aa: Antialias | undefined) => FXAAEffect | SMAAEffect | undefined;

export declare type TerrainLayer = Layer<TerrainLayerDescription & {
    type: "terrain";
}>;

declare class ThreeView {
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    control?: {
        update: () => void;
        get target(): Vector3 | undefined;
    };
    private _scenes;
    private _effectComposer;
    private _renderPass;
    private _globeGBufferRenderTarget;
    private _drapedFeatureMaterials;
    private _core;
    private _options;
    private _stats;
    private _eventDisposer;
    private _disposed;
    private _picked;
    private _events;
    private _uniforms;
    private _meshes;
    private _abortControllers;
    private _workerPoolPromises;
    private _loadedTexs;
    private _buf;
    private _texFragment;
    private _tileHandler;
    private _workerTaskHandler;
    private _featureHandler;
    private _meshHandler;
    private _eventManager;
    private _pickHelper?;
    private _defaultTextureOptions;
    constructor(options: Options);
    get scene(): Scene;
    init(): Promise<void>;
    dispose(): void;
    resize: (width?: number, height?: number, pixelRatio?: number) => void;
    private _updateUniforms;
    /** Returns true if the scene was updated and needs to be rendered. */
    private _update;
    private _render;
    on<K extends keyof Events>(event: K, callback: Events[K]): void;
    off<K extends keyof Events>(event: K, callback: Events[K]): void;
    addLayer(l: LayerDescription): string | undefined;
    updateLayer(layerId: string, l: LayerDescription): void;
    deleteLayer(layerId: string): void;
    private _emit;
    private _startMainLoop;
    private _getCanvasSize;
    private _handleResize;
    onPick(pickArr: number[]): void;
}
export default ThreeView;

export declare type TilesLayer = Layer<TileLayerDescription & {
    type: "tiles";
}>;

export { WorkerPoolPromise }

export declare type WorkerPoolPromises = Map<string, WorkerPoolPromise<unknown>>;

export { }
