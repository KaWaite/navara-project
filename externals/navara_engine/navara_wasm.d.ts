/* tslint:disable */
/* eslint-disable */
export function start(): void;
/**
 * Coordinate reference system
 */
export enum CRS {
  /**
   * EPSG:4326
   */
  Geographic = 0,
  /**
   * EPSG:4978
   */
  Geocentric = 1,
}
export enum TextureFragmentStatus {
  Success = 0,
  Fail = 1,
  Pending = 2,
}
export class B3dmLayerDescription {
  private constructor();
  free(): void;
  type?: string;
  crs?: string;
  data: any;
  model?: ModelMaterial;
}
export class BillboardMaterial {
  private constructor();
  free(): void;
  show?: boolean;
  size?: number;
  color?: number;
  center?: Vec2;
  height?: number;
  url?: string;
  scale_by_distance?: boolean;
  clamp_to_ground?: boolean;
  depth_test?: boolean;
}
export class BillboardMesh {
  private constructor();
  free(): void;
  material: BillboardMaterial;
  transform: Transform;
  geometry: TransferableSingleGeometry;
  active: boolean;
}
export class CachedMeshHandle {
  free(): void;
  constructor(vertices: number, indices: number, uvs: number, heights?: number);
  vertices: number;
  indices: number;
  uvs: number;
  heights?: number;
}
export class Cesium3dTilesLayerDescription {
  private constructor();
  free(): void;
  type?: string;
  crs?: string;
  data: any;
  model?: ModelMaterial;
}
export class ConstructPolygonBatchedFeatureParameters {
  private constructor();
  free(): void;
  batched_feature: ReconstructableEntity;
}
export class ConstructPolygonBatchedFeatureResult {
  free(): void;
  constructor(geometry: TransferablePolygonGeometry, extent: ExtentRadianF32);
  geometry: TransferablePolygonGeometry;
  extent: ExtentRadianF32;
}
export class ConstructPolylineBatchedFeatureParameters {
  private constructor();
  free(): void;
  batched_feature: ReconstructableEntity;
}
export class ConstructPolylineBatchedFeatureResult {
  free(): void;
  constructor(geometry: TransferablePolylineGeometry, extent: ExtentRadianF32);
  geometry: TransferablePolylineGeometry;
  extent: ExtentRadianF32;
}
export class ConstructTerrainMeshParameters {
  private constructor();
  free(): void;
  martini_id: ReconstructableEntity;
  bytes_handle: number;
  tile_handle: bigint;
}
export class ConstructTerrainMeshResult {
  free(): void;
  constructor(geometry: TransferableGeometry, heights: number, min_height: number, max_height: number);
  geometry: TransferableGeometry;
  heights: number;
  min_height: number;
  max_height: number;
}
export class ConstructedPolygonGeometry {
  private constructor();
  free(): void;
  position(): Float32Array;
  position_size(): number;
  normal(): Float32Array | undefined;
  normal_size(): number | undefined;
  scale_normal_and_cap(): Float32Array | undefined;
  scale_normal_and_cap_size(): number | undefined;
  batch_id(): Float32Array | undefined;
  batch_id_size(): number | undefined;
  indices(): Uint32Array;
  drop(): void;
  extent: ExtentRadianF32;
}
export class ConstructedPolylineGeometry {
  private constructor();
  free(): void;
  position(): Float32Array;
  position_size(): number;
  start(): Float32Array;
  start_size(): number;
  forward_offset(): Float32Array;
  forward_offset_size(): number;
  start_normals(): Float32Array;
  start_normals_size(): number;
  end_normal_and_texture_coordinate_normalization_x(): Float32Array;
  end_normal_and_texture_coordinate_normalization_x_size(): number;
  right_normal_and_texture_coordinate_normalization_y(): Float32Array;
  right_normal_and_texture_coordinate_normalization_y_size(): number;
  batch_id(): Float32Array | undefined;
  batch_id_size(): number | undefined;
  indices(): Uint32Array;
  drop(): void;
  extent: ExtentRadianF32;
}
export class Core {
  free(): void;
  constructor(id: string);
  start(): void;
  update(): void;
  readEvents(): Events | undefined;
  input(input: any): void;
  getBufferU8(handle: number): Uint8Array | undefined;
  getBufferU32(handle: number): Uint32Array | undefined;
  getBufferF32(handle: number): Float32Array | undefined;
  setBufferU8(handle: number, bits: bigint, byte_length: number, f: Function): void;
  newBufferU8(byte_length: number, f: Function): number | undefined;
  newBufferU32(byte_length: number, f: Function): number | undefined;
  newBufferF32(byte_length: number, f: Function): number | undefined;
  newBufferU8Cloned(data: Uint8Array): number | undefined;
  newBufferU32Cloned(data: Uint32Array): number | undefined;
  newBufferF32Cloned(data: Float32Array): number | undefined;
  removeBuffer(handle: number): void;
  triggerDataRequesterFailed(bits: bigint): void;
  resize(width: number, height: number, pixel_ratio: number): void;
  addLayer(layer: any): string;
  updateLayer(layer_id: string, layer: any): void;
  deleteLayer(layer_id: string): void;
  triggerTextureFragmentLoaded(bits: bigint, status: TextureFragmentStatus): void;
  setTileMeshPrepared(handle: bigint): void;
  markFeatureIsRendered(feature_type: string, bits: bigint): void;
  triggerWorkerTaskCompleted(bits: bigint, result: DelegatedWorkerTasksResult): void;
  getMartini(martini_id: ReconstructableEntity): TransferableMartini | undefined;
  hasDataRequester(id: bigint): boolean;
  hasWorkerTask(id: bigint): boolean;
  getTile(handle: bigint): TransferableTile | undefined;
  getParentTile(handle: bigint): TransferableTile | undefined;
  getTileElevationDecoder(handle: bigint): ElevationDecoder | undefined;
  getTransferablePolygonBatchedFeature(batched_feature_id: bigint): ReturnedTransferablePolygonBatchedFeature | undefined;
  getTransferablePolylineBatchedFeature(batched_feature_id: bigint): ReturnedTransferablePolylineBatchedFeature | undefined;
  getBatchProp(batch_id: number): string;
  id: string;
}
export class DataRequestEvent {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
  bits: bigint;
  handle: number;
  extension: string;
  url: string;
}
export class DataRequesterRemovedEvent {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
  bits: bigint;
  handle: number;
}
export class DelegatedWorkerTasksParameters {
  private constructor();
  free(): void;
  delegator_id: ReconstructableEntity;
  construct_terrain_mesh?: ConstructTerrainMeshParameters;
  upsample_terrain_mesh?: UpsampleTerrainMeshParameters;
  construct_polygon_batched_feature?: ConstructPolygonBatchedFeatureParameters;
  construct_polyline_batched_feature?: ConstructPolylineBatchedFeatureParameters;
}
export class DelegatedWorkerTasksResult {
  private constructor();
  free(): void;
  static withConstructTerrainMesh(delegator_id: ReconstructableEntity, construct_terrain_mesh?: ConstructTerrainMeshResult): DelegatedWorkerTasksResult;
  static withUpsampleTerrainMesh(delegator_id: ReconstructableEntity, upsample_terrain_mesh?: UpsampleTerrainMeshResult): DelegatedWorkerTasksResult;
  static withConstructPolygonBatchedFeature(delegator_id: ReconstructableEntity, construct_polygon_batched_feature?: ConstructPolygonBatchedFeatureResult): DelegatedWorkerTasksResult;
  static withConstructPolylineBatchedFeature(delegator_id: ReconstructableEntity, construct_polyline_batched_feature?: ConstructPolylineBatchedFeatureResult): DelegatedWorkerTasksResult;
  delegator_id: ReconstructableEntity;
  construct_terrain_mesh?: ConstructTerrainMeshResult;
  upsample_terrain_mesh?: UpsampleTerrainMeshResult;
  construct_polygon_batched_feature?: ConstructPolygonBatchedFeatureResult;
  construct_polyline_batched_feature?: ConstructPolylineBatchedFeatureResult;
}
export class ElevationDecoder {
  free(): void;
  constructor(r_scaler: number, g_scaler: number, b_scaler: number, offset: number, max_offset: number, min_offset: number, boundary: number, epsilon: number);
  static japanGSI(): ElevationDecoder;
  static mapbox(): ElevationDecoder;
  r_scaler: number;
  g_scaler: number;
  b_scaler: number;
  offset: number;
  max_offset: number;
  min_offset: number;
  boundary: number;
  epsilon: number;
}
export class EntityEvent {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
}
export class Events {
  private constructor();
  free(): void;
  camera_transform_updated?: Transform;
  object_transform_updated: (ObjectTransformEvent)[];
  mesh_removed: (EntityEvent)[];
  mesh_added: (MeshAdded)[];
  mesh_updated: (MeshChanged)[];
  data_requested: (DataRequestEvent)[];
  data_requester_removed: (DataRequesterRemovedEvent)[];
  texture_fragment_requested: (TextureFragmentRequestedEvent)[];
  texture_fragment_removed: (EntityEvent)[];
  worker_task_delegated: (WorkerTaskDelegatedEvent)[];
  worker_task_removed: (EntityEvent)[];
  renderable_feature_added: (RenderableFeatureAddedEvent)[];
  renderable_feature_changed: (RenderableFeatureChangedEvent)[];
  renderable_feature_removed: (EntityEvent)[];
}
export class ExtentRadianF32 {
  free(): void;
  constructor(west: number, south: number, east: number, north: number);
  west: number;
  south: number;
  east: number;
  north: number;
}
export class FloatAttribute {
  free(): void;
  constructor(data: Float32Array, size: number);
  transferData(): Float32Array;
  size: number;
}
export class GeoJsonLayerDescription {
  private constructor();
  free(): void;
  type?: string;
  crs?: string;
  data: any;
  point?: PointMaterial;
  billboard?: BillboardMaterial;
  polyline?: PolylineMaterial;
  polygon?: PolygonMaterial;
  model?: ModelMaterial;
}
export class Geometry {
  free(): void;
  constructor(vertices: Float32Array, indices: Uint32Array, uvs: Float32Array);
  transferVertices(): Float32Array;
  transferUvs(): Float32Array;
  transferIndices(): Uint32Array;
  drop(): void;
}
export class LayerDescription {
  private constructor();
  free(): void;
  type?: string;
}
export class LayerDescriptionData {
  private constructor();
  free(): void;
  data: any;
}
export class LayerDescriptionUrl {
  private constructor();
  free(): void;
  url: string;
}
export class Mesh {
  private constructor();
  free(): void;
  vertices: number;
  uvs: number;
  indices: number;
  active: boolean;
  render_order: number;
}
export class MeshAdded {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
  tile_handle: bigint;
  mesh: Mesh;
  material: RasterTileMaterial;
  transform: Transform;
}
export class MeshChanged {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
  mesh: Mesh;
  material: RasterTileMaterial;
}
export class ModelMaterial {
  private constructor();
  free(): void;
  show?: boolean;
  url?: string;
  size?: number;
  height?: number;
  max_sse?: number;
  clamp_to_ground?: boolean;
  should_rotate_in_default?: boolean;
}
export class ModelMesh {
  private constructor();
  free(): void;
  material: ModelMaterial;
  transform: Transform;
  bin?: number;
  geometry: TransferableModelGeometry;
  active: boolean;
}
export class MvtLayerDescription {
  private constructor();
  free(): void;
  type?: string;
  crs?: string;
  data: any;
  point?: PointMaterial;
  billboard?: BillboardMaterial;
  polyline?: PolylineMaterial;
  polygon?: PolygonMaterial;
  vector_tile?: VectorTileMaterial;
}
export class NearFar {
  private constructor();
  free(): void;
  near: number;
  far: number;
}
export class ObjectTransformEvent {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
  transform: Transform;
}
export class PointMaterial {
  private constructor();
  free(): void;
  show?: boolean;
  size?: number;
  color?: number;
  center?: Vec2;
  height?: number;
  scale_by_distance?: boolean;
  clamp_to_ground?: boolean;
  depth_test?: boolean;
}
export class PointMesh {
  private constructor();
  free(): void;
  material: PointMaterial;
  transform: Transform;
  geometry: TransferableSingleGeometry;
  active: boolean;
}
export class PolygonGeometry {
  private constructor();
  free(): void;
  position(): Float32Array;
  position_size(): number;
  normal(): Float32Array | undefined;
  normal_size(): number | undefined;
  scale_normal_and_cap(): Float32Array | undefined;
  scale_normal_and_cap_size(): number | undefined;
  batch_id(): Float32Array | undefined;
  batch_id_size(): number | undefined;
  indices(): Uint32Array;
  drop(): void;
}
export class PolygonGeometryAttributes {
  private constructor();
  free(): void;
  transfer_position(): Float32Array;
  transfer_position_size(): number;
  transfer_normal(): Float32Array | undefined;
  transfer_normal_size(): number | undefined;
  transfer_scale_normal_and_cap(): Float32Array | undefined;
  transfer_scale_normal_and_cap_size(): number | undefined;
  transfer_batch_id(): Float32Array | undefined;
  transfer_batch_id_size(): number | undefined;
  drop(): void;
}
export class PolygonInternalMaterial {
  private constructor();
  free(): void;
  min_max_heights: Float32Array;
}
export class PolygonMaterial {
  free(): void;
  constructor(show?: boolean, color?: number, clamp_to_ground?: boolean, height?: number, extruded_height?: number, wireframe?: boolean, __internal__?: PolygonInternalMaterial);
  show?: boolean;
  color?: number;
  clamp_to_ground?: boolean;
  height?: number;
  extruded_height?: number;
  wireframe?: boolean;
  __internal__?: PolygonInternalMaterial;
}
export class PolygonMesh {
  private constructor();
  free(): void;
  material: PolygonMaterial;
  geometry: TransferablePolygonGeometry;
  transform: Transform;
  active: boolean;
}
export class PolylineGeometry {
  private constructor();
  free(): void;
  position(): Float32Array;
  position_size(): number;
  start(): Float32Array;
  start_size(): number;
  forward_offset(): Float32Array;
  forward_offset_size(): number;
  start_normals(): Float32Array;
  start_normals_size(): number;
  end_normal_and_texture_coordinate_normalization_x(): Float32Array;
  end_normal_and_texture_coordinate_normalization_x_size(): number;
  right_normal_and_texture_coordinate_normalization_y(): Float32Array;
  right_normal_and_texture_coordinate_normalization_y_size(): number;
  batch_id(): Float32Array | undefined;
  batch_id_size(): number | undefined;
  indices(): Uint32Array;
  drop(): void;
}
export class PolylineGeometryAttributes {
  private constructor();
  free(): void;
  transfer_position(): Float32Array;
  transfer_position_size(): number;
  transfer_start(): Float32Array;
  transfer_start_size(): number;
  transfer_forward_offset(): Float32Array;
  transfer_forward_offset_size(): number;
  transfer_start_normals(): Float32Array;
  transfer_start_normals_size(): number;
  transfer_end_normal_and_texture_coordinate_normalization_x(): Float32Array;
  transfer_end_normal_and_texture_coordinate_normalization_x_size(): number;
  transfer_right_normal_and_texture_coordinate_normalization_y(): Float32Array;
  transfer_right_normal_and_texture_coordinate_normalization_y_size(): number;
  transfer_batch_id(): Float32Array | undefined;
  transfer_batch_id_size(): number | undefined;
  drop(): void;
}
export class PolylineInternalMaterial {
  private constructor();
  free(): void;
  min_max_heights: Float32Array;
}
export class PolylineMaterial {
  free(): void;
  constructor(show?: boolean, color?: number, clamp_to_ground?: boolean, height?: number, width?: number, __internal__?: PolylineInternalMaterial);
  show?: boolean;
  color?: number;
  width?: number;
  clamp_to_ground?: boolean;
  height?: number;
  __internal__?: PolylineInternalMaterial;
}
export class PolylineMesh {
  private constructor();
  free(): void;
  material: PolylineMaterial;
  geometry: TransferablePolylineGeometry;
  transform: Transform;
  active: boolean;
}
export class RasterTerrainMaterial {
  private constructor();
  free(): void;
  show?: boolean;
  segments?: number;
  max_zoom?: number;
  min_zoom?: number;
  wireframe?: boolean;
  elevation_decoder?: ElevationDecoder;
  tile_size?: number;
}
export class RasterTileInternalMaterial {
  private constructor();
  free(): void;
  texture_fragment?: TextureFragment;
}
export class RasterTileMaterial {
  private constructor();
  free(): void;
  show?: boolean;
  segments?: number;
  color?: number;
  opacity?: number;
  max_zoom?: number;
  max_sse?: number;
  wireframe?: boolean;
  should_compute_normal_from_vertex?: boolean;
  __internal__?: RasterTileInternalMaterial;
}
/**
 * This is used to share the entity id between WASM and client.
 * You can reconstruct Bevy Entity by `Entity:from_bits`.
 */
