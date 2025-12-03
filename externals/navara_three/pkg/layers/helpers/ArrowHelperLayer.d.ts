import type { XYZ } from "@navara/core";
import { ArrowHelper } from "three";
import { MeshLayerDeclaration, type MeshLayerConfig, type ViewContext } from "../../core";
type LayerDescription = {
    arrowHelper?: {
        direction: XYZ;
        origin?: XYZ;
        length?: number;
        color?: number;
        headLength?: number;
        headWidth?: number;
    };
};
export type ArrowHelperLayerConfig = MeshLayerConfig & LayerDescription;
export type ArrowHelperLayerUpdate = Pick<MeshLayerConfig, "position" | "visible"> & LayerDescription;
export declare class ArrowHelperLayer extends MeshLayerDeclaration<ArrowHelperLayerConfig, ArrowHelperLayerUpdate, ArrowHelper> {
    private config;
    constructor(view: ViewContext, config: ArrowHelperLayerConfig);
    createMesh(): ArrowHelper;
    onUpdateConfig(updates: ArrowHelperLayerUpdate): void;
    protected disposeMesh(): void;
}
export {};
