import { MeshLayerDeclaration, type MeshLayerConfig, ViewContext, type MeshLayerUpdate } from "../../core";
import { Stars, type StarsOptions } from "../../mesh";
type LayerDescription = {
    stars?: Partial<StarsOptions> & {
        assetsUrl?: string;
    };
};
export type StarsLayerConfig = MeshLayerConfig & LayerDescription;
export type StarsLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class StarsLayer extends MeshLayerDeclaration<StarsLayerConfig, StarsLayerUpdate, Stars> {
    private config;
    private _stars;
    constructor(view: ViewContext, config: StarsLayerConfig);
    getPassKey(): "opaque" | "transparent";
    createMesh(): Stars;
    onUpdateConfig(updates: StarsLayerUpdate): void;
    update(_time: number): void;
    protected disposeMesh(): void;
    getStars(): Stars | null;
}
export {};