export class ReconstructableEntity {
  private constructor();
  free(): void;
  0: bigint;
}
export class RenderableFeature {
  private constructor();
  free(): void;
  point?: PointMesh;
  billboard?: BillboardMesh;
  polyline?: PolylineMesh;
  polygon?: PolygonMesh;
  model?: ModelMesh;
}
export class RenderableFeatureAddedEvent {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
  bits: bigint;
  feature: RenderableFeature;
}
export class RenderableFeatureChangedEvent {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
  bits: bigint;
  feature: RenderableFeature;
}
export class ReturnedConstructedTerrainMesh {
  free(): void;
  constructor(geometry: Geometry, max_height: number, min_height: number, heights: Float32Array);
  transferVertices(): Float32Array;
  transferUvs(): Float32Array;
  transferIndices(): Uint32Array;
  transferHeights(): Float32Array;
  drop(): void;
  max_height: number;
  min_height: number;
}
export class ReturnedTransferablePolygonBatchedFeature {
  private constructor();
  free(): void;
  transferBatchIds(): Uint32Array;
  transferOuterRing(): Float32Array;
  transferOuterRingSizes(): Uint32Array;
  transferHoles(): Float32Array;
  transferHolesBoundaries(): Uint32Array;
  transferHolesSizes(): Uint32Array;
  transferHolesTotalSizes(): Uint32Array;
  transferExpectedWindingOrders(): Uint8Array;
  crs(): CRS;
  length(): number;
  material: PolygonMaterial;
}
export class ReturnedTransferablePolylineBatchedFeature {
  private constructor();
  free(): void;
  transferBatchIds(): Uint32Array;
  transferPoints(): Float32Array;
  transferPointsSizes(): Uint32Array;
  crs(): CRS;
  length(): number;
  material: PolylineMaterial;
}
export class TerrainLayerDescription {
  private constructor();
  free(): void;
  type: string;
  data: any;
  raster_terrain?: RasterTerrainMaterial;
  /**
   * Compute normals from vertices if the model doesn't have a normal.
   */
  should_compute_normal_from_vertex?: boolean;
}
export class TextureFragment {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
}
export class TextureFragmentRequestedEvent {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
  bits: bigint;
  url: string;
  status: TextureFragmentStatus;
}
export class TileLayerDescription {
  private constructor();
  free(): void;
  type: string;
  data: any;
  raster_tile?: RasterTileMaterial;
}
export class TileXYZ {
  free(): void;
  constructor(x: number, y: number, z: number);
  x: number;
  y: number;
  z: number;
}
export class TransferableFloatAttribute {
  free(): void;
  constructor(data: number, size: number);
  data: number;
  size: number;
}
export class TransferableGeometry {
  free(): void;
  constructor(vertices: number, uvs: number, indices: number);
  vertices: number;
  uvs: number;
  indices: number;
}
export class TransferableHierarchy {
  private constructor();
  free(): void;
  expected_winding_order: number;
}
/**
 * To transfer the hierarchy efficiently, the holes are managed as one-dimensional array.
 */
export class TransferableHoles {
  private constructor();
  free(): void;
}
export class TransferableMartini {
  free(): void;
  constructor(size: number, coords: Uint32Array);
  transfer_coords(): Uint32Array;
  size: number;
}
export class TransferableModelGeometry {
  private constructor();
  free(): void;
  global_batch_ids?: number;
}
/**
 * To transfer the batched feature efficiently, the all feature's properties are managed as one-dimensional array.
 */
export class TransferablePolygonBatchedFeature {
  free(): void;
  constructor(crs: CRS, length: number);
  setOuterRing(byte_length: number, f: Function): void;
  setOuterRingSizes(byte_length: number, f: Function): void;
  setHoles(byte_length: number, f: Function): void;
  setHolesSizes(byte_length: number, f: Function): void;
  setHolesTotalSizes(byte_length: number, f: Function): void;
  setHolesBoundaries(byte_length: number, f: Function): void;
  setBatchIds(byte_length: number, f: Function): void;
  setExpectedWindingOrders(byte_length: number, f: Function): void;
  drop(): void;
  transferBatchIds(): Uint32Array;
  transferOuterRing(): Float32Array;
  transferOuterRingSizes(): Uint32Array;
  transferHoles(): Float32Array;
  transferHolesBoundaries(): Uint32Array;
  transferHolesSizes(): Uint32Array;
  transferHolesTotalSizes(): Uint32Array;
  transferExpectedWindingOrders(): Uint8Array;
  crs: CRS;
  length: number;
}
export class TransferablePolygonGeometry {
  free(): void;
  constructor(position: TransferableFloatAttribute, normal: TransferableFloatAttribute | undefined, scale_normal_and_cap: TransferableFloatAttribute | undefined, batch_id: TransferableFloatAttribute | undefined, indices: number);
  position: TransferableFloatAttribute;
  normal?: TransferableFloatAttribute;
  scale_normal_and_cap?: TransferableFloatAttribute;
  batch_id?: TransferableFloatAttribute;
  indices: number;
}
/**
 * To transfer the batched feature efficiently, the all feature's properties are managed as one-dimensional array.
 */
