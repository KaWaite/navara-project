import { ConstructedPolylineGeometryLike, PolylineMaterialLike, TransferablePolylineBatchedFeatureLike } from "@navara/core";
import type { Promise } from "@navara/worker";
export declare function constructPolylineBatchedFeature(transferableBatchedFeatureLike: TransferablePolylineBatchedFeatureLike, materialLike: PolylineMaterialLike, flat: boolean): Promise<ConstructedPolylineGeometryLike | undefined>;
