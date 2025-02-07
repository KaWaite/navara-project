/* tslint:disable */
/* eslint-disable */
export function upsampleTerrainMesh(tile: TransferableTile, parent_tile: TransferableTile, raster_dem_data: TransferableRasterDEMData, upsamplable_geometry: UpsamplableTerrainGeometry): ReturnedConstructedTerrainMesh;
export function constructPolygonBatchedFeature(features: TransferablePolygonBatchedFeature, material: PolygonMaterial): ConstructedPolygonGeometry | undefined;
export function constructPolylineBatchedFeature(features: TransferablePolylineBatchedFeature, material: PolylineMaterial): ConstructedPolylineGeometry | undefined;
export function constructTerrainMesh(bytes: Uint8Array, tile: TransferableTile, raster_dem_data: TransferableRasterDEMData, martini: TransferableMartini): ReturnedConstructedTerrainMesh;
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
export class CachedMeshHandle {
  free(): void;
  constructor(vertices: number, indices: number, uvs: number, heights?: number);
  vertices: number;
  indices: number;
  uvs: number;
  heights?: number;
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
export class Geometry {
  free(): void;
  constructor(vertices: Float32Array, indices: Uint32Array, uvs: Float32Array);
  transferVertices(): Float32Array;
  transferUvs(): Float32Array;
  transferIndices(): Uint32Array;
  drop(): void;
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
export class NearFar {
  private constructor();
  free(): void;
  near: number;
  far: number;
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
  constructor(show?: boolean, color?: number, clamp_to_ground?: boolean, use_ground_normals?: boolean, height?: number, extruded_height?: number, wireframe?: boolean, __internal__?: PolygonInternalMaterial);
  show?: boolean;
  color?: number;
  clamp_to_ground?: boolean;
  use_ground_normals?: boolean;
  height?: number;
  extruded_height?: number;
  wireframe?: boolean;
  __internal__?: PolygonInternalMaterial;
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
  constructor(show?: boolean, color?: number, clamp_to_ground?: boolean, use_ground_normals?: boolean, height?: number, width?: number, __internal__?: PolylineInternalMaterial);
  show?: boolean;
  color?: number;
  width?: number;
  clamp_to_ground?: boolean;
  use_ground_normals?: boolean;
  height?: number;
  __internal__?: PolylineInternalMaterial;
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
export class TextureFragment {
  private constructor();
  free(): void;
  ind: number;
  gen: number;
}
export class TileXYZ {
  free(): void;
  constructor(x: number, y: number, z: number);
  x: number;
  y: number;
  z: number;
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
export class TransferableRasterDEMData {
  free(): void;
  constructor(decoder: ElevationDecoder);
  decoder: ElevationDecoder;
}
export class TransferableTile {
  free(): void;
  constructor(coords: TileXYZ, max_height: number, cached_mesh_handle?: CachedMeshHandle);
  coords: TileXYZ;
  max_height: number;
  cached_mesh_handle?: CachedMeshHandle;
}
export class UpsamplableTerrainGeometry {
  free(): void;
  constructor(uvs: Float32Array, indices: Uint32Array, heights: Float32Array);
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

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly upsampleTerrainMesh: (a: number, b: number, c: number, d: number) => number;
  readonly constructPolygonBatchedFeature: (a: number, b: number) => number;
  readonly constructPolylineBatchedFeature: (a: number, b: number) => number;
  readonly constructTerrainMesh: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly start: () => void;
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
  readonly polylinematerial_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_polygonmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_color: (a: number) => number;
  readonly __wbg_set_polygonmaterial_color: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial___internal__: (a: number) => number;
  readonly __wbg_set_polygonmaterial___internal__: (a: number, b: number) => void;
  readonly polygonmaterial_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
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
  readonly __wbg_get_polylinematerial_use_ground_normals: (a: number) => number;
  readonly __wbg_get_polygonmaterial_show: (a: number) => number;
  readonly __wbg_get_polygonmaterial_clamp_to_ground: (a: number) => number;
  readonly __wbg_get_polygonmaterial_use_ground_normals: (a: number) => number;
  readonly __wbg_get_polygonmaterial_wireframe: (a: number) => number;
  readonly __wbg_get_pointmaterial_show: (a: number) => number;
  readonly __wbg_get_pointmaterial_scale_by_distance: (a: number) => number;
  readonly __wbg_get_pointmaterial_clamp_to_ground: (a: number) => number;
  readonly __wbg_set_polylinematerial_show: (a: number, b: number) => void;
  readonly __wbg_set_polylinematerial_clamp_to_ground: (a: number, b: number) => void;
  readonly __wbg_set_polylinematerial_use_ground_normals: (a: number, b: number) => void;
  readonly __wbg_set_polygonmaterial_show: (a: number, b: number) => void;
  readonly __wbg_set_polygonmaterial_clamp_to_ground: (a: number, b: number) => void;
  readonly __wbg_set_polygonmaterial_use_ground_normals: (a: number, b: number) => void;
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
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
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