export class TransferablePolylineBatchedFeature {
  free(): void;
  constructor(crs: CRS, length: number);
  setBatchIds(byte_length: number, f: Function): void;
  setPoints(byte_length: number, f: Function): void;
  setPointsSizes(byte_length: number, f: Function): void;
  drop(): void;
  transferBatchIds(): Uint32Array;
  transferPoints(): Float32Array;
  transferPointsSizes(): Uint32Array;
  crs: CRS;
  length: number;
}
export class TransferablePolylineGeometry {
  free(): void;
  constructor(position: TransferableFloatAttribute, start: TransferableFloatAttribute, forward_offset: TransferableFloatAttribute, start_normals: TransferableFloatAttribute, end_normal_and_texture_coordinate_normalization_x: TransferableFloatAttribute, right_normal_and_texture_coordinate_normalization_y: TransferableFloatAttribute, batch_id: TransferableFloatAttribute | undefined, indices: number);
  position: TransferableFloatAttribute;
  start: TransferableFloatAttribute;
  forward_offset: TransferableFloatAttribute;
  start_normals: TransferableFloatAttribute;
  end_normal_and_texture_coordinate_normalization_x: TransferableFloatAttribute;
  right_normal_and_texture_coordinate_normalization_y: TransferableFloatAttribute;
  batch_id?: TransferableFloatAttribute;
  indices: number;
}
export class TransferableRasterDEMData {
  free(): void;
  constructor(decoder: ElevationDecoder);
  decoder: ElevationDecoder;
}
export class TransferableSingleGeometry {
  private constructor();
  free(): void;
  batch_id?: number;
}
export class TransferableTile {
  free(): void;
  constructor(coords: TileXYZ, max_height: number, cached_mesh_handle?: CachedMeshHandle);
  coords: TileXYZ;
  max_height: number;
  cached_mesh_handle?: CachedMeshHandle;
}
export class Transform {
  private constructor();
  free(): void;
  tx: number;
  ty: number;
  tz: number;
  qx: number;
  qy: number;
  qz: number;
  qw: number;
  sx: number;
  sy: number;
  sz: number;
}
export class UpsamplableTerrainGeometry {
  free(): void;
  constructor(uvs: Float32Array, indices: Uint32Array, heights: Float32Array);
}
export class UpsampleTerrainMeshParameters {
  free(): void;
  constructor(tile_handle: bigint);
  tile_handle: bigint;
}
export class UpsampleTerrainMeshResult {
  free(): void;
  constructor(geometry: TransferableGeometry, heights: number, min_height: number, max_height: number);
  geometry: TransferableGeometry;
  heights: number;
  min_height: number;
  max_height: number;
}
export class Vec2 {
  private constructor();
  free(): void;
  x: number;
  y: number;
}
export class Vec3 {
  private constructor();
  free(): void;
  x: number;
  y: number;
  z: number;
}
export class VectorTileMaterial {
  private constructor();
  free(): void;
  show?: boolean;
  max_zoom?: number;
  max_sse?: number;
}
export class WindingOrder {
  private constructor();
  free(): void;
  0: number;
}
export class WorkerTaskDelegatedEvent {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
  bits: bigint;
  task: DelegatedWorkerTasksParameters;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_tilelayerdescription_free: (a: number, b: number) => void;
  readonly __wbg_get_tilelayerdescription_type: (a: number) => [number, number];
  readonly __wbg_set_tilelayerdescription_type: (a: number, b: number, c: number) => void;
  readonly __wbg_get_tilelayerdescription_data: (a: number) => any;
  readonly __wbg_set_tilelayerdescription_data: (a: number, b: any) => void;
  readonly __wbg_get_tilelayerdescription_raster_tile: (a: number) => number;
  readonly __wbg_set_tilelayerdescription_raster_tile: (a: number, b: number) => void;
  readonly __wbg_terrainlayerdescription_free: (a: number, b: number) => void;
  readonly __wbg_get_terrainlayerdescription_type: (a: number) => [number, number];
  readonly __wbg_set_terrainlayerdescription_type: (a: number, b: number, c: number) => void;
  readonly __wbg_get_terrainlayerdescription_data: (a: number) => any;
  readonly __wbg_set_terrainlayerdescription_data: (a: number, b: any) => void;
  readonly __wbg_get_terrainlayerdescription_raster_terrain: (a: number) => number;
  readonly __wbg_set_terrainlayerdescription_raster_terrain: (a: number, b: number) => void;
  readonly __wbg_get_terrainlayerdescription_should_compute_normal_from_vertex: (a: number) => number;
  readonly __wbg_set_terrainlayerdescription_should_compute_normal_from_vertex: (a: number, b: number) => void;
  readonly __wbg_geojsonlayerdescription_free: (a: number, b: number) => void;
  readonly __wbg_get_geojsonlayerdescription_type: (a: number) => [number, number];
  readonly __wbg_set_geojsonlayerdescription_type: (a: number, b: number, c: number) => void;
  readonly __wbg_get_geojsonlayerdescription_crs: (a: number) => [number, number];
  readonly __wbg_set_geojsonlayerdescription_crs: (a: number, b: number, c: number) => void;
  readonly __wbg_get_geojsonlayerdescription_data: (a: number) => any;
  readonly __wbg_set_geojsonlayerdescription_data: (a: number, b: any) => void;
  readonly __wbg_get_geojsonlayerdescription_point: (a: number) => number;
  readonly __wbg_set_geojsonlayerdescription_point: (a: number, b: number) => void;
  readonly __wbg_get_geojsonlayerdescription_billboard: (a: number) => number;
  readonly __wbg_set_geojsonlayerdescription_billboard: (a: number, b: number) => void;
  readonly __wbg_get_geojsonlayerdescription_polyline: (a: number) => number;
  readonly __wbg_set_geojsonlayerdescription_polyline: (a: number, b: number) => void;
  readonly __wbg_get_geojsonlayerdescription_polygon: (a: number) => number;
  readonly __wbg_set_geojsonlayerdescription_polygon: (a: number, b: number) => void;
  readonly __wbg_get_geojsonlayerdescription_model: (a: number) => number;
  readonly __wbg_set_geojsonlayerdescription_model: (a: number, b: number) => void;
  readonly __wbg_b3dmlayerdescription_free: (a: number, b: number) => void;
  readonly __wbg_get_b3dmlayerdescription_type: (a: number) => [number, number];
  readonly __wbg_set_b3dmlayerdescription_type: (a: number, b: number, c: number) => void;
  readonly __wbg_get_b3dmlayerdescription_crs: (a: number) => [number, number];
  readonly __wbg_set_b3dmlayerdescription_crs: (a: number, b: number, c: number) => void;
  readonly __wbg_get_b3dmlayerdescription_data: (a: number) => any;
  readonly __wbg_set_b3dmlayerdescription_data: (a: number, b: any) => void;
  readonly __wbg_get_b3dmlayerdescription_model: (a: number) => number;
  readonly __wbg_set_b3dmlayerdescription_model: (a: number, b: number) => void;
  readonly __wbg_cesium3dtileslayerdescription_free: (a: number, b: number) => void;
  readonly __wbg_mvtlayerdescription_free: (a: number, b: number) => void;
  readonly __wbg_get_mvtlayerdescription_type: (a: number) => [number, number];
  readonly __wbg_set_mvtlayerdescription_type: (a: number, b: number, c: number) => void;
  readonly __wbg_get_mvtlayerdescription_crs: (a: number) => [number, number];
  readonly __wbg_set_mvtlayerdescription_crs: (a: number, b: number, c: number) => void;
  readonly __wbg_get_mvtlayerdescription_data: (a: number) => any;
  readonly __wbg_set_mvtlayerdescription_data: (a: number, b: any) => void;
  readonly __wbg_get_mvtlayerdescription_vector_tile: (a: number) => number;
  readonly __wbg_set_mvtlayerdescription_vector_tile: (a: number, b: number) => void;
  readonly __wbg_layerdescription_free: (a: number, b: number) => void;
  readonly __wbg_get_layerdescription_type: (a: number) => [number, number];
  readonly __wbg_set_layerdescription_type: (a: number, b: number, c: number) => void;
  readonly __wbg_layerdescriptiondata_free: (a: number, b: number) => void;
  readonly __wbg_get_layerdescriptiondata_data: (a: number) => any;
  readonly __wbg_set_layerdescriptiondata_data: (a: number, b: any) => void;
  readonly __wbg_layerdescriptionurl_free: (a: number, b: number) => void;
  readonly __wbg_get_layerdescriptionurl_url: (a: number) => [number, number];
  readonly __wbg_set_layerdescriptionurl_url: (a: number, b: number, c: number) => void;
  readonly __wbg_set_cesium3dtileslayerdescription_data: (a: number, b: any) => void;
  readonly __wbg_get_cesium3dtileslayerdescription_data: (a: number) => any;
  readonly __wbg_set_mvtlayerdescription_point: (a: number, b: number) => void;
  readonly __wbg_set_mvtlayerdescription_polyline: (a: number, b: number) => void;
  readonly __wbg_set_mvtlayerdescription_polygon: (a: number, b: number) => void;
  readonly __wbg_set_cesium3dtileslayerdescription_type: (a: number, b: number, c: number) => void;
  readonly __wbg_set_cesium3dtileslayerdescription_crs: (a: number, b: number, c: number) => void;
  readonly __wbg_get_mvtlayerdescription_billboard: (a: number) => number;
  readonly __wbg_set_cesium3dtileslayerdescription_model: (a: number, b: number) => void;
  readonly __wbg_set_mvtlayerdescription_billboard: (a: number, b: number) => void;
  readonly __wbg_get_mvtlayerdescription_point: (a: number) => number;
  readonly __wbg_get_cesium3dtileslayerdescription_model: (a: number) => number;
  readonly __wbg_get_mvtlayerdescription_polygon: (a: number) => number;
  readonly __wbg_get_cesium3dtileslayerdescription_type: (a: number) => [number, number];
  readonly __wbg_get_cesium3dtileslayerdescription_crs: (a: number) => [number, number];
  readonly __wbg_get_mvtlayerdescription_polyline: (a: number) => number;
  readonly __wbg_transferablefloatattribute_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablefloatattribute_data: (a: number) => number;
  readonly __wbg_set_transferablefloatattribute_data: (a: number, b: number) => void;
  readonly __wbg_get_transferablefloatattribute_size: (a: number) => number;
  readonly __wbg_set_transferablefloatattribute_size: (a: number, b: number) => void;
  readonly transferablefloatattribute_new: (a: number, b: number) => number;
  readonly __wbg_pointmesh_free: (a: number, b: number) => void;
  readonly __wbg_get_pointmesh_material: (a: number) => number;
  readonly __wbg_set_pointmesh_material: (a: number, b: number) => void;
  readonly __wbg_get_pointmesh_transform: (a: number) => number;
  readonly __wbg_set_pointmesh_transform: (a: number, b: number) => void;
  readonly __wbg_get_pointmesh_geometry: (a: number) => number;
  readonly __wbg_set_pointmesh_geometry: (a: number, b: number) => void;
  readonly __wbg_get_pointmesh_active: (a: number) => number;
  readonly __wbg_set_pointmesh_active: (a: number, b: number) => void;
  readonly __wbg_billboardmesh_free: (a: number, b: number) => void;
  readonly __wbg_get_billboardmesh_material: (a: number) => number;
  readonly __wbg_set_billboardmesh_material: (a: number, b: number) => void;
  readonly __wbg_get_billboardmesh_transform: (a: number) => number;
  readonly __wbg_set_billboardmesh_transform: (a: number, b: number) => void;
  readonly __wbg_get_billboardmesh_geometry: (a: number) => number;
  readonly __wbg_set_billboardmesh_geometry: (a: number, b: number) => void;
  readonly __wbg_get_billboardmesh_active: (a: number) => number;
  readonly __wbg_set_billboardmesh_active: (a: number, b: number) => void;
  readonly __wbg_polylinemesh_free: (a: number, b: number) => void;
  readonly __wbg_get_polylinemesh_material: (a: number) => number;
  readonly __wbg_set_polylinemesh_material: (a: number, b: number) => void;
  readonly __wbg_get_polylinemesh_geometry: (a: number) => number;
  readonly __wbg_set_polylinemesh_geometry: (a: number, b: number) => void;
  readonly __wbg_get_polylinemesh_transform: (a: number) => number;
  readonly __wbg_set_polylinemesh_transform: (a: number, b: number) => void;
  readonly __wbg_get_polylinemesh_active: (a: number) => number;
  readonly __wbg_set_polylinemesh_active: (a: number, b: number) => void;
  readonly __wbg_polygonmesh_free: (a: number, b: number) => void;
  readonly __wbg_get_polygonmesh_material: (a: number) => number;
  readonly __wbg_set_polygonmesh_material: (a: number, b: number) => void;
  readonly __wbg_get_polygonmesh_geometry: (a: number) => number;
  readonly __wbg_set_polygonmesh_geometry: (a: number, b: number) => void;
  readonly __wbg_get_polygonmesh_transform: (a: number) => number;
  readonly __wbg_set_polygonmesh_transform: (a: number, b: number) => void;
  readonly __wbg_get_polygonmesh_active: (a: number) => number;
  readonly __wbg_set_polygonmesh_active: (a: number, b: number) => void;
  readonly __wbg_modelmesh_free: (a: number, b: number) => void;
  readonly __wbg_get_modelmesh_material: (a: number) => number;
  readonly __wbg_set_modelmesh_material: (a: number, b: number) => void;
  readonly __wbg_get_modelmesh_transform: (a: number) => number;
  readonly __wbg_set_modelmesh_transform: (a: number, b: number) => void;
  readonly __wbg_get_modelmesh_bin: (a: number) => number;
  readonly __wbg_set_modelmesh_bin: (a: number, b: number) => void;
  readonly __wbg_get_modelmesh_geometry: (a: number) => number;
  readonly __wbg_set_modelmesh_geometry: (a: number, b: number) => void;
  readonly __wbg_get_modelmesh_active: (a: number) => number;
  readonly __wbg_set_modelmesh_active: (a: number, b: number) => void;
  readonly __wbg_renderablefeature_free: (a: number, b: number) => void;
  readonly __wbg_get_renderablefeature_point: (a: number) => number;
  readonly __wbg_set_renderablefeature_point: (a: number, b: number) => void;
  readonly __wbg_get_renderablefeature_billboard: (a: number) => number;
  readonly __wbg_set_renderablefeature_billboard: (a: number, b: number) => void;
  readonly __wbg_get_renderablefeature_polyline: (a: number) => number;
  readonly __wbg_set_renderablefeature_polyline: (a: number, b: number) => void;
  readonly __wbg_get_renderablefeature_polygon: (a: number) => number;
  readonly __wbg_set_renderablefeature_polygon: (a: number, b: number) => void;
  readonly __wbg_get_renderablefeature_model: (a: number) => number;
  readonly __wbg_set_renderablefeature_model: (a: number, b: number) => void;
  readonly __wbg_returnedtransferablepolygonbatchedfeature_free: (a: number, b: number) => void;
  readonly returnedtransferablepolygonbatchedfeature_transferBatchIds: (a: number) => any;
  readonly returnedtransferablepolygonbatchedfeature_transferOuterRing: (a: number) => any;
  readonly returnedtransferablepolygonbatchedfeature_transferOuterRingSizes: (a: number) => any;
  readonly returnedtransferablepolygonbatchedfeature_transferHoles: (a: number) => any;
  readonly returnedtransferablepolygonbatchedfeature_transferHolesBoundaries: (a: number) => any;
  readonly returnedtransferablepolygonbatchedfeature_transferHolesSizes: (a: number) => any;
  readonly returnedtransferablepolygonbatchedfeature_transferHolesTotalSizes: (a: number) => any;
  readonly returnedtransferablepolygonbatchedfeature_transferExpectedWindingOrders: (a: number) => any;
  readonly returnedtransferablepolygonbatchedfeature_crs: (a: number) => number;
  readonly returnedtransferablepolygonbatchedfeature_length: (a: number) => number;
  readonly __wbg_returnedtransferablepolylinebatchedfeature_free: (a: number, b: number) => void;
  readonly returnedtransferablepolylinebatchedfeature_transferBatchIds: (a: number) => any;
  readonly returnedtransferablepolylinebatchedfeature_transferPoints: (a: number) => any;
  readonly returnedtransferablepolylinebatchedfeature_transferPointsSizes: (a: number) => any;
  readonly returnedtransferablepolylinebatchedfeature_crs: (a: number) => number;
  readonly returnedtransferablepolylinebatchedfeature_length: (a: number) => number;
  readonly __wbg_set_returnedtransferablepolygonbatchedfeature_material: (a: number, b: number) => void;
  readonly __wbg_set_returnedtransferablepolylinebatchedfeature_material: (a: number, b: number) => void;
  readonly __wbg_get_returnedtransferablepolygonbatchedfeature_material: (a: number) => number;
  readonly __wbg_get_returnedtransferablepolylinebatchedfeature_material: (a: number) => number;
  readonly __wbg_events_free: (a: number, b: number) => void;
  readonly __wbg_get_events_camera_transform_updated: (a: number) => number;
  readonly __wbg_set_events_camera_transform_updated: (a: number, b: number) => void;
  readonly __wbg_get_events_object_transform_updated: (a: number) => [number, number];
  readonly __wbg_set_events_object_transform_updated: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_mesh_removed: (a: number) => [number, number];
  readonly __wbg_set_events_mesh_removed: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_mesh_added: (a: number) => [number, number];
  readonly __wbg_set_events_mesh_added: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_mesh_updated: (a: number) => [number, number];
  readonly __wbg_set_events_mesh_updated: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_data_requested: (a: number) => [number, number];
  readonly __wbg_set_events_data_requested: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_data_requester_removed: (a: number) => [number, number];
  readonly __wbg_set_events_data_requester_removed: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_texture_fragment_requested: (a: number) => [number, number];
  readonly __wbg_set_events_texture_fragment_requested: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_texture_fragment_removed: (a: number) => [number, number];
  readonly __wbg_set_events_texture_fragment_removed: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_worker_task_delegated: (a: number) => [number, number];
  readonly __wbg_set_events_worker_task_delegated: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_worker_task_removed: (a: number) => [number, number];
  readonly __wbg_set_events_worker_task_removed: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_renderable_feature_added: (a: number) => [number, number];
  readonly __wbg_set_events_renderable_feature_added: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_renderable_feature_changed: (a: number) => [number, number];
  readonly __wbg_set_events_renderable_feature_changed: (a: number, b: number, c: number) => void;
  readonly __wbg_get_events_renderable_feature_removed: (a: number) => [number, number];
  readonly __wbg_set_events_renderable_feature_removed: (a: number, b: number, c: number) => void;
  readonly __wbg_objecttransformevent_free: (a: number, b: number) => void;
  readonly __wbg_get_objecttransformevent_gen: (a: number) => number;
  readonly __wbg_set_objecttransformevent_gen: (a: number, b: number) => void;
  readonly __wbg_get_objecttransformevent_transform: (a: number) => number;
  readonly __wbg_set_objecttransformevent_transform: (a: number, b: number) => void;
  readonly __wbg_transform_free: (a: number, b: number) => void;
  readonly __wbg_get_transform_tx: (a: number) => number;
  readonly __wbg_set_transform_tx: (a: number, b: number) => void;
  readonly __wbg_get_transform_ty: (a: number) => number;
  readonly __wbg_set_transform_ty: (a: number, b: number) => void;
  readonly __wbg_get_transform_tz: (a: number) => number;
  readonly __wbg_set_transform_tz: (a: number, b: number) => void;
  readonly __wbg_get_transform_qx: (a: number) => number;
  readonly __wbg_set_transform_qx: (a: number, b: number) => void;
  readonly __wbg_get_transform_qy: (a: number) => number;
  readonly __wbg_set_transform_qy: (a: number, b: number) => void;
  readonly __wbg_get_transform_qz: (a: number) => number;
  readonly __wbg_set_transform_qz: (a: number, b: number) => void;
  readonly __wbg_get_transform_qw: (a: number) => number;
  readonly __wbg_set_transform_qw: (a: number, b: number) => void;
  readonly __wbg_get_transform_sx: (a: number) => number;
  readonly __wbg_set_transform_sx: (a: number, b: number) => void;
  readonly __wbg_get_transform_sy: (a: number) => number;
  readonly __wbg_set_transform_sy: (a: number, b: number) => void;
  readonly __wbg_get_transform_sz: (a: number) => number;
  readonly __wbg_set_transform_sz: (a: number, b: number) => void;
  readonly __wbg_meshadded_free: (a: number, b: number) => void;
  readonly __wbg_get_meshadded_ind: (a: number) => number;
  readonly __wbg_set_meshadded_ind: (a: number, b: number) => void;
  readonly __wbg_get_meshadded_gen: (a: number) => number;
  readonly __wbg_set_meshadded_gen: (a: number, b: number) => void;
  readonly __wbg_get_meshadded_tile_handle: (a: number) => bigint;
  readonly __wbg_set_meshadded_tile_handle: (a: number, b: bigint) => void;
  readonly __wbg_get_meshadded_mesh: (a: number) => number;
  readonly __wbg_set_meshadded_mesh: (a: number, b: number) => void;
  readonly __wbg_get_meshadded_material: (a: number) => number;
  readonly __wbg_set_meshadded_material: (a: number, b: number) => void;
  readonly __wbg_get_meshadded_transform: (a: number) => number;
  readonly __wbg_set_meshadded_transform: (a: number, b: number) => void;
  readonly __wbg_meshchanged_free: (a: number, b: number) => void;
  readonly __wbg_get_meshchanged_ind: (a: number) => number;
  readonly __wbg_set_meshchanged_ind: (a: number, b: number) => void;
  readonly __wbg_get_meshchanged_gen: (a: number) => number;
  readonly __wbg_set_meshchanged_gen: (a: number, b: number) => void;
  readonly __wbg_get_meshchanged_mesh: (a: number) => number;
  readonly __wbg_set_meshchanged_mesh: (a: number, b: number) => void;
  readonly __wbg_get_meshchanged_material: (a: number) => number;
  readonly __wbg_set_meshchanged_material: (a: number, b: number) => void;
  readonly __wbg_mesh_free: (a: number, b: number) => void;
  readonly __wbg_get_mesh_indices: (a: number) => number;
  readonly __wbg_set_mesh_indices: (a: number, b: number) => void;
  readonly __wbg_get_mesh_active: (a: number) => number;
  readonly __wbg_set_mesh_active: (a: number, b: number) => void;
  readonly __wbg_get_mesh_render_order: (a: number) => number;
  readonly __wbg_set_mesh_render_order: (a: number, b: number) => void;
  readonly __wbg_datarequestevent_free: (a: number, b: number) => void;
  readonly __wbg_get_datarequestevent_ind: (a: number) => number;
  readonly __wbg_set_datarequestevent_ind: (a: number, b: number) => void;
  readonly __wbg_get_datarequestevent_gen: (a: number) => number;
  readonly __wbg_set_datarequestevent_gen: (a: number, b: number) => void;
  readonly __wbg_get_datarequestevent_handle: (a: number) => number;
  readonly __wbg_set_datarequestevent_handle: (a: number, b: number) => void;
  readonly __wbg_get_datarequestevent_extension: (a: number) => [number, number];
  readonly __wbg_set_datarequestevent_extension: (a: number, b: number, c: number) => void;
  readonly __wbg_get_datarequestevent_url: (a: number) => [number, number];
  readonly __wbg_set_datarequestevent_url: (a: number, b: number, c: number) => void;
  readonly __wbg_datarequesterremovedevent_free: (a: number, b: number) => void;
  readonly __wbg_get_datarequesterremovedevent_ind: (a: number) => number;
  readonly __wbg_set_datarequesterremovedevent_ind: (a: number, b: number) => void;
  readonly __wbg_get_datarequesterremovedevent_gen: (a: number) => number;
  readonly __wbg_set_datarequesterremovedevent_gen: (a: number, b: number) => void;
  readonly __wbg_get_datarequesterremovedevent_bits: (a: number) => bigint;
  readonly __wbg_set_datarequesterremovedevent_bits: (a: number, b: bigint) => void;
  readonly __wbg_get_datarequesterremovedevent_handle: (a: number) => number;
  readonly __wbg_set_datarequesterremovedevent_handle: (a: number, b: number) => void;
  readonly __wbg_texturefragmentrequestedevent_free: (a: number, b: number) => void;
  readonly __wbg_get_texturefragmentrequestedevent_ind: (a: number) => number;
  readonly __wbg_set_texturefragmentrequestedevent_ind: (a: number, b: number) => void;
  readonly __wbg_get_texturefragmentrequestedevent_gen: (a: number) => number;
  readonly __wbg_set_texturefragmentrequestedevent_gen: (a: number, b: number) => void;
  readonly __wbg_get_texturefragmentrequestedevent_status: (a: number) => number;
  readonly __wbg_set_texturefragmentrequestedevent_status: (a: number, b: number) => void;
  readonly __wbg_entityevent_free: (a: number, b: number) => void;
  readonly __wbg_get_entityevent_ind: (a: number) => number;
  readonly __wbg_set_entityevent_ind: (a: number, b: number) => void;
  readonly __wbg_get_entityevent_gen: (a: number) => number;
  readonly __wbg_set_entityevent_gen: (a: number, b: number) => void;
  readonly __wbg_get_objecttransformevent_ind: (a: number) => number;
  readonly __wbg_get_datarequestevent_bits: (a: number) => bigint;
  readonly __wbg_get_texturefragmentrequestedevent_bits: (a: number) => bigint;
  readonly __wbg_get_mesh_vertices: (a: number) => number;
  readonly __wbg_get_mesh_uvs: (a: number) => number;
  readonly __wbg_set_texturefragmentrequestedevent_url: (a: number, b: number, c: number) => void;
  readonly __wbg_set_objecttransformevent_ind: (a: number, b: number) => void;
  readonly __wbg_set_datarequestevent_bits: (a: number, b: bigint) => void;
  readonly __wbg_set_texturefragmentrequestedevent_bits: (a: number, b: bigint) => void;
  readonly __wbg_set_mesh_vertices: (a: number, b: number) => void;
  readonly __wbg_set_mesh_uvs: (a: number, b: number) => void;
  readonly __wbg_get_texturefragmentrequestedevent_url: (a: number) => [number, number];
  readonly __wbg_get_reconstructableentity_0: (a: number) => bigint;
  readonly __wbg_set_reconstructableentity_0: (a: number, b: bigint) => void;
  readonly __wbg_renderablefeatureaddedevent_free: (a: number, b: number) => void;
  readonly __wbg_get_renderablefeatureaddedevent_ind: (a: number) => number;
  readonly __wbg_set_renderablefeatureaddedevent_ind: (a: number, b: number) => void;
  readonly __wbg_get_renderablefeatureaddedevent_gen: (a: number) => number;
  readonly __wbg_set_renderablefeatureaddedevent_gen: (a: number, b: number) => void;
  readonly __wbg_get_renderablefeatureaddedevent_bits: (a: number) => bigint;
  readonly __wbg_set_renderablefeatureaddedevent_bits: (a: number, b: bigint) => void;
  readonly __wbg_get_renderablefeatureaddedevent_feature: (a: number) => number;
  readonly __wbg_set_renderablefeatureaddedevent_feature: (a: number, b: number) => void;
  readonly __wbg_constructpolylinebatchedfeatureparameters_free: (a: number, b: number) => void;
  readonly __wbg_get_constructpolylinebatchedfeatureparameters_batched_feature: (a: number) => number;
  readonly __wbg_set_constructpolylinebatchedfeatureparameters_batched_feature: (a: number, b: number) => void;
  readonly __wbg_constructpolylinebatchedfeatureresult_free: (a: number, b: number) => void;
  readonly __wbg_get_constructpolylinebatchedfeatureresult_geometry: (a: number) => number;
  readonly __wbg_set_constructpolylinebatchedfeatureresult_geometry: (a: number, b: number) => void;
  readonly __wbg_get_constructpolylinebatchedfeatureresult_extent: (a: number) => number;
  readonly __wbg_set_constructpolylinebatchedfeatureresult_extent: (a: number, b: number) => void;
  readonly constructpolylinebatchedfeatureresult_new: (a: number, b: number) => number;
  readonly __wbg_get_renderablefeaturechangedevent_ind: (a: number) => number;
  readonly __wbg_get_renderablefeaturechangedevent_gen: (a: number) => number;
  readonly __wbg_get_renderablefeaturechangedevent_bits: (a: number) => bigint;
  readonly __wbg_get_renderablefeaturechangedevent_feature: (a: number) => number;
  readonly __wbg_set_renderablefeaturechangedevent_feature: (a: number, b: number) => void;
  readonly __wbg_renderablefeaturechangedevent_free: (a: number, b: number) => void;
  readonly __wbg_reconstructableentity_free: (a: number, b: number) => void;
  readonly __wbg_set_renderablefeaturechangedevent_ind: (a: number, b: number) => void;
  readonly __wbg_set_renderablefeaturechangedevent_gen: (a: number, b: number) => void;
  readonly __wbg_set_renderablefeaturechangedevent_bits: (a: number, b: bigint) => void;
  readonly __wbg_upsampleterrainmeshparameters_free: (a: number, b: number) => void;
  readonly __wbg_get_upsampleterrainmeshparameters_tile_handle: (a: number) => bigint;
  readonly __wbg_set_upsampleterrainmeshparameters_tile_handle: (a: number, b: bigint) => void;
  readonly upsampleterrainmeshparameters_new: (a: bigint) => number;
  readonly __wbg_upsampleterrainmeshresult_free: (a: number, b: number) => void;
  readonly __wbg_get_upsampleterrainmeshresult_geometry: (a: number) => number;
  readonly __wbg_set_upsampleterrainmeshresult_geometry: (a: number, b: number) => void;
  readonly __wbg_get_upsampleterrainmeshresult_heights: (a: number) => number;
  readonly __wbg_set_upsampleterrainmeshresult_heights: (a: number, b: number) => void;
  readonly __wbg_get_upsampleterrainmeshresult_min_height: (a: number) => number;
  readonly __wbg_set_upsampleterrainmeshresult_min_height: (a: number, b: number) => void;
  readonly __wbg_get_upsampleterrainmeshresult_max_height: (a: number) => number;
  readonly __wbg_set_upsampleterrainmeshresult_max_height: (a: number, b: number) => void;
  readonly upsampleterrainmeshresult_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_constructterrainmeshparameters_free: (a: number, b: number) => void;
  readonly __wbg_get_constructterrainmeshparameters_martini_id: (a: number) => number;
  readonly __wbg_set_constructterrainmeshparameters_martini_id: (a: number, b: number) => void;
  readonly __wbg_get_constructterrainmeshparameters_bytes_handle: (a: number) => number;
  readonly __wbg_set_constructterrainmeshparameters_bytes_handle: (a: number, b: number) => void;
  readonly __wbg_get_constructterrainmeshparameters_tile_handle: (a: number) => bigint;
  readonly __wbg_set_constructterrainmeshparameters_tile_handle: (a: number, b: bigint) => void;
  readonly __wbg_constructterrainmeshresult_free: (a: number, b: number) => void;
  readonly __wbg_get_constructterrainmeshresult_geometry: (a: number) => number;
  readonly __wbg_set_constructterrainmeshresult_geometry: (a: number, b: number) => void;
  readonly __wbg_get_constructterrainmeshresult_heights: (a: number) => number;
  readonly __wbg_set_constructterrainmeshresult_heights: (a: number, b: number) => void;
  readonly __wbg_get_constructterrainmeshresult_min_height: (a: number) => number;
  readonly __wbg_set_constructterrainmeshresult_min_height: (a: number, b: number) => void;
  readonly __wbg_get_constructterrainmeshresult_max_height: (a: number) => number;
  readonly __wbg_set_constructterrainmeshresult_max_height: (a: number, b: number) => void;
  readonly constructterrainmeshresult_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_core_free: (a: number, b: number) => void;
  readonly __wbg_get_core_id: (a: number) => [number, number];
  readonly __wbg_set_core_id: (a: number, b: number, c: number) => void;
  readonly core_new: (a: number, b: number) => number;
  readonly core_start: (a: number) => void;
  readonly core_update: (a: number) => void;
  readonly core_readEvents: (a: number) => number;
  readonly core_input: (a: number, b: any) => void;
  readonly core_getBufferU8: (a: number, b: number) => any;
  readonly core_getBufferU32: (a: number, b: number) => any;
  readonly core_getBufferF32: (a: number, b: number) => any;
  readonly core_setBufferU8: (a: number, b: number, c: bigint, d: number, e: any) => void;
  readonly core_newBufferU8: (a: number, b: number, c: any) => number;
  readonly core_newBufferU32: (a: number, b: number, c: any) => number;
  readonly core_newBufferF32: (a: number, b: number, c: any) => number;
  readonly core_newBufferU8Cloned: (a: number, b: number, c: number) => number;
  readonly core_newBufferU32Cloned: (a: number, b: number, c: number) => number;
  readonly core_newBufferF32Cloned: (a: number, b: number, c: number) => number;
  readonly core_removeBuffer: (a: number, b: number) => void;
  readonly core_triggerDataRequesterFailed: (a: number, b: bigint) => void;
  readonly core_resize: (a: number, b: number, c: number, d: number) => void;
  readonly core_addLayer: (a: number, b: any) => [number, number];
  readonly core_updateLayer: (a: number, b: number, c: number, d: any) => void;
  readonly core_deleteLayer: (a: number, b: number, c: number) => void;
  readonly core_triggerTextureFragmentLoaded: (a: number, b: bigint, c: number) => void;
  readonly core_setTileMeshPrepared: (a: number, b: bigint) => void;
  readonly core_markFeatureIsRendered: (a: number, b: number, c: number, d: bigint) => void;
  readonly core_triggerWorkerTaskCompleted: (a: number, b: bigint, c: number) => void;
  readonly core_getMartini: (a: number, b: number) => number;
  readonly core_hasDataRequester: (a: number, b: bigint) => number;
  readonly core_hasWorkerTask: (a: number, b: bigint) => number;
  readonly core_getTile: (a: number, b: bigint) => number;
  readonly core_getParentTile: (a: number, b: bigint) => number;
  readonly core_getTileElevationDecoder: (a: number, b: bigint) => number;
  readonly core_getTransferablePolygonBatchedFeature: (a: number, b: bigint) => number;
  readonly core_getTransferablePolylineBatchedFeature: (a: number, b: bigint) => number;
  readonly core_getBatchProp: (a: number, b: number) => [number, number];
  readonly start: () => void;
  readonly __wbg_constructpolygonbatchedfeatureparameters_free: (a: number, b: number) => void;
  readonly __wbg_get_constructpolygonbatchedfeatureparameters_batched_feature: (a: number) => number;
  readonly __wbg_set_constructpolygonbatchedfeatureparameters_batched_feature: (a: number, b: number) => void;
  readonly __wbg_constructpolygonbatchedfeatureresult_free: (a: number, b: number) => void;
  readonly __wbg_get_constructpolygonbatchedfeatureresult_geometry: (a: number) => number;
  readonly __wbg_set_constructpolygonbatchedfeatureresult_geometry: (a: number, b: number) => void;
  readonly __wbg_get_constructpolygonbatchedfeatureresult_extent: (a: number) => number;
  readonly __wbg_set_constructpolygonbatchedfeatureresult_extent: (a: number, b: number) => void;
  readonly constructpolygonbatchedfeatureresult_new: (a: number, b: number) => number;
  readonly __wbg_workertaskdelegatedevent_free: (a: number, b: number) => void;
  readonly __wbg_get_workertaskdelegatedevent_ind: (a: number) => number;
  readonly __wbg_set_workertaskdelegatedevent_ind: (a: number, b: number) => void;
  readonly __wbg_get_workertaskdelegatedevent_gen: (a: number) => number;
  readonly __wbg_set_workertaskdelegatedevent_gen: (a: number, b: number) => void;
  readonly __wbg_get_workertaskdelegatedevent_bits: (a: number) => bigint;
  readonly __wbg_set_workertaskdelegatedevent_bits: (a: number, b: bigint) => void;
  readonly __wbg_get_workertaskdelegatedevent_task: (a: number) => number;
  readonly __wbg_set_workertaskdelegatedevent_task: (a: number, b: number) => void;
  readonly __wbg_delegatedworkertasksparameters_free: (a: number, b: number) => void;
  readonly __wbg_get_delegatedworkertasksparameters_delegator_id: (a: number) => number;
  readonly __wbg_set_delegatedworkertasksparameters_delegator_id: (a: number, b: number) => void;
  readonly __wbg_get_delegatedworkertasksparameters_construct_terrain_mesh: (a: number) => number;
  readonly __wbg_set_delegatedworkertasksparameters_construct_terrain_mesh: (a: number, b: number) => void;
  readonly __wbg_get_delegatedworkertasksparameters_upsample_terrain_mesh: (a: number) => number;
  readonly __wbg_set_delegatedworkertasksparameters_upsample_terrain_mesh: (a: number, b: number) => void;
  readonly __wbg_get_delegatedworkertasksparameters_construct_polygon_batched_feature: (a: number) => number;
  readonly __wbg_set_delegatedworkertasksparameters_construct_polygon_batched_feature: (a: number, b: number) => void;
  readonly __wbg_get_delegatedworkertasksparameters_construct_polyline_batched_feature: (a: number) => number;
  readonly __wbg_set_delegatedworkertasksparameters_construct_polyline_batched_feature: (a: number, b: number) => void;
  readonly __wbg_delegatedworkertasksresult_free: (a: number, b: number) => void;
  readonly __wbg_get_delegatedworkertasksresult_delegator_id: (a: number) => number;
  readonly __wbg_set_delegatedworkertasksresult_delegator_id: (a: number, b: number) => void;
  readonly __wbg_get_delegatedworkertasksresult_construct_terrain_mesh: (a: number) => number;
  readonly __wbg_set_delegatedworkertasksresult_construct_terrain_mesh: (a: number, b: number) => void;
  readonly __wbg_get_delegatedworkertasksresult_upsample_terrain_mesh: (a: number) => number;
  readonly __wbg_set_delegatedworkertasksresult_upsample_terrain_mesh: (a: number, b: number) => void;
  readonly __wbg_get_delegatedworkertasksresult_construct_polygon_batched_feature: (a: number) => number;
  readonly __wbg_set_delegatedworkertasksresult_construct_polygon_batched_feature: (a: number, b: number) => void;
  readonly __wbg_get_delegatedworkertasksresult_construct_polyline_batched_feature: (a: number) => number;
  readonly __wbg_set_delegatedworkertasksresult_construct_polyline_batched_feature: (a: number, b: number) => void;
  readonly delegatedworkertasksresult_withConstructTerrainMesh: (a: number, b: number) => number;
  readonly delegatedworkertasksresult_withUpsampleTerrainMesh: (a: number, b: number) => number;
  readonly delegatedworkertasksresult_withConstructPolygonBatchedFeature: (a: number, b: number) => number;
  readonly delegatedworkertasksresult_withConstructPolylineBatchedFeature: (a: number, b: number) => number;
  readonly __wbg_transferablegeometry_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablegeometry_vertices: (a: number) => number;
  readonly __wbg_set_transferablegeometry_vertices: (a: number, b: number) => void;
  readonly __wbg_get_transferablegeometry_uvs: (a: number) => number;
  readonly __wbg_set_transferablegeometry_uvs: (a: number, b: number) => void;
  readonly __wbg_get_transferablegeometry_indices: (a: number) => number;
  readonly __wbg_set_transferablegeometry_indices: (a: number, b: number) => void;
  readonly transferablegeometry_new: (a: number, b: number, c: number) => number;
  readonly __wbg_get_transferablepolylinegeometry_position: (a: number) => number;
  readonly __wbg_set_transferablepolylinegeometry_position: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolylinegeometry_start: (a: number) => number;
  readonly __wbg_set_transferablepolylinegeometry_start: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolylinegeometry_forward_offset: (a: number) => number;
  readonly __wbg_set_transferablepolylinegeometry_forward_offset: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolylinegeometry_end_normal_and_texture_coordinate_normalization_x: (a: number) => number;
  readonly __wbg_set_transferablepolylinegeometry_end_normal_and_texture_coordinate_normalization_x: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolylinegeometry_right_normal_and_texture_coordinate_normalization_y: (a: number) => number;
  readonly __wbg_set_transferablepolylinegeometry_right_normal_and_texture_coordinate_normalization_y: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolylinegeometry_indices: (a: number) => number;
  readonly __wbg_set_transferablepolylinegeometry_indices: (a: number, b: number) => void;
  readonly transferablepolylinegeometry_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly __wbg_transferablepolygongeometry_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolygongeometry_position: (a: number) => number;
  readonly __wbg_set_transferablepolygongeometry_position: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolygongeometry_normal: (a: number) => number;
  readonly __wbg_set_transferablepolygongeometry_normal: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolygongeometry_scale_normal_and_cap: (a: number) => number;
  readonly __wbg_set_transferablepolygongeometry_scale_normal_and_cap: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolygongeometry_batch_id: (a: number) => number;
  readonly __wbg_set_transferablepolygongeometry_batch_id: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolygongeometry_indices: (a: number) => number;
  readonly __wbg_set_transferablepolygongeometry_indices: (a: number, b: number) => void;
  readonly transferablepolygongeometry_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbg_get_transferablesinglegeometry_batch_id: (a: number) => number;
  readonly __wbg_set_transferablesinglegeometry_batch_id: (a: number, b: number) => void;
  readonly __wbg_transferablemodelgeometry_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablemodelgeometry_global_batch_ids: (a: number) => number;
  readonly __wbg_set_transferablemodelgeometry_global_batch_ids: (a: number, b: number) => void;
  readonly __wbg_set_transferablepolylinegeometry_batch_id: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolylinegeometry_batch_id: (a: number) => number;
  readonly __wbg_get_transferablepolylinegeometry_start_normals: (a: number) => number;
  readonly __wbg_set_transferablepolylinegeometry_start_normals: (a: number, b: number) => void;
  readonly __wbg_transferablepolylinegeometry_free: (a: number, b: number) => void;
  readonly __wbg_transferablesinglegeometry_free: (a: number, b: number) => void;
  readonly __wbg_transferablemartini_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablemartini_size: (a: number) => number;
  readonly __wbg_set_transferablemartini_size: (a: number, b: number) => void;
  readonly transferablemartini_new: (a: number, b: number, c: number) => number;
  readonly transferablemartini_transfer_coords: (a: number) => any;
  readonly __wbg_transferablerasterdemdata_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablerasterdemdata_decoder: (a: number) => number;
  readonly __wbg_set_transferablerasterdemdata_decoder: (a: number, b: number) => void;
  readonly transferablerasterdemdata_new: (a: number) => number;
  readonly __wbg_transferabletile_free: (a: number, b: number) => void;
  readonly __wbg_get_transferabletile_coords: (a: number) => number;
  readonly __wbg_set_transferabletile_coords: (a: number, b: number) => void;
  readonly __wbg_get_transferabletile_max_height: (a: number) => number;
  readonly __wbg_set_transferabletile_max_height: (a: number, b: number) => void;
  readonly __wbg_get_transferabletile_cached_mesh_handle: (a: number) => number;
  readonly __wbg_set_transferabletile_cached_mesh_handle: (a: number, b: number) => void;
  readonly transferabletile_new: (a: number, b: number, c: number) => number;
  readonly __wbg_pointmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_depth_test: (a: number) => number;
  readonly __wbg_set_pointmaterial_depth_test: (a: number, b: number) => void;
  readonly __wbg_nearfar_free: (a: number, b: number) => void;
  readonly __wbg_get_nearfar_near: (a: number) => number;
  readonly __wbg_set_nearfar_near: (a: number, b: number) => void;
  readonly __wbg_get_nearfar_far: (a: number) => number;
  readonly __wbg_set_nearfar_far: (a: number, b: number) => void;
  readonly __wbg_billboardmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_show: (a: number) => number;
  readonly __wbg_set_billboardmaterial_show: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_size: (a: number) => number;
  readonly __wbg_set_billboardmaterial_size: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_color: (a: number) => number;
  readonly __wbg_set_billboardmaterial_color: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_center: (a: number) => number;
  readonly __wbg_set_billboardmaterial_center: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_height: (a: number) => number;
  readonly __wbg_set_billboardmaterial_height: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_url: (a: number) => [number, number];
  readonly __wbg_set_billboardmaterial_url: (a: number, b: number, c: number) => void;
  readonly __wbg_get_billboardmaterial_scale_by_distance: (a: number) => number;
  readonly __wbg_set_billboardmaterial_scale_by_distance: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_clamp_to_ground: (a: number) => number;
  readonly __wbg_set_billboardmaterial_clamp_to_ground: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_depth_test: (a: number) => number;
  readonly __wbg_set_billboardmaterial_depth_test: (a: number, b: number) => void;
  readonly polylinematerial_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly __wbg_polygonmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_color: (a: number) => number;
  readonly __wbg_set_polygonmaterial_color: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial___internal__: (a: number) => number;
  readonly __wbg_set_polygonmaterial___internal__: (a: number, b: number) => void;
  readonly polygonmaterial_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_polygoninternalmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_polygoninternalmaterial_min_max_heights: (a: number) => [number, number];
  readonly __wbg_set_polygoninternalmaterial_min_max_heights: (a: number, b: number, c: number) => void;
  readonly __wbg_modelmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_show: (a: number) => number;
  readonly __wbg_set_modelmaterial_show: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_url: (a: number) => [number, number];
  readonly __wbg_set_modelmaterial_url: (a: number, b: number, c: number) => void;
  readonly __wbg_get_modelmaterial_height: (a: number) => number;
  readonly __wbg_set_modelmaterial_height: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_max_sse: (a: number) => number;
  readonly __wbg_set_modelmaterial_max_sse: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_clamp_to_ground: (a: number) => number;
  readonly __wbg_set_modelmaterial_clamp_to_ground: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_should_rotate_in_default: (a: number) => number;
  readonly __wbg_set_modelmaterial_should_rotate_in_default: (a: number, b: number) => void;
  readonly __wbg_rastertilematerial_free: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial_show: (a: number) => number;
  readonly __wbg_set_rastertilematerial_show: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial_max_zoom: (a: number) => number;
  readonly __wbg_set_rastertilematerial_max_zoom: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial_max_sse: (a: number) => number;
  readonly __wbg_set_rastertilematerial_max_sse: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial_wireframe: (a: number) => number;
  readonly __wbg_set_rastertilematerial_wireframe: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial_should_compute_normal_from_vertex: (a: number) => number;
  readonly __wbg_set_rastertilematerial_should_compute_normal_from_vertex: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial___internal__: (a: number) => number;
  readonly __wbg_set_rastertilematerial___internal__: (a: number, b: number) => void;
  readonly __wbg_rastertileinternalmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_texture_fragment: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_texture_fragment: (a: number, b: number) => void;
  readonly __wbg_vectortilematerial_free: (a: number, b: number) => void;
  readonly __wbg_get_vectortilematerial_show: (a: number) => number;
  readonly __wbg_set_vectortilematerial_show: (a: number, b: number) => void;
  readonly __wbg_rasterterrainmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_show: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_show: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_min_zoom: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_min_zoom: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_wireframe: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_wireframe: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_elevation_decoder: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_elevation_decoder: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_tile_size: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_tile_size: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_center: (a: number) => number;
  readonly __wbg_set_polylineinternalmaterial_min_max_heights: (a: number, b: number, c: number) => void;
  readonly __wbg_set_pointmaterial_center: (a: number, b: number) => void;
  readonly __wbg_set_pointmaterial_size: (a: number, b: number) => void;
  readonly __wbg_set_pointmaterial_height: (a: number, b: number) => void;
  readonly __wbg_set_polylinematerial_width: (a: number, b: number) => void;
  readonly __wbg_set_polylinematerial_height: (a: number, b: number) => void;
  readonly __wbg_set_modelmaterial_size: (a: number, b: number) => void;
  readonly __wbg_set_polygonmaterial_height: (a: number, b: number) => void;
  readonly __wbg_set_polygonmaterial_extruded_height: (a: number, b: number) => void;
  readonly __wbg_set_rastertilematerial_opacity: (a: number, b: number) => void;
  readonly __wbg_set_vectortilematerial_max_sse: (a: number, b: number) => void;
  readonly __wbg_get_polylinematerial___internal__: (a: number) => number;
  readonly __wbg_set_polylinematerial___internal__: (a: number, b: number) => void;
  readonly __wbg_get_polylineinternalmaterial_min_max_heights: (a: number) => [number, number];
  readonly __wbg_get_polylinematerial_show: (a: number) => number;
  readonly __wbg_get_polylinematerial_clamp_to_ground: (a: number) => number;
  readonly __wbg_get_polygonmaterial_show: (a: number) => number;
  readonly __wbg_get_polygonmaterial_clamp_to_ground: (a: number) => number;
  readonly __wbg_get_polygonmaterial_wireframe: (a: number) => number;
  readonly __wbg_get_pointmaterial_show: (a: number) => number;
  readonly __wbg_get_pointmaterial_scale_by_distance: (a: number) => number;
  readonly __wbg_get_pointmaterial_clamp_to_ground: (a: number) => number;
  readonly __wbg_set_polylinematerial_show: (a: number, b: number) => void;
  readonly __wbg_set_polylinematerial_clamp_to_ground: (a: number, b: number) => void;
  readonly __wbg_set_polygonmaterial_show: (a: number, b: number) => void;
  readonly __wbg_set_polygonmaterial_clamp_to_ground: (a: number, b: number) => void;
  readonly __wbg_set_polygonmaterial_wireframe: (a: number, b: number) => void;
  readonly __wbg_set_pointmaterial_show: (a: number, b: number) => void;
  readonly __wbg_set_pointmaterial_scale_by_distance: (a: number, b: number) => void;
  readonly __wbg_set_pointmaterial_clamp_to_ground: (a: number, b: number) => void;
  readonly __wbg_polylinematerial_free: (a: number, b: number) => void;
  readonly __wbg_set_pointmaterial_color: (a: number, b: number) => void;
  readonly __wbg_set_polylinematerial_color: (a: number, b: number) => void;
  readonly __wbg_set_rastertilematerial_segments: (a: number, b: number) => void;
  readonly __wbg_set_rastertilematerial_color: (a: number, b: number) => void;
  readonly __wbg_set_vectortilematerial_max_zoom: (a: number, b: number) => void;
  readonly __wbg_set_rasterterrainmaterial_segments: (a: number, b: number) => void;
  readonly __wbg_set_rasterterrainmaterial_max_zoom: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_color: (a: number) => number;
  readonly __wbg_get_polylinematerial_color: (a: number) => number;
  readonly __wbg_get_rastertilematerial_segments: (a: number) => number;
  readonly __wbg_get_rastertilematerial_color: (a: number) => number;
  readonly __wbg_get_vectortilematerial_max_zoom: (a: number) => number;
  readonly __wbg_get_rasterterrainmaterial_segments: (a: number) => number;
  readonly __wbg_get_rasterterrainmaterial_max_zoom: (a: number) => number;
  readonly __wbg_polylineinternalmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_size: (a: number) => number;
  readonly __wbg_get_pointmaterial_height: (a: number) => number;
  readonly __wbg_get_polylinematerial_width: (a: number) => number;
  readonly __wbg_get_polylinematerial_height: (a: number) => number;
  readonly __wbg_get_modelmaterial_size: (a: number) => number;
  readonly __wbg_get_polygonmaterial_height: (a: number) => number;
  readonly __wbg_get_polygonmaterial_extruded_height: (a: number) => number;
  readonly __wbg_get_rastertilematerial_opacity: (a: number) => number;
  readonly __wbg_get_vectortilematerial_max_sse: (a: number) => number;
  readonly __wbg_constructedpolylinegeometry_free: (a: number, b: number) => void;
  readonly __wbg_get_constructedpolylinegeometry_extent: (a: number) => number;
  readonly __wbg_set_constructedpolylinegeometry_extent: (a: number, b: number) => void;
  readonly constructedpolylinegeometry_position: (a: number) => any;
  readonly constructedpolylinegeometry_position_size: (a: number) => number;
  readonly constructedpolylinegeometry_start: (a: number) => any;
  readonly constructedpolylinegeometry_start_size: (a: number) => number;
  readonly constructedpolylinegeometry_forward_offset: (a: number) => any;
  readonly constructedpolylinegeometry_forward_offset_size: (a: number) => number;
  readonly constructedpolylinegeometry_start_normals: (a: number) => any;
  readonly constructedpolylinegeometry_start_normals_size: (a: number) => number;
  readonly constructedpolylinegeometry_end_normal_and_texture_coordinate_normalization_x: (a: number) => any;
  readonly constructedpolylinegeometry_end_normal_and_texture_coordinate_normalization_x_size: (a: number) => number;
  readonly constructedpolylinegeometry_right_normal_and_texture_coordinate_normalization_y: (a: number) => any;
  readonly constructedpolylinegeometry_right_normal_and_texture_coordinate_normalization_y_size: (a: number) => number;
  readonly constructedpolylinegeometry_batch_id: (a: number) => any;
  readonly constructedpolylinegeometry_batch_id_size: (a: number) => number;
  readonly constructedpolylinegeometry_indices: (a: number) => any;
  readonly constructedpolylinegeometry_drop: (a: number) => void;
  readonly __wbg_polylinegeometry_free: (a: number, b: number) => void;
  readonly polylinegeometry_position: (a: number) => any;
  readonly polylinegeometry_start: (a: number) => any;
  readonly polylinegeometry_forward_offset: (a: number) => any;
  readonly polylinegeometry_start_normals: (a: number) => any;
  readonly polylinegeometry_end_normal_and_texture_coordinate_normalization_x: (a: number) => any;
  readonly polylinegeometry_right_normal_and_texture_coordinate_normalization_y: (a: number) => any;
  readonly polylinegeometry_batch_id: (a: number) => any;
  readonly polylinegeometry_indices: (a: number) => any;
  readonly polylinegeometry_drop: (a: number) => void;
  readonly __wbg_polylinegeometryattributes_free: (a: number, b: number) => void;
  readonly polylinegeometryattributes_transfer_position: (a: number) => any;
  readonly polylinegeometryattributes_transfer_start: (a: number) => any;
  readonly polylinegeometryattributes_transfer_forward_offset: (a: number) => any;
  readonly polylinegeometryattributes_transfer_start_normals: (a: number) => any;
  readonly polylinegeometryattributes_transfer_end_normal_and_texture_coordinate_normalization_x: (a: number) => any;
  readonly polylinegeometryattributes_transfer_right_normal_and_texture_coordinate_normalization_y: (a: number) => any;
  readonly polylinegeometryattributes_transfer_batch_id: (a: number) => any;
  readonly polylinegeometryattributes_drop: (a: number) => void;
  readonly polylinegeometry_position_size: (a: number) => number;
  readonly polylinegeometry_start_size: (a: number) => number;
  readonly polylinegeometry_forward_offset_size: (a: number) => number;
  readonly polylinegeometry_start_normals_size: (a: number) => number;
  readonly polylinegeometry_end_normal_and_texture_coordinate_normalization_x_size: (a: number) => number;
  readonly polylinegeometry_right_normal_and_texture_coordinate_normalization_y_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_position_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_start_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_forward_offset_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_start_normals_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_end_normal_and_texture_coordinate_normalization_x_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_right_normal_and_texture_coordinate_normalization_y_size: (a: number) => number;
  readonly polylinegeometry_batch_id_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_batch_id_size: (a: number) => number;
  readonly __wbg_transferablepolylinebatchedfeature_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolylinebatchedfeature_crs: (a: number) => number;
  readonly __wbg_set_transferablepolylinebatchedfeature_crs: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolylinebatchedfeature_length: (a: number) => number;
  readonly __wbg_set_transferablepolylinebatchedfeature_length: (a: number, b: number) => void;
  readonly transferablepolylinebatchedfeature_constructor: (a: number, b: number) => number;
  readonly transferablepolylinebatchedfeature_setBatchIds: (a: number, b: number, c: any) => void;
  readonly transferablepolylinebatchedfeature_setPoints: (a: number, b: number, c: any) => void;
  readonly transferablepolylinebatchedfeature_setPointsSizes: (a: number, b: number, c: any) => void;
  readonly transferablepolylinebatchedfeature_drop: (a: number) => void;
  readonly transferablepolylinebatchedfeature_transferBatchIds: (a: number) => any;
  readonly transferablepolylinebatchedfeature_transferPoints: (a: number) => any;
  readonly transferablepolylinebatchedfeature_transferPointsSizes: (a: number) => any;
  readonly __wbg_elevationdecoder_free: (a: number, b: number) => void;
  readonly __wbg_get_elevationdecoder_r_scaler: (a: number) => number;
  readonly __wbg_set_elevationdecoder_r_scaler: (a: number, b: number) => void;
  readonly __wbg_get_elevationdecoder_g_scaler: (a: number) => number;
  readonly __wbg_set_elevationdecoder_g_scaler: (a: number, b: number) => void;
  readonly __wbg_get_elevationdecoder_b_scaler: (a: number) => number;
  readonly __wbg_set_elevationdecoder_b_scaler: (a: number, b: number) => void;
  readonly __wbg_get_elevationdecoder_offset: (a: number) => number;
  readonly __wbg_set_elevationdecoder_offset: (a: number, b: number) => void;
  readonly __wbg_get_elevationdecoder_max_offset: (a: number) => number;
  readonly __wbg_set_elevationdecoder_max_offset: (a: number, b: number) => void;
  readonly __wbg_get_elevationdecoder_min_offset: (a: number) => number;
  readonly __wbg_set_elevationdecoder_min_offset: (a: number, b: number) => void;
  readonly __wbg_get_elevationdecoder_boundary: (a: number) => number;
  readonly __wbg_set_elevationdecoder_boundary: (a: number, b: number) => void;
  readonly __wbg_get_elevationdecoder_epsilon: (a: number) => number;
  readonly __wbg_set_elevationdecoder_epsilon: (a: number, b: number) => void;
  readonly elevationdecoder_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly elevationdecoder_japanGSI: () => number;
  readonly elevationdecoder_mapbox: () => number;
  readonly __wbg_tilexyz_free: (a: number, b: number) => void;
  readonly __wbg_get_tilexyz_x: (a: number) => number;
  readonly __wbg_set_tilexyz_x: (a: number, b: number) => void;
  readonly __wbg_get_tilexyz_y: (a: number) => number;
  readonly __wbg_set_tilexyz_y: (a: number, b: number) => void;
  readonly __wbg_get_tilexyz_z: (a: number) => number;
  readonly __wbg_set_tilexyz_z: (a: number, b: number) => void;
  readonly tilexyz_new: (a: number, b: number, c: number) => number;
  readonly __wbg_vec2_free: (a: number, b: number) => void;
  readonly __wbg_get_vec2_x: (a: number) => number;
  readonly __wbg_set_vec2_x: (a: number, b: number) => void;
  readonly __wbg_get_vec2_y: (a: number) => number;
  readonly __wbg_set_vec2_y: (a: number, b: number) => void;
  readonly __wbg_get_vec3_z: (a: number) => number;
  readonly __wbg_set_vec3_z: (a: number, b: number) => void;
  readonly __wbg_get_vec3_x: (a: number) => number;
  readonly __wbg_get_vec3_y: (a: number) => number;
  readonly __wbg_vec3_free: (a: number, b: number) => void;
  readonly __wbg_set_vec3_x: (a: number, b: number) => void;
  readonly __wbg_set_vec3_y: (a: number, b: number) => void;
  readonly __wbg_floatattribute_free: (a: number, b: number) => void;
  readonly __wbg_get_floatattribute_size: (a: number) => number;
  readonly __wbg_set_floatattribute_size: (a: number, b: number) => void;
  readonly floatattribute_new: (a: number, b: number, c: number) => number;
  readonly floatattribute_transferData: (a: number) => any;
  readonly __wbg_transferablehierarchy_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablehierarchy_expected_winding_order: (a: number) => number;
  readonly __wbg_set_transferablehierarchy_expected_winding_order: (a: number, b: number) => void;
  readonly __wbg_transferableholes_free: (a: number, b: number) => void;
  readonly __wbg_windingorder_free: (a: number, b: number) => void;
  readonly __wbg_get_windingorder_0: (a: number) => number;
  readonly __wbg_set_windingorder_0: (a: number, b: number) => void;
  readonly __wbg_constructedpolygongeometry_free: (a: number, b: number) => void;
  readonly __wbg_get_constructedpolygongeometry_extent: (a: number) => number;
  readonly __wbg_set_constructedpolygongeometry_extent: (a: number, b: number) => void;
  readonly constructedpolygongeometry_position: (a: number) => any;
  readonly constructedpolygongeometry_position_size: (a: number) => number;
  readonly constructedpolygongeometry_normal: (a: number) => any;
  readonly constructedpolygongeometry_normal_size: (a: number) => number;
  readonly constructedpolygongeometry_scale_normal_and_cap: (a: number) => any;
  readonly constructedpolygongeometry_scale_normal_and_cap_size: (a: number) => number;
  readonly constructedpolygongeometry_batch_id: (a: number) => any;
  readonly constructedpolygongeometry_batch_id_size: (a: number) => number;
  readonly constructedpolygongeometry_indices: (a: number) => any;
  readonly constructedpolygongeometry_drop: (a: number) => void;
  readonly __wbg_polygongeometry_free: (a: number, b: number) => void;
  readonly polygongeometry_position: (a: number) => any;
  readonly polygongeometry_normal: (a: number) => any;
  readonly polygongeometry_scale_normal_and_cap: (a: number) => any;
  readonly polygongeometry_batch_id: (a: number) => any;
  readonly polygongeometry_indices: (a: number) => any;
  readonly polygongeometry_drop: (a: number) => void;
  readonly __wbg_polygongeometryattributes_free: (a: number, b: number) => void;
  readonly polygongeometryattributes_transfer_position: (a: number) => any;
  readonly polygongeometryattributes_transfer_normal: (a: number) => any;
  readonly polygongeometryattributes_transfer_scale_normal_and_cap: (a: number) => any;
  readonly polygongeometryattributes_transfer_batch_id: (a: number) => any;
  readonly polygongeometryattributes_drop: (a: number) => void;
  readonly __wbg_texturefragment_free: (a: number, b: number) => void;
  readonly __wbg_get_texturefragment_ind: (a: number) => number;
  readonly __wbg_set_texturefragment_ind: (a: number, b: number) => void;
  readonly __wbg_get_texturefragment_gen: (a: number) => number;
  readonly __wbg_set_texturefragment_gen: (a: number, b: number) => void;
  readonly polygongeometry_position_size: (a: number) => number;
  readonly polygongeometryattributes_transfer_position_size: (a: number) => number;
  readonly polygongeometry_normal_size: (a: number) => number;
  readonly polygongeometry_scale_normal_and_cap_size: (a: number) => number;
  readonly polygongeometry_batch_id_size: (a: number) => number;
  readonly polygongeometryattributes_transfer_normal_size: (a: number) => number;
  readonly polygongeometryattributes_transfer_scale_normal_and_cap_size: (a: number) => number;
  readonly polygongeometryattributes_transfer_batch_id_size: (a: number) => number;
  readonly __wbg_extentradianf32_free: (a: number, b: number) => void;
  readonly __wbg_get_extentradianf32_west: (a: number) => number;
  readonly __wbg_set_extentradianf32_west: (a: number, b: number) => void;
  readonly __wbg_get_extentradianf32_south: (a: number) => number;
  readonly __wbg_set_extentradianf32_south: (a: number, b: number) => void;
  readonly __wbg_get_extentradianf32_east: (a: number) => number;
  readonly __wbg_set_extentradianf32_east: (a: number, b: number) => void;
  readonly __wbg_get_extentradianf32_north: (a: number) => number;
  readonly __wbg_set_extentradianf32_north: (a: number, b: number) => void;
  readonly extentradianf32_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_geometry_free: (a: number, b: number) => void;
  readonly geometry_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly geometry_transferVertices: (a: number) => any;
  readonly geometry_transferUvs: (a: number) => any;
  readonly geometry_transferIndices: (a: number) => any;
  readonly geometry_drop: (a: number) => void;
  readonly __wbg_returnedconstructedterrainmesh_free: (a: number, b: number) => void;
  readonly __wbg_get_returnedconstructedterrainmesh_max_height: (a: number) => number;
  readonly __wbg_set_returnedconstructedterrainmesh_max_height: (a: number, b: number) => void;
  readonly __wbg_get_returnedconstructedterrainmesh_min_height: (a: number) => number;
  readonly __wbg_set_returnedconstructedterrainmesh_min_height: (a: number, b: number) => void;
  readonly returnedconstructedterrainmesh_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly returnedconstructedterrainmesh_transferVertices: (a: number) => any;
  readonly returnedconstructedterrainmesh_transferUvs: (a: number) => any;
  readonly returnedconstructedterrainmesh_transferIndices: (a: number) => any;
  readonly returnedconstructedterrainmesh_transferHeights: (a: number) => any;
  readonly returnedconstructedterrainmesh_drop: (a: number) => void;
  readonly __wbg_upsamplableterraingeometry_free: (a: number, b: number) => void;
  readonly upsamplableterraingeometry_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly __wbg_transferablepolygonbatchedfeature_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolygonbatchedfeature_crs: (a: number) => number;
  readonly __wbg_set_transferablepolygonbatchedfeature_crs: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolygonbatchedfeature_length: (a: number) => number;
  readonly __wbg_set_transferablepolygonbatchedfeature_length: (a: number, b: number) => void;
  readonly transferablepolygonbatchedfeature_constructor: (a: number, b: number) => number;
  readonly transferablepolygonbatchedfeature_setOuterRing: (a: number, b: number, c: any) => void;
  readonly transferablepolygonbatchedfeature_setOuterRingSizes: (a: number, b: number, c: any) => void;
  readonly transferablepolygonbatchedfeature_setHoles: (a: number, b: number, c: any) => void;
  readonly transferablepolygonbatchedfeature_setHolesSizes: (a: number, b: number, c: any) => void;
  readonly transferablepolygonbatchedfeature_setHolesTotalSizes: (a: number, b: number, c: any) => void;
  readonly transferablepolygonbatchedfeature_setHolesBoundaries: (a: number, b: number, c: any) => void;
  readonly transferablepolygonbatchedfeature_setBatchIds: (a: number, b: number, c: any) => void;
  readonly transferablepolygonbatchedfeature_setExpectedWindingOrders: (a: number, b: number, c: any) => void;
  readonly transferablepolygonbatchedfeature_drop: (a: number) => void;
  readonly transferablepolygonbatchedfeature_transferBatchIds: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferOuterRing: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferOuterRingSizes: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferHoles: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferHolesBoundaries: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferHolesSizes: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferHolesTotalSizes: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferExpectedWindingOrders: (a: number) => any;
  readonly __wbg_cachedmeshhandle_free: (a: number, b: number) => void;
  readonly __wbg_get_cachedmeshhandle_vertices: (a: number) => number;
  readonly __wbg_set_cachedmeshhandle_vertices: (a: number, b: number) => void;
  readonly __wbg_get_cachedmeshhandle_indices: (a: number) => number;
  readonly __wbg_set_cachedmeshhandle_indices: (a: number, b: number) => void;
  readonly __wbg_get_cachedmeshhandle_uvs: (a: number) => number;
  readonly __wbg_set_cachedmeshhandle_uvs: (a: number, b: number) => void;
  readonly __wbg_get_cachedmeshhandle_heights: (a: number) => number;
  readonly __wbg_set_cachedmeshhandle_heights: (a: number, b: number) => void;
  readonly cachedmeshhandle_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
