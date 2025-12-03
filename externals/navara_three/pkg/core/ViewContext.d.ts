import type { EventHandler, Globe } from "@navara/core";
import type { Material, PerspectiveCamera } from "three";
import type { ViewEvents } from "..";
import type { Atmosphere } from "../atmosphere";
import type { LayersManager } from "../layersManager";
import type { RenderPassOrchestrator } from "../orchestrators";
import type { Scenes } from "../scene";
import type { DrapedMaterialCache, MeshCache } from "../type";
type Private = {
    meshes: MeshCache;
    drapedMaterials: DrapedMaterialCache;
};
export declare class ViewContext {
    scenes: Scenes;
    camera: PerspectiveCamera;
    atmosphere: Atmosphere;
    layersManager: LayersManager;
    renderPassOrchestrator: RenderPassOrchestrator;
    _privates: Private;
    private eventHandler?;
    globe?: Globe;
    constructor(scenes: Scenes, camera: PerspectiveCamera, atmosphere: Atmosphere, layersManager: LayersManager, renderPassOrchestrator: RenderPassOrchestrator, _privates: Private, eventHandler?: EventHandler<ViewEvents>);
    setGlobe(globe: Globe): void;
    setCamera(camera: PerspectiveCamera): void;
    emit(event: "_csmMounted" | "_csmUnmounted", material: Material): void;
}
export {};
