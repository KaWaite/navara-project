import { LayerRegistry } from "./LayerRegistry";
import { MeshLayerDeclaration, type MeshLayerConfig } from "./MeshLayerDeclaration";
import type { ViewContext } from "./ViewContext";
export type MeshLayerConstructor<TConfig extends MeshLayerConfig = MeshLayerConfig> = new (view: ViewContext, config: TConfig) => MeshLayerDeclaration;
export declare class MeshLayerRegistry extends LayerRegistry<MeshLayerConstructor, MeshLayerDeclaration, MeshLayerConfig> {
    create(name: string, config: MeshLayerConfig): MeshLayerDeclaration;
    /**
     * Find mesh type from config (alias for findTypeFromConfig for backward compatibility)
     */
    findMeshType(config: Record<string, unknown>): string | null;
}
