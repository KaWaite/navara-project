import type { EventHandler, FeatureId } from "@navara/core";
import { type Object3D } from "three";
import type { ViewEvents } from "..";
import { Layer } from "../layer";
import { LayersManager } from "../layersManager";
import type { FeatureHandler } from ".";
export declare const handleFeatureCreatedEventByLayerId: (handler: FeatureHandler, obj: Object3D, viewEvents: EventHandler<ViewEvents>, layersManager: LayersManager, layerId: string, featureId: FeatureId) => Layer | import("..").LayerHandle<import("..").LayerDeclaration<import("..").LayerDeclarationConfig, import("..").LayerDeclarationConfigUpdate, import("../core/LayerDeclaration").BaseInstance, import("@navara/core").BaseEventMap>> | undefined;
export declare const handleFeatureUpdatedEventByLayerId: (viewEvents: EventHandler<ViewEvents>, layersManager: LayersManager, layerId: string, featureId: FeatureId, updatedAt: number) => void;
