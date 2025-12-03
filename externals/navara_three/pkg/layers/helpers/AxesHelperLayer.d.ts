import { AxesHelper } from "three";
import { MeshLayerDeclaration, type MeshLayerConfig, type ViewContext } from "../../core";
type LayerDescription = {
    axesHelper?: {
        size?: number;
    };
};
export type AxesHelperLayerConfig = MeshLayerConfig & LayerDescription;
export type AxesHelperLayerUpdate = Pick<MeshLayerConfig, "position" | "visible"> & LayerDescription;
export declare class AxesHelperLayer extends MeshLayerDeclaration<AxesHelperLayerConfig, AxesHelperLayerUpdate, AxesHelper> {
    private config;
    constructor(view: ViewContext, config: AxesHelperLayerConfig);
    createMesh(): AxesHelper;
    onUpdateConfig(updates: AxesHelperLayerUpdate): void;
    private recreate;
    protected disposeMesh(): void;
}
export {};
