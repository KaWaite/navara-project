import type { ColorMap, EventHandler, EventManager } from "@navara/core";
import { type Events, type Transform, TextureFragmentStatus, DelegatedWorkerTasksResult, TransferableTile, TransferableMartini, ReconstructableEntity, ElevationDecoder, ReturnedTransferablePolygonBatchedFeature, ReturnedTransferablePolylineBatchedFeature, VectorTileState } from "@navara/engine";
import { Material, Object3D, Texture } from "three";
import { type ViewEvents } from "..";
import { ThreeViewCamera } from "../camera";
import type { LayersManager } from "../layersManager";
import type { Scenes, TexturizedSceneByTileCoordinates } from "../scene";
import type { TextureOptions } from "../textures";
import type { AbortControllers, MeshCache, WorkerPoolPromises, RenderFlag, TileMapByHandle } from "../type";
import type { CommonUniforms } from "../uniforms";
export type BufferLoader = {
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
export type TextureFragmentHandler = {
    triggerTextureFragmentLoaded: (bits: bigint, status: TextureFragmentStatus) => void;
};
export type WorkerTaskHandler = {
    triggerWorkerTaskCompleted: (bits: bigint, result: DelegatedWorkerTasksResult) => void;
    hasWorkerTask: (bits: bigint) => boolean;
};
export type TileHandler = {
    getMartini: (bits: ReconstructableEntity) => TransferableMartini | undefined;
    getTile: (handle: bigint) => TransferableTile | undefined;
    getParentTile: (handle: bigint) => TransferableTile | undefined;
    getTileElevationDecoder: (handle: bigint) => ElevationDecoder | undefined;
    getVectorTileStates: (handle: bigint) => VectorTileState[] | undefined;
};
/**
 * Handler for accessing individual Globe properties from WASM.
 * This provides a reference-based interface instead of copying the entire Globe object.
 */
export type GlobeHandler = {
    getTransparent: () => boolean | undefined;
    getMaxSse: () => number | undefined;
    getSegments: () => number | undefined;
    getColor: () => number | undefined;
    getHideUnderground: () => boolean | undefined;
    getShouldComputeNormalFromVertex: () => boolean | undefined;
    getOpacity: () => number | undefined;
    getWireframe: () => boolean | undefined;
    getElevationColormap: () => Float32Array | undefined;
    setTransparent: (value: boolean) => void;
    setMaxSse: (value: number) => void;
    setSegments: (value: number) => void;
    setColor: (value: number) => void;
    setHideUnderground: (value: boolean) => void;
    setShouldComputeNormalFromVertex: (value: boolean) => void;
    setOpacity: (value: number) => void;
    setWireframe: (value: boolean) => void;
    setElevationColormap: (value: ColorMap) => void;
};
export type FeatureHandler = {
    getTransferablePolygonBatchedFeature: (bits: bigint) => ReturnedTransferablePolygonBatchedFeature | undefined;
    getTransferablePolylineBatchedFeature: (bits: bigint) => ReturnedTransferablePolylineBatchedFeature | undefined;
    markFeatureIsRendered: (type: "point" | "polyline" | "polygon" | "model", bits: bigint) => void;
    readPropertiesFromFeature(bits: bigint, callback: (batchIdx: number, batchId: number, properties?: Map<string, unknown>) => void): void;
};
export type MeshHandler = {
    setTileMeshPrepared: (handle: bigint) => void;
};
export declare function processEvent(eventManager: EventManager, scenes: Scenes, camera: ThreeViewCamera, meshes: MeshCache, abortControllers: AbortControllers, buf: BufferLoader, texFragment: TextureFragmentHandler, tileHandler: TileHandler, workerTaskHandler: WorkerTaskHandler, meshHandler: MeshHandler, featureHandler: FeatureHandler, loadedTexs: Map<string, Texture>, workerPoolPromises: WorkerPoolPromises, event: Events | undefined, uniforms: CommonUniforms, drapedFeatureMaterials: Map<string, Material>, texturizedSceneByTileCoordinates: TexturizedSceneByTileCoordinates, tileMapByHandle: TileMapByHandle, textureOptions: TextureOptions, renderFlag: RenderFlag, viewEvents: EventHandler<ViewEvents>, layersManager: LayersManager, updatedAt: number): void;
export declare function setTransform(obj: Object3D, transform: Transform, keepPosition?: boolean): void;
