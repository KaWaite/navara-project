import { ReturnedConstructedTerrainMeshLike, TransferableRasterDEMDataLike, TransferableTileLike, UpsamplableTerrainGeometryLike } from "@navara/core";
import type { Promise } from "@navara/worker";
export declare function upsampleTerrainMesh(tileLike: TransferableTileLike, parentTileLike: TransferableTileLike, rasterDEMDataLike: TransferableRasterDEMDataLike, upsamplableGeometryLike: UpsamplableTerrainGeometryLike): Promise<ReturnedConstructedTerrainMeshLike>;
