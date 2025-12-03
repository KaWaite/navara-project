import { type ExecOptions, type TaskParams, type WorkerTask } from "@navara/worker";
import type { Tasks } from "../worker";
type AllTasks = WorkerTask<Tasks>;
type TaskNames = keyof AllTasks;
export declare function queueTask<T extends TaskNames>(method: T, params?: TaskParams<AllTasks, T>, options?: ExecOptions): import("@navara/worker").Promise<Awaited<ReturnType<AllTasks[T]>> extends infer T_1 ? T_1 extends Awaited<ReturnType<AllTasks[T]>> ? T_1 extends infer U ? U : T_1 : never : never, Error>;
export {};
