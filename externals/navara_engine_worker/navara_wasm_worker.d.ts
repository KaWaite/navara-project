/* tslint:disable */
/* eslint-disable */
export function constructPolylineBatchedFeature(features: TransferablePolylineBatchedFeature, material: PolylineMaterial, flat: boolean): ConstructedPolylineGeometry | undefined;
export function constructTerrainMesh(bytes: Uint8Array, tile: TransferableTile, raster_dem_data: TransferableRasterDEMData, martini: TransferableMartini): ReturnedConstructedTerrainMesh;
export function upsampleTerrainMesh(tile: TransferableTile, parent_tile: TransferableTile, raster_dem_data: TransferableRasterDEMData, upsamplable_geometry: UpsamplableTerrainGeometry): ReturnedConstructedTerrainMesh;
export function start(): void;
export function constructPolygonBatchedFeature(features: TransferablePolygonBatchedFeature, material: PolygonMaterial, flat: boolean, tile_extent?: ExtentRadianF32 | null): ConstructedPolygonGeometry | undefined;
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
export enum CameraDirection {
  Forward = 0,
  Backward = 1,
  Left = 2,
  Right = 3,
  Up = 4,
  Down = 5,
}
export enum CameraStatusType {
  Change = 0,
  LookAt = 1,
  Rotate = 2,
  MoveStart = 3,
  Moving = 4,
  MoveEnd = 5,
}
export class Aabb {
  free(): void;
  constructor(center: Vec3, extent: Vec3);
  center: Vec3;
  extent: Vec3;
}
export class BatchPropResult {
  private constructor();
  free(): void;
  properties: any;
  get layerId(): string | undefined;
  set layerId(value: string | null | undefined);
}
export class BillboardMaterial {
  private constructor();
  free(): void;
  get show(): boolean | undefined;
  set show(value: boolean | null | undefined);
  get size(): number | undefined;
  set size(value: number | null | undefined);
  get color(): number | undefined;
  set color(value: number | null | undefined);
  get center(): Vec2 | undefined;
  set center(value: Vec2 | null | undefined);
  get height(): number | undefined;
  set height(value: number | null | undefined);
  get url(): string | undefined;
  set url(value: string | null | undefined);
  get scaleByDistance(): boolean | undefined;
  set scaleByDistance(value: boolean | null | undefined);
  get clampToGround(): boolean | undefined;
  set clampToGround(value: boolean | null | undefined);
  get depthTest(): boolean | undefined;
  set depthTest(value: boolean | null | undefined);
  get transparent(): boolean | undefined;
  set transparent(value: boolean | null | undefined);
  get alphaTest(): number | undefined;
  set alphaTest(value: number | null | undefined);
}
export class BoundingSphere {
  free(): void;
  constructor(center_x: number, center_y: number, center_z: number, radius: number);
  center_x: number;
  center_y: number;
  center_z: number;
  radius: number;
}
export class CachedMeshHandle {
  free(): void;
  constructor(vertices: number, indices: number, uvs: number, heights?: number | null);
  vertices: number;
  indices: number;
  uvs: number;
  get heights(): number | undefined;
  set heights(value: number | null | undefined);
}
/**
 * An event for updating camera controller settings at runtime.
 *
 * This event allows partial updates to the [`CameraController`](navara_camera::CameraController)
 * component. Only fields set to `Some` will be applied; `None` fields are ignored.
 */
export class CameraControlUpdateEvent {
  free(): void;
  constructor();
  /**
   * Whether to automatically adjust near/far clipping planes based on camera distance
   * from the Earth surface. When enabled, the camera uses three zones:
   * - Near ground: near = 1.0, far = 1e6
   * - Mid altitude: near = 100.0, far = 1e8
   * - Far/Space: near = 1000.0, far = 1e9
   *
   * Default: `true`
   */
  get autoAdjustNearFar(): boolean | undefined;
  /**
   * Whether to automatically adjust near/far clipping planes based on camera distance
   * from the Earth surface. When enabled, the camera uses three zones:
   * - Near ground: near = 1.0, far = 1e6
   * - Mid altitude: near = 100.0, far = 1e8
   * - Far/Space: near = 1000.0, far = 1e9
   *
   * Default: `true`
   */
  set autoAdjustNearFar(value: boolean | null | undefined);
  /**
   * The minimum distance (in meters) the camera can zoom in to the Earth surface.
   *
   * Default: `WGS84_B_64` (Earth's semi-minor axis, ~6,356,752 meters)
   */
  get minimumZoomDistance(): number | undefined;
  /**
   * The minimum distance (in meters) the camera can zoom in to the Earth surface.
   *
   * Default: `WGS84_B_64` (Earth's semi-minor axis, ~6,356,752 meters)
   */
  set minimumZoomDistance(value: number | null | undefined);
  /**
   * The maximum distance (in meters) the camera can zoom out from the Earth surface.
   *
   * Default: `WGS84_B_64 * 10.0` (~63,567,523 meters)
   */
  get maximumZoomDistance(): number | undefined;
  /**
   * The maximum distance (in meters) the camera can zoom out from the Earth surface.
   *
   * Default: `WGS84_B_64 * 10.0` (~63,567,523 meters)
   */
  set maximumZoomDistance(value: number | null | undefined);
  /**
   * Multiplier for mouse drag rotation speed.
   *
   * Default: `2.0`
   */
  get spinSpeed(): number | undefined;
  /**
   * Multiplier for mouse drag rotation speed.
   *
   * Default: `2.0`
   */
  set spinSpeed(value: number | null | undefined);
  /**
   * Multiplier for scroll wheel zoom speed.
   *
   * Default: `0.6`
   */
  get zoomSpeed(): number | undefined;
  /**
   * Multiplier for scroll wheel zoom speed.
   *
   * Default: `0.6`
   */
  set zoomSpeed(value: number | null | undefined);
  /**
   * Duration (in milliseconds) for spin inertia animation after releasing mouse drag.
   *
   * Default: `500.0`
   */
  get spinDuration(): number | undefined;
  /**
   * Duration (in milliseconds) for spin inertia animation after releasing mouse drag.
   *
   * Default: `500.0`
   */
  set spinDuration(value: number | null | undefined);
  /**
   * Duration (in milliseconds) for zoom inertia animation after scroll wheel input.
   *
   * Default: `100.0`
   */
  get zoomDuration(): number | undefined;
  /**
   * Duration (in milliseconds) for zoom inertia animation after scroll wheel input.
   *
   * Default: `100.0`
   */
  set zoomDuration(value: number | null | undefined);
  /**
   * Duration (in milliseconds) for translation inertia animation.
   *
   * Default: `500.0`
   */
  get translateDuration(): number | undefined;
  /**
   * Duration (in milliseconds) for translation inertia animation.
   *
   * Default: `500.0`
   */
  set translateDuration(value: number | null | undefined);
}
export class CameraFrustum {
  free(): void;
  constructor(near: number, far: number, fov: number, aspect_ratio: number);
  near: number;
  far: number;
  fov: number;
  aspect_ratio: number;
}
export class CameraOrientation {
  private constructor();
  free(): void;
  heading: number;
  pitch: number;
  roll: number;
}
export class CameraStatus {
  private constructor();
  free(): void;
  status: any[];
}
export class ConstructedPolygonGeometry {
  private constructor();
  free(): void;
  position_3d_high(): Float32Array | undefined;
  position_3d_high_size(): number | undefined;
  position_3d_low(): Float32Array | undefined;
  position_3d_low_size(): number | undefined;
  position(): Float32Array | undefined;
  position_size(): number | undefined;
  normal(): Float32Array | undefined;
  normal_size(): number | undefined;
  scale_normal_and_cap(): Float32Array | undefined;
  scale_normal_and_cap_size(): number | undefined;
  batch_id(): Float32Array | undefined;
  batch_id_size(): number | undefined;
  batch_index(): Uint32Array | undefined;
  batch_index_size(): number | undefined;
  indices(): Uint32Array;
  get extent(): ExtentRadianF32 | undefined;
  set extent(value: ExtentRadianF32 | null | undefined);
  /**
   * RTC (Relative-To-Center) translation vector
   * Contains the tile center in world-space ECEF coordinates
   * Used to position the mesh while keeping vertex positions in local space
   */
  get rtc_translation(): Vec3 | undefined;
  /**
   * RTC (Relative-To-Center) translation vector
   * Contains the tile center in world-space ECEF coordinates
   * Used to position the mesh while keeping vertex positions in local space
   */
  set rtc_translation(value: Vec3 | null | undefined);
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
  batch_index(): Uint32Array | undefined;
  batch_index_size(): number | undefined;
  indices(): Uint32Array;
  readonly extent: ExtentRadianF32 | undefined;
}
export class ElevationDecoder {
  free(): void;
  constructor(r_scaler: number, g_scaler: number, b_scaler: number, offset: number, max_offset: number, min_offset: number, boundary: number, epsilon: number);
  static japanGSI(): ElevationDecoder;
  static mapbox(): ElevationDecoder;
  static terrarium(): ElevationDecoder;
  r_scaler: number;
  g_scaler: number;
  b_scaler: number;
  offset: number;
  max_offset: number;
  min_offset: number;
  boundary: number;
  epsilon: number;
}
export class ElevationHeatmapMaterial {
  private constructor();
  free(): void;
  get maxHeight(): number | undefined;
  set maxHeight(value: number | null | undefined);
  get minHeight(): number | undefined;
  set minHeight(value: number | null | undefined);
  get elevationDecoder(): ElevationDecoder | undefined;
  set elevationDecoder(value: ElevationDecoder | null | undefined);
  logarithmic: boolean;
  logBoundary: number;
}
export class EllipsoidGeodesic {
  free(): void;
  constructor(start: LLE, end: LLE);
  interpolateGeodeticPoints(granularity?: number | null): LLE[];
  interpolateDistance(distance: number): LLE;
  start: LLE;
  end: LLE;
  distance: number;
  start_heading: number;
  end_heading: number;
}
export class EllipsoidTerrainMaterial {
  private constructor();
  free(): void;
  get castShadow(): boolean | undefined;
  set castShadow(value: boolean | null | undefined);
  get receiveShadow(): boolean | undefined;
  set receiveShadow(value: boolean | null | undefined);
  get showBoundingBox(): boolean | undefined;
  set showBoundingBox(value: boolean | null | undefined);
  get maxZoom(): number | undefined;
  set maxZoom(value: number | null | undefined);
  get minZoom(): number | undefined;
  set minZoom(value: number | null | undefined);
}
export class EncodedVec3 {
  free(): void;
  constructor(high: Vec3, low: Vec3);
  high: Vec3;
  low: Vec3;
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
}
/**
 * WASM wrapper for Globe resource.
 *
 * This provides a JavaScript-friendly interface for accessing and modifying
 * globe configuration properties.
 */
