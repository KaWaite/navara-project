import { EntityEvent, type WorkerTaskDelegatedEvent } from "@navara/engine";
import type { WorkerPoolPromises } from "../type";
import type { BufferLoader, FeatureHandler, TileHandler, WorkerTaskHandler } from ".";
export declare function processWorkerTaskDelegatedEvent(event: WorkerTaskDelegatedEvent, bufHandler: BufferLoader, tileHandler: TileHandler, featureHandler: FeatureHandler, workerTaskHandler: WorkerTaskHandler, workerPoolPromises: WorkerPoolPromises): Promise<void>;
export declare function processWorkerTaskRemovedEvent(event: EntityEvent, workerPoolPromises: WorkerPoolPromises): Promise<void>;
