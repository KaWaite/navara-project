import { ConstructedPolygonGeometryLike, ExtentRadianF32Like, PolygonMaterialLike, TransferablePolygonBatchedFeatureLike } from "@navara/core";
import type { Promise } from "@navara/worker";
export declare function constructPolygonBatchedFeature(transferableBatchedFeatureLike: TransferablePolygonBatchedFeatureLike, materialLike: PolygonMaterialLike, flat: boolean, tileExtent: ExtentRadianF32Like | undefined): Promise<ConstructedPolygonGeometryLike | undefined>;