export class Globe {
  free(): void;
  constructor(max_sse: number, segments: number, color: number, hide_underground: boolean, should_compute_normal_from_vertex: boolean, transparent: boolean, opacity: number, wireframe: boolean, elevation_colormap: Float32Array);
  /**
   * Screen-space error threshold for level of detail (LOD) calculations. Initialization only.
   */
  maxSse: number;
  /**
   * Number of segments for mesh tessellation. Initialization only.
   */
  segments: number;
  /**
   * Base color for the globe surface (RGB as u32).
   */
  color: number;
  /**
   * Whether to hide underground geometry. Disabling this value might cause unexpected behavior when using effect layer.
   */
  hideUnderground: boolean;
  /**
   * Whether to compute normals from vertex positions. Initialization only.
   */
  shouldComputeNormalFromVertex: boolean;
  /**
   * Whether materials should be transparent.
   * Note that blending works only for resource layer.
   */
  transparent: boolean;
  /**
   * Global opacity for materials (0.0 to 1.0).
   */
  opacity: number;
  /**
   * Whether to render materials in wireframe mode.
   */
  wireframe: boolean;
  /**
   * Color map lookup table for elevation heatmap rendering.
   * Flattened RGB array: [r0,g0,b0, r1,g1,b1, ...].
   */
  elevationColormap: Float32Array;
}
export class LLE {
  free(): void;
  constructor(lat: number, lng: number, height: number);
  lat: number;
  lng: number;
  height: number;
}
export class ModelInternalMaterial {
  private constructor();
  free(): void;
  pointCloud: boolean;
  dracoCompressed: boolean;
  pointCloudGeodeticNormal: Vec3;
}
export class ModelMaterial {
  private constructor();
  free(): void;
  get show(): boolean | undefined;
  set show(value: boolean | null | undefined);
  get castShadow(): boolean | undefined;
  set castShadow(value: boolean | null | undefined);
  get receiveShadow(): boolean | undefined;
  set receiveShadow(value: boolean | null | undefined);
  get url(): string | undefined;
  set url(value: string | null | undefined);
  get size(): number | undefined;
  set size(value: number | null | undefined);
  get height(): number | undefined;
  set height(value: number | null | undefined);
  get maxSse(): number | undefined;
  set maxSse(value: number | null | undefined);
  get clampToGround(): boolean | undefined;
  set clampToGround(value: boolean | null | undefined);
  get shouldRotateInDefault(): boolean | undefined;
  set shouldRotateInDefault(value: boolean | null | undefined);
  get color(): number | undefined;
  set color(value: number | null | undefined);
  get metalness(): number | undefined;
  set metalness(value: number | null | undefined);
  /**
   * Reflectivity for post-process.
   */
  get roughness(): number | undefined;
  /**
   * Reflectivity for post-process.
   */
  set roughness(value: number | null | undefined);
  /**
   * Reflectivity for post-process or env map.
   */
  get reflectivity(): number | undefined;
  /**
   * Reflectivity for post-process or env map.
   */
  set reflectivity(value: number | null | undefined);
  /**
   * Apply a water material on the polygon. It might slow down the loading of the mesh.
   */
  get water(): boolean | undefined;
  /**
   * Apply a water material on the polygon. It might slow down the loading of the mesh.
   */
  set water(value: boolean | null | undefined);
  get waterNormalUrl(): string | undefined;
  set waterNormalUrl(value: string | null | undefined);
  /**
   * Scale water normal. Decreasing this value will make the water surface rough.
   */
  get waterScaleNormal(): number | undefined;
  /**
   * Scale water normal. Decreasing this value will make the water surface rough.
   */
  set waterScaleNormal(value: number | null | undefined);
  /**
   * Water wave speed.
   */
  get waterSpeed(): number | undefined;
  /**
   * Water wave speed.
   */
  set waterSpeed(value: number | null | undefined);
  get shininess(): number | undefined;
  set shininess(value: number | null | undefined);
  get specularStrength(): number | undefined;
  set specularStrength(value: number | null | undefined);
  get applyWaterNormal(): boolean | undefined;
  set applyWaterNormal(value: boolean | null | undefined);
  /**
   * Enabling this value allows using `shininess` and `specular_strength`.
   */
  get specular(): boolean | undefined;
  /**
   * Enabling this value allows using `shininess` and `specular_strength`.
   */
  set specular(value: boolean | null | undefined);
  get ior(): number | undefined;
  set ior(value: number | null | undefined);
  get animationActiveClip(): string | undefined;
  set animationActiveClip(value: string | null | undefined);
  get animationSpeed(): number | undefined;
  set animationSpeed(value: number | null | undefined);
  get pointSize(): number | undefined;
  set pointSize(value: number | null | undefined);
  get showBoundingBox(): boolean | undefined;
  set showBoundingBox(value: boolean | null | undefined);
  get __internal__(): ModelInternalMaterial | undefined;
  set __internal__(value: ModelInternalMaterial | null | undefined);
}
export class NearFar {
  private constructor();
  free(): void;
  near: number;
  far: number;
}
export class OverscaledTileHandle {
  private constructor();
  free(): void;
  handle: bigint;
}
export class Plane {
  private constructor();
  free(): void;
  normal: Vec3;
  distance: number;
}
export class PointMaterial {
  private constructor();
  free(): void;
  get show(): boolean | undefined;
  set show(value: boolean | null | undefined);
  get size(): number | undefined;
  set size(value: number | null | undefined);
  get color(): number | undefined;
  set color(value: number | null | undefined);
  get center(): Vec2 | undefined;
  set center(value: Vec2 | null | undefined);
  get height(): number | undefined;
  set height(value: number | null | undefined);
  get scaleByDistance(): boolean | undefined;
  set scaleByDistance(value: boolean | null | undefined);
  get clampToGround(): boolean | undefined;
  set clampToGround(value: boolean | null | undefined);
  get depthTest(): boolean | undefined;
  set depthTest(value: boolean | null | undefined);
  get transparent(): boolean | undefined;
  set transparent(value: boolean | null | undefined);
}
export class PolygonGeometry {
  private constructor();
  free(): void;
  position_3d_high(): Float32Array | undefined;
  position_3d_high_size(): number | undefined;
  position_3d_low(): Float32Array | undefined;
  position_3d_low_size(): number | undefined;
  position(): Float32Array | undefined;
  position_size(): number | undefined;
  normal(): Float32Array | undefined;
  normal_size(): number | undefined;
  scale_normal_and_cap(): Float32Array | undefined;
  scale_normal_and_cap_size(): number | undefined;
  batch_id(): Float32Array | undefined;
  batch_id_size(): number | undefined;
  batch_index(): Uint32Array | undefined;
  batch_index_size(): number | undefined;
  indices(): Uint32Array;
}
export class PolygonGeometryAttributes {
  private constructor();
  free(): void;
  transfer_position_3d_high(): Float32Array | undefined;
  transfer_position_3d_high_size(): number | undefined;
  transfer_position_3d_low(): Float32Array | undefined;
  transfer_position_3d_low_size(): number | undefined;
  transfer_position(): Float32Array | undefined;
  transfer_position_size(): number | undefined;
  transfer_normal(): Float32Array | undefined;
  transfer_normal_size(): number | undefined;
  transfer_scale_normal_and_cap(): Float32Array | undefined;
  transfer_scale_normal_and_cap_size(): number | undefined;
  transfer_batch_id(): Float32Array | undefined;
  transfer_batch_id_size(): number | undefined;
  transfer_batch_index(): Uint32Array | undefined;
  transfer_batch_index_size(): number | undefined;
}
export class PolygonInternalMaterial {
  private constructor();
  free(): void;
  minMaxHeights: Float64Array;
}
export class PolygonMaterial {
  free(): void;
  constructor(show?: boolean | null, cast_shadow?: boolean | null, receive_shadow?: boolean | null, color?: number | null, clamp_to_ground?: boolean | null, use_ground_normals?: boolean | null, height?: number | null, extruded_height?: number | null, wireframe?: boolean | null, per_position_height?: boolean | null, __internal__?: PolygonInternalMaterial | null);
  get show(): boolean | undefined;
  set show(value: boolean | null | undefined);
  get castShadow(): boolean | undefined;
  set castShadow(value: boolean | null | undefined);
  get receiveShadow(): boolean | undefined;
  set receiveShadow(value: boolean | null | undefined);
  get color(): number | undefined;
  set color(value: number | null | undefined);
  get clampToGround(): boolean | undefined;
  set clampToGround(value: boolean | null | undefined);
  get useGroundNormals(): boolean | undefined;
  set useGroundNormals(value: boolean | null | undefined);
  get height(): number | undefined;
  set height(value: number | null | undefined);
  get extrudedHeight(): number | undefined;
  set extrudedHeight(value: number | null | undefined);
  get wireframe(): boolean | undefined;
  set wireframe(value: boolean | null | undefined);
  /**
   * Reflectivity for post-process or env map.
   */
  get reflectivity(): number | undefined;
  /**
   * Reflectivity for post-process or env map.
   */
  set reflectivity(value: number | null | undefined);
  /**
   * Reflectivity for post-process.
   */
  get roughness(): number | undefined;
  /**
   * Reflectivity for post-process.
   */
  set roughness(value: number | null | undefined);
  get __internal__(): PolygonInternalMaterial | undefined;
  set __internal__(value: PolygonInternalMaterial | null | undefined);
  /**
   * Whether or not the height is obtained from the data. If false, the height is constant.
   */
  get perPositionHeight(): boolean | undefined;
  /**
   * Whether or not the height is obtained from the data. If false, the height is constant.
   */
  set perPositionHeight(value: boolean | null | undefined);
  /**
   * Need to enable `transparent`.
   */
  get opacity(): number | undefined;
  /**
   * Need to enable `transparent`.
   */
  set opacity(value: number | null | undefined);
  /**
   * Enable `opacity`. It might cause unexpected behavior when you use an effect layer.
   */
  get transparent(): boolean | undefined;
  /**
   * Enable `opacity`. It might cause unexpected behavior when you use an effect layer.
   */
  set transparent(value: boolean | null | undefined);
  /**
   * Currently, this property is supported only in GeoJSON.
   */
  get surfaceShow(): boolean | undefined;
  /**
   * Currently, this property is supported only in GeoJSON.
   */
  set surfaceShow(value: boolean | null | undefined);
  /**
   * Currently, this property is supported only in GeoJSON.
   */
  get outlineShow(): boolean | undefined;
  /**
   * Currently, this property is supported only in GeoJSON.
   */
  set outlineShow(value: boolean | null | undefined);
  /**
   * Currently, this property is supported only in GeoJSON.
   */
  get outlineColor(): number | undefined;
  /**
   * Currently, this property is supported only in GeoJSON.
   */
  set outlineColor(value: number | null | undefined);
  /**
   * Currently, this property is supported only in GeoJSON.
   */
  get outlineWidth(): number | undefined;
  /**
   * Currently, this property is supported only in GeoJSON.
   */
  set outlineWidth(value: number | null | undefined);
  /**
   * Apply a water material on the polygon. It might slow down the loading of the mesh.
   */
  get water(): boolean | undefined;
  /**
   * Apply a water material on the polygon. It might slow down the loading of the mesh.
   */
  set water(value: boolean | null | undefined);
  get waterNormalUrl(): string | undefined;
  set waterNormalUrl(value: string | null | undefined);
  /**
   * Scale water normal. Decreasing this value will make the water surface rough.
   */
  get waterScaleNormal(): number | undefined;
  /**
   * Scale water normal. Decreasing this value will make the water surface rough.
   */
  set waterScaleNormal(value: number | null | undefined);
  /**
   * Water wave speed.
   */
  get waterSpeed(): number | undefined;
  /**
   * Water wave speed.
   */
  set waterSpeed(value: number | null | undefined);
  get shininess(): number | undefined;
  set shininess(value: number | null | undefined);
  get specularStrength(): number | undefined;
  set specularStrength(value: number | null | undefined);
  get applyWaterNormal(): boolean | undefined;
  set applyWaterNormal(value: boolean | null | undefined);
  /**
   * Enabling this value allows using `shininess` and `specular_strength`.
   */
  get specular(): boolean | undefined;
  /**
   * Enabling this value allows using `shininess` and `specular_strength`.
   */
  set specular(value: boolean | null | undefined);
  get ior(): number | undefined;
  set ior(value: number | null | undefined);
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
  batch_index(): Uint32Array | undefined;
  batch_index_size(): number | undefined;
  indices(): Uint32Array;
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
  transfer_batch_index(): Uint32Array | undefined;
  transfer_batch_index_size(): number | undefined;
}
export class PolylineInternalMaterial {
  private constructor();
  free(): void;
  minMaxHeights: Float64Array;
}
export class PolylineMaterial {
  free(): void;
  constructor(show?: boolean | null, cast_shadow?: boolean | null, receive_shadow?: boolean | null, color?: number | null, clamp_to_ground?: boolean | null, use_ground_normals?: boolean | null, height?: number | null, width?: number | null, __internal__?: PolylineInternalMaterial | null);
  get show(): boolean | undefined;
  set show(value: boolean | null | undefined);
  get castShadow(): boolean | undefined;
  set castShadow(value: boolean | null | undefined);
  get receiveShadow(): boolean | undefined;
  set receiveShadow(value: boolean | null | undefined);
  get color(): number | undefined;
  set color(value: number | null | undefined);
  get width(): number | undefined;
  set width(value: number | null | undefined);
  get clampToGround(): boolean | undefined;
  set clampToGround(value: boolean | null | undefined);
  get useGroundNormals(): boolean | undefined;
  set useGroundNormals(value: boolean | null | undefined);
  get height(): number | undefined;
  set height(value: number | null | undefined);
  get __internal__(): PolylineInternalMaterial | undefined;
  set __internal__(value: PolylineInternalMaterial | null | undefined);
}
export class RasterTerrainMaterial {
  private constructor();
  free(): void;
  get show(): boolean | undefined;
  set show(value: boolean | null | undefined);
  get castShadow(): boolean | undefined;
  set castShadow(value: boolean | null | undefined);
  get receiveShadow(): boolean | undefined;
  set receiveShadow(value: boolean | null | undefined);
  get showBoundingBox(): boolean | undefined;
  set showBoundingBox(value: boolean | null | undefined);
  get maxZoom(): number | undefined;
  set maxZoom(value: number | null | undefined);
  /**
   * The terrain is upsampled until it reaches `overscaled_max_zoom`.
   */
  get overscaledMaxZoom(): number | undefined;
  /**
   * The terrain is upsampled until it reaches `overscaled_max_zoom`.
   */
  set overscaledMaxZoom(value: number | null | undefined);
  get minZoom(): number | undefined;
  set minZoom(value: number | null | undefined);
  get elevationDecoder(): ElevationDecoder | undefined;
  set elevationDecoder(value: ElevationDecoder | null | undefined);
  get tileSize(): number | undefined;
  set tileSize(value: number | null | undefined);
}
export class RasterTileInternalMaterial {
  private constructor();
  free(): void;
  texture_fragments(): any[] | undefined;
  shows: Uint8Array;
  colors: Uint32Array;
  opacities: Float32Array;
  get castShadow(): boolean | undefined;
  set castShadow(value: boolean | null | undefined);
  get receiveShadow(): boolean | undefined;
  set receiveShadow(value: boolean | null | undefined);
  get showBoundingBox(): boolean | undefined;
  set showBoundingBox(value: boolean | null | undefined);
  isElevationHeatmaps: Uint8Array;
  elevationMinHeight: number;
  elevationMaxHeight: number;
  elevationRScaler: number;
  elevationGScaler: number;
  elevationBScaler: number;
  elevationBoundary: number;
  elevationMaxOffset: number;
  elevationMinOffset: number;
  elevationEpsilon: number;
  elevationOffset: number;
  logarithmic: boolean;
  logBoundary: number;
}
export class RasterTileMaterial {
  private constructor();
  free(): void;
  get show(): boolean | undefined;
  set show(value: boolean | null | undefined);
  get color(): number | undefined;
  set color(value: number | null | undefined);
  get opacity(): number | undefined;
  set opacity(value: number | null | undefined);
  get maxZoom(): number | undefined;
  set maxZoom(value: number | null | undefined);
  get minZoom(): number | undefined;
  set minZoom(value: number | null | undefined);
  get tms(): boolean | undefined;
  set tms(value: boolean | null | undefined);
  get showBoundingBox(): boolean | undefined;
  set showBoundingBox(value: boolean | null | undefined);
}
export class Ray {
  free(): void;
  constructor(origin: Vec3, direction: Vec3);
  getPoint(t: number): Vec3;
  origin: Vec3;
  direction: Vec3;
}
export class ReturnedConstructedTerrainMesh {
  free(): void;
  constructor(geometry: Geometry, max_height: number, min_height: number, heights: Float32Array, rtc_translation?: Vec3 | null);
  transferVertices(): Float32Array;
  transferUvs(): Float32Array;
  transferIndices(): Uint32Array;
  transferHeights(): Float32Array;
  max_height: number;
  min_height: number;
  get rtc_translation(): Vec3 | undefined;
  set rtc_translation(value: Vec3 | null | undefined);
}
export class TextMaterial {
  private constructor();
  free(): void;
  get show(): boolean | undefined;
  set show(value: boolean | null | undefined);
  get size(): number | undefined;
  set size(value: number | null | undefined);
  get color(): number | undefined;
  set color(value: number | null | undefined);
  get center(): Vec2 | undefined;
  set center(value: Vec2 | null | undefined);
  get height(): number | undefined;
  set height(value: number | null | undefined);
  get scaleByDistance(): boolean | undefined;
  set scaleByDistance(value: boolean | null | undefined);
  get clampToGround(): boolean | undefined;
  set clampToGround(value: boolean | null | undefined);
  get depthTest(): boolean | undefined;
  set depthTest(value: boolean | null | undefined);
  get text(): string | undefined;
  set text(value: string | null | undefined);
  /**
   * Specify URL for font file. Supported files are ttf, otf and woff. Default is `Roboto`.
   */
  get font(): string | undefined;
  /**
   * Specify URL for font file. Supported files are ttf, otf and woff. Default is `Roboto`.
   */
  set font(value: string | null | undefined);
  get backgroundColor(): number | undefined;
  set backgroundColor(value: number | null | undefined);
  get borderColor(): number | undefined;
  set borderColor(value: number | null | undefined);
  get borderWidth(): number | undefined;
  set borderWidth(value: number | null | undefined);
  get cornerRadius(): number | undefined;
  set cornerRadius(value: number | null | undefined);
  get padding(): Vec2 | undefined;
  set padding(value: Vec2 | null | undefined);
  /**
   * Outline blur radius in CSS pixels. Defaults to `0.0`.
   */
  get outlineBlur(): number | undefined;
  /**
   * Outline blur radius in CSS pixels. Defaults to `0.0`.
   */
  set outlineBlur(value: number | null | undefined);
  get outlineColor(): number | undefined;
  set outlineColor(value: number | null | undefined);
  /**
   * Pixel offset `[x, y]` in CSS pixels. Defaults to `(0.0, 0.0)`.
   */
  get outlineOffset(): Vec2 | undefined;
  /**
   * Pixel offset `[x, y]` in CSS pixels. Defaults to `(0.0, 0.0)`.
   */
  set outlineOffset(value: Vec2 | null | undefined);
  get outlineOpacity(): number | undefined;
  set outlineOpacity(value: number | null | undefined);
  /**
   * Outline thickness measured in CSS pixels. Defaults to `0.0`.
   */
  get outlineWidth(): number | undefined;
  /**
   * Outline thickness measured in CSS pixels. Defaults to `0.0`.
   */
  set outlineWidth(value: number | null | undefined);
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
  static fromSize(size: number): TransferableMartini;
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
  setBatchIndices(byte_length: number, f: Function): void;
  setExpectedWindingOrders(byte_length: number, f: Function): void;
  transferBatchIds(): Uint32Array;
  transferBatchIndices(): Uint32Array;
  transferOuterRing(): Float64Array;
  transferOuterRingSizes(): Uint32Array;
  transferHoles(): Float64Array;
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
  setBatchIndices(byte_length: number, f: Function): void;
  setPoints(byte_length: number, f: Function): void;
  setPointsSizes(byte_length: number, f: Function): void;
  transferBatchIds(): Uint32Array;
  transferBatchIndices(): Uint32Array;
  transferPoints(): Float64Array;
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
  constructor(coords: TileXYZ, max_height: number, cached_mesh_handle?: CachedMeshHandle | null);
  coords: TileXYZ;
  max_height: number;
  get cached_mesh_handle(): CachedMeshHandle | undefined;
  set cached_mesh_handle(value: CachedMeshHandle | null | undefined);
}
export class Transform {
  free(): void;
  constructor(tx: number, ty: number, tz: number, qx: number, qy: number, qz: number, qw: number, sx: number, sy: number, sz: number);
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
export class UintAttribute {
  free(): void;
  constructor(data: Uint32Array, size: number);
  transferData(): Uint32Array;
  size: number;
}
export class UpsamplableTerrainGeometry {
  free(): void;
  constructor(uvs: Float32Array, indices: Uint32Array, heights: Float32Array);
}
export class Vec2 {
  free(): void;
  constructor(x: number, y: number);
  x: number;
  y: number;
}
export class Vec3 {
  free(): void;
  constructor(x: number, y: number, z: number);
  x: number;
  y: number;
  z: number;
}
export class VectorTileMaterial {
  private constructor();
  free(): void;
  get show(): boolean | undefined;
  set show(value: boolean | null | undefined);
  get castShadow(): boolean | undefined;
  set castShadow(value: boolean | null | undefined);
  get receiveShadow(): boolean | undefined;
  set receiveShadow(value: boolean | null | undefined);
  get maxZoom(): number | undefined;
  set maxZoom(value: number | null | undefined);
  /**
   * `Globe.max_sse` would be used to a material that uses `clamp_to_ground`.
   */
  get maxSse(): number | undefined;
  /**
   * `Globe.max_sse` would be used to a material that uses `clamp_to_ground`.
   */
  set maxSse(value: number | null | undefined);
  get layers(): string[] | undefined;
  set layers(value: string[] | null | undefined);
  get overscaledMaxZoom(): number | undefined;
  set overscaledMaxZoom(value: number | null | undefined);
}
export class WindingOrder {
  private constructor();
  free(): void;
  0: number;
}
export class Window {
  free(): void;
  constructor(width: number, height: number, pixel_ratio: number);
  width: number;
  height: number;
  pixel_ratio: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly constructPolylineBatchedFeature: (a: number, b: number, c: number) => number;
  readonly constructTerrainMesh: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly upsampleTerrainMesh: (a: number, b: number, c: number, d: number) => number;
  readonly start: () => void;
  readonly constructPolygonBatchedFeature: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_transferablemartini_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablemartini_size: (a: number) => number;
  readonly __wbg_set_transferablemartini_size: (a: number, b: number) => void;
  readonly transferablemartini_new: (a: number, b: number, c: number) => number;
  readonly transferablemartini_transfer_coords: (a: number) => any;
  readonly transferablemartini_fromSize: (a: number) => number;
  readonly __wbg_transferabletile_free: (a: number, b: number) => void;
  readonly __wbg_get_transferabletile_coords: (a: number) => number;
  readonly __wbg_set_transferabletile_coords: (a: number, b: number) => void;
  readonly __wbg_get_transferabletile_max_height: (a: number) => number;
  readonly __wbg_set_transferabletile_max_height: (a: number, b: number) => void;
  readonly __wbg_get_transferabletile_cached_mesh_handle: (a: number) => number;
  readonly __wbg_set_transferabletile_cached_mesh_handle: (a: number, b: number) => void;
  readonly transferabletile_new: (a: number, b: number, c: number) => number;
  readonly __wbg_transferablerasterdemdata_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablerasterdemdata_decoder: (a: number) => number;
  readonly __wbg_set_transferablerasterdemdata_decoder: (a: number, b: number) => void;
  readonly transferablerasterdemdata_new: (a: number) => number;
  readonly __wbg_pointmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_show: (a: number) => number;
  readonly __wbg_set_pointmaterial_show: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_scaleByDistance: (a: number) => number;
  readonly __wbg_set_pointmaterial_scaleByDistance: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_clampToGround: (a: number) => number;
  readonly __wbg_set_pointmaterial_clampToGround: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_depthTest: (a: number) => number;
  readonly __wbg_set_pointmaterial_depthTest: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_transparent: (a: number) => number;
  readonly __wbg_set_pointmaterial_transparent: (a: number, b: number) => void;
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
  readonly __wbg_get_billboardmaterial_scaleByDistance: (a: number) => number;
  readonly __wbg_set_billboardmaterial_scaleByDistance: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_clampToGround: (a: number) => number;
  readonly __wbg_set_billboardmaterial_clampToGround: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_depthTest: (a: number) => number;
  readonly __wbg_set_billboardmaterial_depthTest: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_transparent: (a: number) => number;
  readonly __wbg_set_billboardmaterial_transparent: (a: number, b: number) => void;
  readonly __wbg_get_billboardmaterial_alphaTest: (a: number) => number;
  readonly __wbg_set_billboardmaterial_alphaTest: (a: number, b: number) => void;
  readonly __wbg_textmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_textmaterial_text: (a: number) => [number, number];
  readonly __wbg_set_textmaterial_text: (a: number, b: number, c: number) => void;
  readonly __wbg_get_textmaterial_font: (a: number) => [number, number];
  readonly __wbg_set_textmaterial_font: (a: number, b: number, c: number) => void;
  readonly __wbg_get_textmaterial_borderColor: (a: number) => number;
  readonly __wbg_set_textmaterial_borderColor: (a: number, b: number) => void;
  readonly __wbg_get_textmaterial_borderWidth: (a: number) => number;
  readonly __wbg_set_textmaterial_borderWidth: (a: number, b: number) => void;
  readonly __wbg_get_textmaterial_cornerRadius: (a: number) => number;
  readonly __wbg_set_textmaterial_cornerRadius: (a: number, b: number) => void;
  readonly __wbg_get_textmaterial_padding: (a: number) => number;
  readonly __wbg_set_textmaterial_padding: (a: number, b: number) => void;
  readonly __wbg_get_textmaterial_outlineBlur: (a: number) => number;
  readonly __wbg_set_textmaterial_outlineBlur: (a: number, b: number) => void;
  readonly __wbg_get_textmaterial_outlineColor: (a: number) => number;
  readonly __wbg_set_textmaterial_outlineColor: (a: number, b: number) => void;
  readonly __wbg_get_textmaterial_outlineOffset: (a: number) => number;
  readonly __wbg_set_textmaterial_outlineOffset: (a: number, b: number) => void;
  readonly __wbg_get_textmaterial_outlineOpacity: (a: number) => number;
  readonly __wbg_set_textmaterial_outlineOpacity: (a: number, b: number) => void;
  readonly __wbg_get_textmaterial_outlineWidth: (a: number) => number;
  readonly __wbg_set_textmaterial_outlineWidth: (a: number, b: number) => void;
  readonly __wbg_polylinematerial_free: (a: number, b: number) => void;
  readonly __wbg_get_polylinematerial_show: (a: number) => number;
  readonly __wbg_set_polylinematerial_show: (a: number, b: number) => void;
  readonly __wbg_get_polylinematerial_castShadow: (a: number) => number;
  readonly __wbg_set_polylinematerial_castShadow: (a: number, b: number) => void;
  readonly __wbg_get_polylinematerial_receiveShadow: (a: number) => number;
  readonly __wbg_set_polylinematerial_receiveShadow: (a: number, b: number) => void;
  readonly __wbg_get_polylinematerial_clampToGround: (a: number) => number;
  readonly __wbg_set_polylinematerial_clampToGround: (a: number, b: number) => void;
  readonly __wbg_get_polylinematerial_useGroundNormals: (a: number) => number;
  readonly __wbg_set_polylinematerial_useGroundNormals: (a: number, b: number) => void;
  readonly __wbg_get_polylinematerial___internal__: (a: number) => number;
  readonly __wbg_set_polylinematerial___internal__: (a: number, b: number) => void;
  readonly polylinematerial_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly __wbg_polylineinternalmaterial_free: (a: number, b: number) => void;
  readonly __wbg_polygonmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_show: (a: number) => number;
  readonly __wbg_set_polygonmaterial_show: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_castShadow: (a: number) => number;
  readonly __wbg_set_polygonmaterial_castShadow: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_receiveShadow: (a: number) => number;
  readonly __wbg_set_polygonmaterial_receiveShadow: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_clampToGround: (a: number) => number;
  readonly __wbg_set_polygonmaterial_clampToGround: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_useGroundNormals: (a: number) => number;
  readonly __wbg_set_polygonmaterial_useGroundNormals: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_height: (a: number) => number;
  readonly __wbg_set_polygonmaterial_height: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_extrudedHeight: (a: number) => number;
  readonly __wbg_set_polygonmaterial_extrudedHeight: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_wireframe: (a: number) => number;
  readonly __wbg_set_polygonmaterial_wireframe: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_reflectivity: (a: number) => number;
  readonly __wbg_set_polygonmaterial_reflectivity: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_roughness: (a: number) => number;
  readonly __wbg_set_polygonmaterial_roughness: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial___internal__: (a: number) => number;
  readonly __wbg_set_polygonmaterial___internal__: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_perPositionHeight: (a: number) => number;
  readonly __wbg_set_polygonmaterial_perPositionHeight: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_opacity: (a: number) => number;
  readonly __wbg_set_polygonmaterial_opacity: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_transparent: (a: number) => number;
  readonly __wbg_set_polygonmaterial_transparent: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_surfaceShow: (a: number) => number;
  readonly __wbg_set_polygonmaterial_surfaceShow: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_outlineShow: (a: number) => number;
  readonly __wbg_set_polygonmaterial_outlineShow: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_outlineColor: (a: number) => number;
  readonly __wbg_set_polygonmaterial_outlineColor: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_outlineWidth: (a: number) => number;
  readonly __wbg_set_polygonmaterial_outlineWidth: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_water: (a: number) => number;
  readonly __wbg_set_polygonmaterial_water: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_waterNormalUrl: (a: number) => [number, number];
  readonly __wbg_set_polygonmaterial_waterNormalUrl: (a: number, b: number, c: number) => void;
  readonly __wbg_get_polygonmaterial_waterScaleNormal: (a: number) => number;
  readonly __wbg_set_polygonmaterial_waterScaleNormal: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_waterSpeed: (a: number) => number;
  readonly __wbg_set_polygonmaterial_waterSpeed: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_shininess: (a: number) => number;
  readonly __wbg_set_polygonmaterial_shininess: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_specularStrength: (a: number) => number;
  readonly __wbg_set_polygonmaterial_specularStrength: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_applyWaterNormal: (a: number) => number;
  readonly __wbg_set_polygonmaterial_applyWaterNormal: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_specular: (a: number) => number;
  readonly __wbg_set_polygonmaterial_specular: (a: number, b: number) => void;
  readonly __wbg_get_polygonmaterial_ior: (a: number) => number;
  readonly __wbg_set_polygonmaterial_ior: (a: number, b: number) => void;
  readonly polygonmaterial_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
  readonly __wbg_polygoninternalmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_polygoninternalmaterial_minMaxHeights: (a: number) => [number, number];
  readonly __wbg_set_polygoninternalmaterial_minMaxHeights: (a: number, b: number, c: number) => void;
  readonly __wbg_modelmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_show: (a: number) => number;
  readonly __wbg_set_modelmaterial_show: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_castShadow: (a: number) => number;
  readonly __wbg_set_modelmaterial_castShadow: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_receiveShadow: (a: number) => number;
  readonly __wbg_set_modelmaterial_receiveShadow: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_url: (a: number) => [number, number];
  readonly __wbg_set_modelmaterial_url: (a: number, b: number, c: number) => void;
  readonly __wbg_get_modelmaterial_size: (a: number) => number;
  readonly __wbg_set_modelmaterial_size: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_height: (a: number) => number;
  readonly __wbg_set_modelmaterial_height: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_maxSse: (a: number) => number;
  readonly __wbg_set_modelmaterial_maxSse: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_clampToGround: (a: number) => number;
  readonly __wbg_set_modelmaterial_clampToGround: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_shouldRotateInDefault: (a: number) => number;
  readonly __wbg_set_modelmaterial_shouldRotateInDefault: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_color: (a: number) => number;
  readonly __wbg_set_modelmaterial_color: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_metalness: (a: number) => number;
  readonly __wbg_set_modelmaterial_metalness: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_water: (a: number) => number;
  readonly __wbg_set_modelmaterial_water: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_waterNormalUrl: (a: number) => [number, number];
  readonly __wbg_set_modelmaterial_waterNormalUrl: (a: number, b: number, c: number) => void;
  readonly __wbg_get_modelmaterial_waterScaleNormal: (a: number) => number;
  readonly __wbg_set_modelmaterial_waterScaleNormal: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_waterSpeed: (a: number) => number;
  readonly __wbg_set_modelmaterial_waterSpeed: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_shininess: (a: number) => number;
  readonly __wbg_set_modelmaterial_shininess: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_specularStrength: (a: number) => number;
  readonly __wbg_set_modelmaterial_specularStrength: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_applyWaterNormal: (a: number) => number;
  readonly __wbg_set_modelmaterial_applyWaterNormal: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_specular: (a: number) => number;
  readonly __wbg_set_modelmaterial_specular: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_ior: (a: number) => number;
  readonly __wbg_set_modelmaterial_ior: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_animationActiveClip: (a: number) => [number, number];
  readonly __wbg_set_modelmaterial_animationActiveClip: (a: number, b: number, c: number) => void;
  readonly __wbg_get_modelmaterial_animationSpeed: (a: number) => number;
  readonly __wbg_set_modelmaterial_animationSpeed: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_pointSize: (a: number) => number;
  readonly __wbg_set_modelmaterial_pointSize: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial_showBoundingBox: (a: number) => number;
  readonly __wbg_set_modelmaterial_showBoundingBox: (a: number, b: number) => void;
  readonly __wbg_get_modelmaterial___internal__: (a: number) => number;
  readonly __wbg_set_modelmaterial___internal__: (a: number, b: number) => void;
  readonly __wbg_modelinternalmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_modelinternalmaterial_pointCloud: (a: number) => number;
  readonly __wbg_set_modelinternalmaterial_pointCloud: (a: number, b: number) => void;
  readonly __wbg_get_modelinternalmaterial_dracoCompressed: (a: number) => number;
  readonly __wbg_set_modelinternalmaterial_dracoCompressed: (a: number, b: number) => void;
  readonly __wbg_get_modelinternalmaterial_pointCloudGeodeticNormal: (a: number) => number;
  readonly __wbg_set_modelinternalmaterial_pointCloudGeodeticNormal: (a: number, b: number) => void;
  readonly __wbg_rastertilematerial_free: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial_show: (a: number) => number;
  readonly __wbg_set_rastertilematerial_show: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial_maxZoom: (a: number) => number;
  readonly __wbg_set_rastertilematerial_maxZoom: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial_minZoom: (a: number) => number;
  readonly __wbg_set_rastertilematerial_minZoom: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial_tms: (a: number) => number;
  readonly __wbg_set_rastertilematerial_tms: (a: number, b: number) => void;
  readonly __wbg_get_rastertilematerial_showBoundingBox: (a: number) => number;
  readonly __wbg_set_rastertilematerial_showBoundingBox: (a: number, b: number) => void;
  readonly __wbg_rastertileinternalmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_shows: (a: number) => [number, number];
  readonly __wbg_set_rastertileinternalmaterial_shows: (a: number, b: number, c: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_colors: (a: number) => [number, number];
  readonly __wbg_set_rastertileinternalmaterial_colors: (a: number, b: number, c: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_opacities: (a: number) => [number, number];
  readonly __wbg_set_rastertileinternalmaterial_opacities: (a: number, b: number, c: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_castShadow: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_castShadow: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_receiveShadow: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_receiveShadow: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_showBoundingBox: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_showBoundingBox: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_isElevationHeatmaps: (a: number) => [number, number];
  readonly __wbg_set_rastertileinternalmaterial_isElevationHeatmaps: (a: number, b: number, c: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_elevationMinHeight: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_elevationMinHeight: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_elevationMaxHeight: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_elevationMaxHeight: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_elevationRScaler: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_elevationRScaler: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_elevationGScaler: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_elevationGScaler: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_elevationBScaler: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_elevationBScaler: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_elevationBoundary: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_elevationBoundary: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_elevationMaxOffset: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_elevationMaxOffset: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_elevationMinOffset: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_elevationMinOffset: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_elevationEpsilon: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_elevationEpsilon: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_elevationOffset: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_elevationOffset: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_logarithmic: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_logarithmic: (a: number, b: number) => void;
  readonly __wbg_get_rastertileinternalmaterial_logBoundary: (a: number) => number;
  readonly __wbg_set_rastertileinternalmaterial_logBoundary: (a: number, b: number) => void;
  readonly rastertileinternalmaterial_texture_fragments: (a: number) => [number, number];
  readonly __wbg_vectortilematerial_free: (a: number, b: number) => void;
  readonly __wbg_get_vectortilematerial_layers: (a: number) => [number, number];
  readonly __wbg_set_vectortilematerial_layers: (a: number, b: number, c: number) => void;
  readonly __wbg_rasterterrainmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_show: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_show: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_castShadow: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_castShadow: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_receiveShadow: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_receiveShadow: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_showBoundingBox: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_showBoundingBox: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_maxZoom: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_maxZoom: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_overscaledMaxZoom: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_overscaledMaxZoom: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_minZoom: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_minZoom: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_elevationDecoder: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_elevationDecoder: (a: number, b: number) => void;
  readonly __wbg_get_rasterterrainmaterial_tileSize: (a: number) => number;
  readonly __wbg_set_rasterterrainmaterial_tileSize: (a: number, b: number) => void;
  readonly __wbg_elevationheatmapmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_elevationheatmapmaterial_maxHeight: (a: number) => [number, number];
  readonly __wbg_set_elevationheatmapmaterial_maxHeight: (a: number, b: number, c: number) => void;
  readonly __wbg_get_elevationheatmapmaterial_minHeight: (a: number) => [number, number];
  readonly __wbg_set_elevationheatmapmaterial_minHeight: (a: number, b: number, c: number) => void;
  readonly __wbg_get_elevationheatmapmaterial_elevationDecoder: (a: number) => number;
  readonly __wbg_set_elevationheatmapmaterial_elevationDecoder: (a: number, b: number) => void;
  readonly __wbg_get_elevationheatmapmaterial_logarithmic: (a: number) => number;
  readonly __wbg_set_elevationheatmapmaterial_logarithmic: (a: number, b: number) => void;
  readonly __wbg_get_elevationheatmapmaterial_logBoundary: (a: number) => number;
  readonly __wbg_set_elevationheatmapmaterial_logBoundary: (a: number, b: number) => void;
  readonly __wbg_ellipsoidterrainmaterial_free: (a: number, b: number) => void;
  readonly __wbg_get_ellipsoidterrainmaterial_castShadow: (a: number) => number;
  readonly __wbg_set_ellipsoidterrainmaterial_castShadow: (a: number, b: number) => void;
  readonly __wbg_get_ellipsoidterrainmaterial_receiveShadow: (a: number) => number;
  readonly __wbg_set_ellipsoidterrainmaterial_receiveShadow: (a: number, b: number) => void;
  readonly __wbg_get_ellipsoidterrainmaterial_showBoundingBox: (a: number) => number;
  readonly __wbg_set_ellipsoidterrainmaterial_showBoundingBox: (a: number, b: number) => void;
  readonly __wbg_get_ellipsoidterrainmaterial_maxZoom: (a: number) => number;
  readonly __wbg_set_ellipsoidterrainmaterial_maxZoom: (a: number, b: number) => void;
  readonly __wbg_get_ellipsoidterrainmaterial_minZoom: (a: number) => number;
  readonly __wbg_set_ellipsoidterrainmaterial_minZoom: (a: number, b: number) => void;
  readonly __wbg_set_pointmaterial_center: (a: number, b: number) => void;
  readonly __wbg_set_textmaterial_center: (a: number, b: number) => void;
  readonly __wbg_set_pointmaterial_size: (a: number, b: number) => void;
  readonly __wbg_set_pointmaterial_height: (a: number, b: number) => void;
  readonly __wbg_set_polylinematerial_width: (a: number, b: number) => void;
  readonly __wbg_set_polylinematerial_height: (a: number, b: number) => void;
  readonly __wbg_set_modelmaterial_roughness: (a: number, b: number) => void;
  readonly __wbg_set_modelmaterial_reflectivity: (a: number, b: number) => void;
  readonly __wbg_set_textmaterial_size: (a: number, b: number) => void;
  readonly __wbg_set_textmaterial_height: (a: number, b: number) => void;
  readonly __wbg_set_rastertilematerial_opacity: (a: number, b: number) => void;
  readonly __wbg_set_vectortilematerial_maxSse: (a: number, b: number) => void;
  readonly __wbg_get_polylineinternalmaterial_minMaxHeights: (a: number) => [number, number];
  readonly __wbg_set_polylineinternalmaterial_minMaxHeights: (a: number, b: number, c: number) => void;
  readonly __wbg_get_textmaterial_show: (a: number) => number;
  readonly __wbg_get_textmaterial_scaleByDistance: (a: number) => number;
  readonly __wbg_get_textmaterial_clampToGround: (a: number) => number;
  readonly __wbg_get_textmaterial_depthTest: (a: number) => number;
  readonly __wbg_get_vectortilematerial_show: (a: number) => number;
  readonly __wbg_get_vectortilematerial_castShadow: (a: number) => number;
  readonly __wbg_get_vectortilematerial_receiveShadow: (a: number) => number;
  readonly __wbg_set_textmaterial_show: (a: number, b: number) => void;
  readonly __wbg_set_textmaterial_scaleByDistance: (a: number, b: number) => void;
  readonly __wbg_set_textmaterial_clampToGround: (a: number, b: number) => void;
  readonly __wbg_set_textmaterial_depthTest: (a: number, b: number) => void;
  readonly __wbg_set_vectortilematerial_show: (a: number, b: number) => void;
  readonly __wbg_set_vectortilematerial_castShadow: (a: number, b: number) => void;
  readonly __wbg_set_vectortilematerial_receiveShadow: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_center: (a: number) => number;
  readonly __wbg_get_textmaterial_center: (a: number) => number;
  readonly __wbg_set_pointmaterial_color: (a: number, b: number) => void;
  readonly __wbg_set_polylinematerial_color: (a: number, b: number) => void;
  readonly __wbg_set_rastertilematerial_color: (a: number, b: number) => void;
  readonly __wbg_set_vectortilematerial_maxZoom: (a: number, b: number) => void;
  readonly __wbg_set_vectortilematerial_overscaledMaxZoom: (a: number, b: number) => void;
  readonly __wbg_set_textmaterial_color: (a: number, b: number) => void;
  readonly __wbg_set_textmaterial_backgroundColor: (a: number, b: number) => void;
  readonly __wbg_set_polygonmaterial_color: (a: number, b: number) => void;
  readonly __wbg_get_pointmaterial_color: (a: number) => number;
  readonly __wbg_get_polylinematerial_color: (a: number) => number;
  readonly __wbg_get_rastertilematerial_color: (a: number) => number;
  readonly __wbg_get_vectortilematerial_maxZoom: (a: number) => number;
  readonly __wbg_get_vectortilematerial_overscaledMaxZoom: (a: number) => number;
  readonly __wbg_get_textmaterial_color: (a: number) => number;
  readonly __wbg_get_textmaterial_backgroundColor: (a: number) => number;
  readonly __wbg_get_polygonmaterial_color: (a: number) => number;
  readonly __wbg_get_pointmaterial_size: (a: number) => number;
  readonly __wbg_get_pointmaterial_height: (a: number) => number;
  readonly __wbg_get_polylinematerial_width: (a: number) => number;
  readonly __wbg_get_polylinematerial_height: (a: number) => number;
  readonly __wbg_get_modelmaterial_roughness: (a: number) => number;
  readonly __wbg_get_modelmaterial_reflectivity: (a: number) => number;
  readonly __wbg_get_textmaterial_size: (a: number) => number;
  readonly __wbg_get_textmaterial_height: (a: number) => number;
  readonly __wbg_get_rastertilematerial_opacity: (a: number) => number;
  readonly __wbg_get_vectortilematerial_maxSse: (a: number) => number;
  readonly __wbg_constructedpolygongeometry_free: (a: number, b: number) => void;
  readonly __wbg_get_constructedpolygongeometry_extent: (a: number) => number;
  readonly __wbg_set_constructedpolygongeometry_extent: (a: number, b: number) => void;
  readonly __wbg_get_constructedpolygongeometry_rtc_translation: (a: number) => number;
  readonly __wbg_set_constructedpolygongeometry_rtc_translation: (a: number, b: number) => void;
  readonly constructedpolygongeometry_position_3d_high: (a: number) => any;
  readonly constructedpolygongeometry_position_3d_high_size: (a: number) => number;
  readonly constructedpolygongeometry_position_3d_low: (a: number) => any;
  readonly constructedpolygongeometry_position_3d_low_size: (a: number) => number;
  readonly constructedpolygongeometry_position: (a: number) => any;
  readonly constructedpolygongeometry_position_size: (a: number) => number;
  readonly constructedpolygongeometry_normal: (a: number) => any;
  readonly constructedpolygongeometry_normal_size: (a: number) => number;
  readonly constructedpolygongeometry_scale_normal_and_cap: (a: number) => any;
  readonly constructedpolygongeometry_scale_normal_and_cap_size: (a: number) => number;
  readonly constructedpolygongeometry_batch_id: (a: number) => any;
  readonly constructedpolygongeometry_batch_id_size: (a: number) => number;
  readonly constructedpolygongeometry_batch_index: (a: number) => any;
  readonly constructedpolygongeometry_batch_index_size: (a: number) => number;
  readonly constructedpolygongeometry_indices: (a: number) => any;
  readonly __wbg_polygongeometry_free: (a: number, b: number) => void;
  readonly polygongeometry_position_3d_high: (a: number) => any;
  readonly polygongeometry_position_3d_high_size: (a: number) => number;
  readonly polygongeometry_position_3d_low: (a: number) => any;
  readonly polygongeometry_position_3d_low_size: (a: number) => number;
  readonly polygongeometry_position: (a: number) => any;
  readonly polygongeometry_position_size: (a: number) => number;
  readonly polygongeometry_normal: (a: number) => any;
  readonly polygongeometry_normal_size: (a: number) => number;
  readonly polygongeometry_scale_normal_and_cap: (a: number) => any;
  readonly polygongeometry_scale_normal_and_cap_size: (a: number) => number;
  readonly polygongeometry_batch_id: (a: number) => any;
  readonly polygongeometry_batch_id_size: (a: number) => number;
  readonly polygongeometry_batch_index: (a: number) => any;
  readonly polygongeometry_batch_index_size: (a: number) => number;
  readonly polygongeometry_indices: (a: number) => any;
  readonly __wbg_polygongeometryattributes_free: (a: number, b: number) => void;
  readonly polygongeometryattributes_transfer_position_3d_high: (a: number) => any;
  readonly polygongeometryattributes_transfer_position_3d_high_size: (a: number) => number;
  readonly polygongeometryattributes_transfer_position_3d_low: (a: number) => any;
  readonly polygongeometryattributes_transfer_position_3d_low_size: (a: number) => number;
  readonly polygongeometryattributes_transfer_position: (a: number) => any;
  readonly polygongeometryattributes_transfer_position_size: (a: number) => number;
  readonly polygongeometryattributes_transfer_normal: (a: number) => any;
  readonly polygongeometryattributes_transfer_normal_size: (a: number) => number;
  readonly polygongeometryattributes_transfer_scale_normal_and_cap: (a: number) => any;
  readonly polygongeometryattributes_transfer_scale_normal_and_cap_size: (a: number) => number;
  readonly polygongeometryattributes_transfer_batch_id: (a: number) => any;
  readonly polygongeometryattributes_transfer_batch_id_size: (a: number) => number;
  readonly polygongeometryattributes_transfer_batch_index: (a: number) => any;
  readonly polygongeometryattributes_transfer_batch_index_size: (a: number) => number;
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
  readonly elevationdecoder_terrarium: () => number;
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
  readonly __wbg_boundingsphere_free: (a: number, b: number) => void;
  readonly __wbg_get_boundingsphere_center_x: (a: number) => number;
  readonly __wbg_set_boundingsphere_center_x: (a: number, b: number) => void;
  readonly __wbg_get_boundingsphere_center_y: (a: number) => number;
  readonly __wbg_set_boundingsphere_center_y: (a: number, b: number) => void;
  readonly __wbg_get_boundingsphere_center_z: (a: number) => number;
  readonly __wbg_set_boundingsphere_center_z: (a: number, b: number) => void;
  readonly __wbg_get_boundingsphere_radius: (a: number) => number;
  readonly __wbg_set_boundingsphere_radius: (a: number, b: number) => void;
  readonly boundingsphere_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_aabb_free: (a: number, b: number) => void;
  readonly __wbg_get_aabb_center: (a: number) => number;
  readonly __wbg_set_aabb_center: (a: number, b: number) => void;
  readonly __wbg_get_aabb_extent: (a: number) => number;
  readonly __wbg_set_aabb_extent: (a: number, b: number) => void;
  readonly aabb_new: (a: number, b: number) => number;
  readonly __wbg_transferablehierarchy_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablehierarchy_expected_winding_order: (a: number) => number;
  readonly __wbg_set_transferablehierarchy_expected_winding_order: (a: number, b: number) => void;
  readonly __wbg_transferableholes_free: (a: number, b: number) => void;
  readonly __wbg_windingorder_free: (a: number, b: number) => void;
  readonly __wbg_get_windingorder_0: (a: number) => number;
  readonly __wbg_set_windingorder_0: (a: number, b: number) => void;
  readonly __wbg_tilexyz_free: (a: number, b: number) => void;
  readonly __wbg_get_tilexyz_x: (a: number) => number;
  readonly __wbg_set_tilexyz_x: (a: number, b: number) => void;
  readonly __wbg_get_tilexyz_y: (a: number) => number;
  readonly __wbg_set_tilexyz_y: (a: number, b: number) => void;
  readonly __wbg_get_tilexyz_z: (a: number) => number;
  readonly __wbg_set_tilexyz_z: (a: number, b: number) => void;
  readonly tilexyz_new: (a: number, b: number, c: number) => number;
  readonly __wbg_overscaledtilehandle_free: (a: number, b: number) => void;
  readonly __wbg_get_overscaledtilehandle_handle: (a: number) => bigint;
  readonly __wbg_set_overscaledtilehandle_handle: (a: number, b: bigint) => void;
  readonly __wbg_batchpropresult_free: (a: number, b: number) => void;
  readonly __wbg_get_batchpropresult_properties: (a: number) => any;
  readonly __wbg_set_batchpropresult_properties: (a: number, b: any) => void;
  readonly __wbg_get_batchpropresult_layerId: (a: number) => [number, number];
  readonly __wbg_set_batchpropresult_layerId: (a: number, b: number, c: number) => void;
  readonly __wbg_lle_free: (a: number, b: number) => void;
  readonly __wbg_get_lle_lat: (a: number) => number;
  readonly __wbg_set_lle_lat: (a: number, b: number) => void;
  readonly __wbg_get_lle_lng: (a: number) => number;
  readonly __wbg_set_lle_lng: (a: number, b: number) => void;
  readonly __wbg_get_lle_height: (a: number) => number;
  readonly __wbg_set_lle_height: (a: number, b: number) => void;
  readonly lle_new: (a: number, b: number, c: number) => number;
  readonly __wbg_ellipsoidgeodesic_free: (a: number, b: number) => void;
  readonly __wbg_get_ellipsoidgeodesic_start: (a: number) => number;
  readonly __wbg_set_ellipsoidgeodesic_start: (a: number, b: number) => void;
  readonly __wbg_get_ellipsoidgeodesic_end: (a: number) => number;
  readonly __wbg_set_ellipsoidgeodesic_end: (a: number, b: number) => void;
  readonly __wbg_get_ellipsoidgeodesic_distance: (a: number) => number;
  readonly __wbg_set_ellipsoidgeodesic_distance: (a: number, b: number) => void;
  readonly __wbg_get_ellipsoidgeodesic_start_heading: (a: number) => number;
  readonly __wbg_set_ellipsoidgeodesic_start_heading: (a: number, b: number) => void;
  readonly __wbg_get_ellipsoidgeodesic_end_heading: (a: number) => number;
  readonly __wbg_set_ellipsoidgeodesic_end_heading: (a: number, b: number) => void;
  readonly ellipsoidgeodesic_new: (a: number, b: number) => number;
  readonly ellipsoidgeodesic_interpolateGeodeticPoints: (a: number, b: number, c: number) => [number, number];
  readonly ellipsoidgeodesic_interpolateDistance: (a: number, b: number) => number;
  readonly __wbg_plane_free: (a: number, b: number) => void;
  readonly __wbg_get_plane_normal: (a: number) => number;
  readonly __wbg_set_plane_normal: (a: number, b: number) => void;
  readonly __wbg_get_plane_distance: (a: number) => number;
  readonly __wbg_set_plane_distance: (a: number, b: number) => void;
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
  readonly transferablepolygonbatchedfeature_setBatchIndices: (a: number, b: number, c: any) => void;
  readonly transferablepolygonbatchedfeature_setExpectedWindingOrders: (a: number, b: number, c: any) => void;
  readonly transferablepolygonbatchedfeature_transferBatchIds: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferBatchIndices: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferOuterRing: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferOuterRingSizes: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferHoles: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferHolesBoundaries: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferHolesSizes: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferHolesTotalSizes: (a: number) => any;
  readonly transferablepolygonbatchedfeature_transferExpectedWindingOrders: (a: number) => any;
  readonly __wbg_transferablepolylinebatchedfeature_free: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolylinebatchedfeature_crs: (a: number) => number;
  readonly __wbg_set_transferablepolylinebatchedfeature_crs: (a: number, b: number) => void;
  readonly __wbg_get_transferablepolylinebatchedfeature_length: (a: number) => number;
  readonly __wbg_set_transferablepolylinebatchedfeature_length: (a: number, b: number) => void;
  readonly transferablepolylinebatchedfeature_constructor: (a: number, b: number) => number;
  readonly transferablepolylinebatchedfeature_setBatchIds: (a: number, b: number, c: any) => void;
  readonly transferablepolylinebatchedfeature_setBatchIndices: (a: number, b: number, c: any) => void;
  readonly transferablepolylinebatchedfeature_setPoints: (a: number, b: number, c: any) => void;
  readonly transferablepolylinebatchedfeature_setPointsSizes: (a: number, b: number, c: any) => void;
  readonly transferablepolylinebatchedfeature_transferBatchIds: (a: number) => any;
  readonly transferablepolylinebatchedfeature_transferBatchIndices: (a: number) => any;
  readonly transferablepolylinebatchedfeature_transferPoints: (a: number) => any;
  readonly transferablepolylinebatchedfeature_transferPointsSizes: (a: number) => any;
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
  readonly __wbg_texturefragment_free: (a: number, b: number) => void;
  readonly __wbg_get_texturefragment_ind: (a: number) => number;
  readonly __wbg_set_texturefragment_ind: (a: number, b: number) => void;
  readonly __wbg_get_texturefragment_gen: (a: number) => number;
  readonly __wbg_set_texturefragment_gen: (a: number, b: number) => void;
  readonly __wbg_floatattribute_free: (a: number, b: number) => void;
  readonly __wbg_get_floatattribute_size: (a: number) => number;
  readonly __wbg_set_floatattribute_size: (a: number, b: number) => void;
  readonly floatattribute_new: (a: number, b: number, c: number) => number;
  readonly floatattribute_transferData: (a: number) => any;
  readonly __wbg_uintattribute_free: (a: number, b: number) => void;
  readonly uintattribute_transferData: (a: number) => any;
  readonly __wbg_geometry_free: (a: number, b: number) => void;
  readonly geometry_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly geometry_transferVertices: (a: number) => any;
  readonly geometry_transferUvs: (a: number) => any;
  readonly geometry_transferIndices: (a: number) => any;
  readonly __wbg_returnedconstructedterrainmesh_free: (a: number, b: number) => void;
  readonly __wbg_get_returnedconstructedterrainmesh_max_height: (a: number) => number;
  readonly __wbg_set_returnedconstructedterrainmesh_max_height: (a: number, b: number) => void;
  readonly __wbg_get_returnedconstructedterrainmesh_min_height: (a: number) => number;
  readonly __wbg_set_returnedconstructedterrainmesh_min_height: (a: number, b: number) => void;
  readonly __wbg_get_returnedconstructedterrainmesh_rtc_translation: (a: number) => number;
  readonly __wbg_set_returnedconstructedterrainmesh_rtc_translation: (a: number, b: number) => void;
  readonly returnedconstructedterrainmesh_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly returnedconstructedterrainmesh_transferVertices: (a: number) => any;
  readonly returnedconstructedterrainmesh_transferUvs: (a: number) => any;
  readonly returnedconstructedterrainmesh_transferIndices: (a: number) => any;
  readonly returnedconstructedterrainmesh_transferHeights: (a: number) => any;
  readonly __wbg_upsamplableterraingeometry_free: (a: number, b: number) => void;
  readonly __wbg_encodedvec3_free: (a: number, b: number) => void;
  readonly __wbg_get_encodedvec3_high: (a: number) => number;
  readonly __wbg_set_encodedvec3_high: (a: number, b: number) => void;
  readonly __wbg_get_encodedvec3_low: (a: number) => number;
  readonly __wbg_set_encodedvec3_low: (a: number, b: number) => void;
  readonly encodedvec3_new: (a: number, b: number) => number;
  readonly __wbg_window_free: (a: number, b: number) => void;
  readonly __wbg_get_window_width: (a: number) => number;
  readonly __wbg_set_window_width: (a: number, b: number) => void;
  readonly __wbg_get_window_height: (a: number) => number;
  readonly __wbg_set_window_height: (a: number, b: number) => void;
  readonly __wbg_get_window_pixel_ratio: (a: number) => number;
  readonly __wbg_set_window_pixel_ratio: (a: number, b: number) => void;
  readonly window_new: (a: number, b: number, c: number) => number;
  readonly __wbg_set_uintattribute_size: (a: number, b: number) => void;
  readonly upsamplableterraingeometry_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly __wbg_get_uintattribute_size: (a: number) => number;
  readonly uintattribute_new: (a: number, b: number, c: number) => number;
  readonly __wbg_vec2_free: (a: number, b: number) => void;
  readonly __wbg_get_vec2_x: (a: number) => number;
  readonly __wbg_set_vec2_x: (a: number, b: number) => void;
  readonly __wbg_get_vec2_y: (a: number) => number;
  readonly __wbg_set_vec2_y: (a: number, b: number) => void;
  readonly vec2_new: (a: number, b: number) => number;
  readonly __wbg_vec3_free: (a: number, b: number) => void;
  readonly __wbg_get_vec3_z: (a: number) => number;
  readonly __wbg_set_vec3_z: (a: number, b: number) => void;
  readonly vec3_new: (a: number, b: number, c: number) => number;
  readonly __wbg_get_vec3_x: (a: number) => number;
  readonly __wbg_get_vec3_y: (a: number) => number;
  readonly __wbg_set_vec3_x: (a: number, b: number) => void;
  readonly __wbg_set_vec3_y: (a: number, b: number) => void;
  readonly __wbg_constructedpolylinegeometry_free: (a: number, b: number) => void;
  readonly constructedpolylinegeometry_extent: (a: number) => number;
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
  readonly constructedpolylinegeometry_batch_index: (a: number) => any;
  readonly constructedpolylinegeometry_batch_index_size: (a: number) => number;
  readonly constructedpolylinegeometry_indices: (a: number) => any;
  readonly __wbg_polylinegeometry_free: (a: number, b: number) => void;
  readonly polylinegeometry_position: (a: number) => any;
  readonly polylinegeometry_position_size: (a: number) => number;
  readonly polylinegeometry_start: (a: number) => any;
  readonly polylinegeometry_start_size: (a: number) => number;
  readonly polylinegeometry_forward_offset: (a: number) => any;
  readonly polylinegeometry_forward_offset_size: (a: number) => number;
  readonly polylinegeometry_start_normals: (a: number) => any;
  readonly polylinegeometry_start_normals_size: (a: number) => number;
  readonly polylinegeometry_end_normal_and_texture_coordinate_normalization_x: (a: number) => any;
  readonly polylinegeometry_end_normal_and_texture_coordinate_normalization_x_size: (a: number) => number;
  readonly polylinegeometry_right_normal_and_texture_coordinate_normalization_y: (a: number) => any;
  readonly polylinegeometry_right_normal_and_texture_coordinate_normalization_y_size: (a: number) => number;
  readonly polylinegeometry_batch_id: (a: number) => any;
  readonly polylinegeometry_batch_id_size: (a: number) => number;
  readonly polylinegeometry_batch_index: (a: number) => any;
  readonly polylinegeometry_batch_index_size: (a: number) => number;
  readonly polylinegeometry_indices: (a: number) => any;
  readonly __wbg_polylinegeometryattributes_free: (a: number, b: number) => void;
  readonly polylinegeometryattributes_transfer_position: (a: number) => any;
  readonly polylinegeometryattributes_transfer_start: (a: number) => any;
  readonly polylinegeometryattributes_transfer_forward_offset: (a: number) => any;
  readonly polylinegeometryattributes_transfer_start_normals: (a: number) => any;
  readonly polylinegeometryattributes_transfer_end_normal_and_texture_coordinate_normalization_x: (a: number) => any;
  readonly polylinegeometryattributes_transfer_right_normal_and_texture_coordinate_normalization_y: (a: number) => any;
  readonly polylinegeometryattributes_transfer_batch_id: (a: number) => any;
  readonly polylinegeometryattributes_transfer_batch_index: (a: number) => any;
  readonly __wbg_globe_free: (a: number, b: number) => void;
  readonly __wbg_get_globe_maxSse: (a: number) => number;
  readonly __wbg_set_globe_maxSse: (a: number, b: number) => void;
  readonly __wbg_get_globe_segments: (a: number) => number;
  readonly __wbg_set_globe_segments: (a: number, b: number) => void;
  readonly __wbg_get_globe_color: (a: number) => number;
  readonly __wbg_set_globe_color: (a: number, b: number) => void;
  readonly __wbg_get_globe_hideUnderground: (a: number) => number;
  readonly __wbg_set_globe_hideUnderground: (a: number, b: number) => void;
  readonly __wbg_get_globe_shouldComputeNormalFromVertex: (a: number) => number;
  readonly __wbg_set_globe_shouldComputeNormalFromVertex: (a: number, b: number) => void;
  readonly __wbg_get_globe_transparent: (a: number) => number;
  readonly __wbg_set_globe_transparent: (a: number, b: number) => void;
  readonly __wbg_get_globe_opacity: (a: number) => number;
  readonly __wbg_set_globe_opacity: (a: number, b: number) => void;
  readonly __wbg_get_globe_wireframe: (a: number) => number;
  readonly __wbg_set_globe_wireframe: (a: number, b: number) => void;
  readonly __wbg_get_globe_elevationColormap: (a: number) => [number, number];
  readonly __wbg_set_globe_elevationColormap: (a: number, b: number, c: number) => void;
  readonly globe_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly __wbg_ray_free: (a: number, b: number) => void;
  readonly __wbg_get_ray_origin: (a: number) => number;
  readonly __wbg_set_ray_origin: (a: number, b: number) => void;
  readonly __wbg_get_ray_direction: (a: number) => number;
  readonly __wbg_set_ray_direction: (a: number, b: number) => void;
  readonly ray_new: (a: number, b: number) => number;
  readonly ray_getPoint: (a: number, b: number) => number;
  readonly polylinegeometryattributes_transfer_position_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_start_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_forward_offset_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_start_normals_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_end_normal_and_texture_coordinate_normalization_x_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_right_normal_and_texture_coordinate_normalization_y_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_batch_id_size: (a: number) => number;
  readonly polylinegeometryattributes_transfer_batch_index_size: (a: number) => number;
  readonly __wbg_camerastatus_free: (a: number, b: number) => void;
  readonly __wbg_get_camerastatus_status: (a: number) => [number, number];
  readonly __wbg_set_camerastatus_status: (a: number, b: number, c: number) => void;
  readonly __wbg_cameraorientation_free: (a: number, b: number) => void;
  readonly __wbg_transform_free: (a: number, b: number) => void;
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
  readonly transform_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly __wbg_camerafrustum_free: (a: number, b: number) => void;
  readonly __wbg_get_camerafrustum_near: (a: number) => number;
  readonly __wbg_set_camerafrustum_near: (a: number, b: number) => void;
  readonly __wbg_get_camerafrustum_far: (a: number) => number;
  readonly __wbg_set_camerafrustum_far: (a: number, b: number) => void;
  readonly __wbg_get_camerafrustum_fov: (a: number) => number;
  readonly __wbg_set_camerafrustum_fov: (a: number, b: number) => void;
  readonly __wbg_get_camerafrustum_aspect_ratio: (a: number) => number;
  readonly __wbg_set_camerafrustum_aspect_ratio: (a: number, b: number) => void;
  readonly camerafrustum_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_cameracontrolupdateevent_free: (a: number, b: number) => void;
  readonly __wbg_get_cameracontrolupdateevent_autoAdjustNearFar: (a: number) => number;
  readonly __wbg_set_cameracontrolupdateevent_autoAdjustNearFar: (a: number, b: number) => void;
  readonly __wbg_get_cameracontrolupdateevent_minimumZoomDistance: (a: number) => [number, number];
  readonly __wbg_set_cameracontrolupdateevent_minimumZoomDistance: (a: number, b: number, c: number) => void;
  readonly __wbg_get_cameracontrolupdateevent_maximumZoomDistance: (a: number) => [number, number];
  readonly __wbg_set_cameracontrolupdateevent_maximumZoomDistance: (a: number, b: number, c: number) => void;
  readonly __wbg_get_cameracontrolupdateevent_spinSpeed: (a: number) => [number, number];
  readonly __wbg_set_cameracontrolupdateevent_spinSpeed: (a: number, b: number, c: number) => void;
  readonly __wbg_get_cameracontrolupdateevent_zoomSpeed: (a: number) => [number, number];
  readonly __wbg_set_cameracontrolupdateevent_zoomSpeed: (a: number, b: number, c: number) => void;
  readonly __wbg_get_cameracontrolupdateevent_spinDuration: (a: number) => number;
  readonly __wbg_set_cameracontrolupdateevent_spinDuration: (a: number, b: number) => void;
  readonly __wbg_get_cameracontrolupdateevent_zoomDuration: (a: number) => number;
  readonly __wbg_set_cameracontrolupdateevent_zoomDuration: (a: number, b: number) => void;
  readonly __wbg_get_cameracontrolupdateevent_translateDuration: (a: number) => number;
  readonly __wbg_set_cameracontrolupdateevent_translateDuration: (a: number, b: number) => void;
  readonly cameracontrolupdateevent_new: () => number;
  readonly __wbg_get_transform_tx: (a: number) => number;
  readonly __wbg_get_transform_ty: (a: number) => number;
  readonly __wbg_get_transform_tz: (a: number) => number;
  readonly __wbg_get_cameraorientation_heading: (a: number) => number;
  readonly __wbg_get_cameraorientation_pitch: (a: number) => number;
  readonly __wbg_get_cameraorientation_roll: (a: number) => number;
  readonly __wbg_get_transform_qx: (a: number) => number;
  readonly __wbg_set_transform_tx: (a: number, b: number) => void;
  readonly __wbg_set_transform_ty: (a: number, b: number) => void;
  readonly __wbg_set_transform_tz: (a: number, b: number) => void;
  readonly __wbg_set_cameraorientation_heading: (a: number, b: number) => void;
  readonly __wbg_set_cameraorientation_pitch: (a: number, b: number) => void;
  readonly __wbg_set_cameraorientation_roll: (a: number, b: number) => void;
  readonly __wbg_set_transform_qx: (a: number, b: number) => void;
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
