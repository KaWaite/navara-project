import type { LngLatHeight } from "@navara/core";
import { Object3D } from "three";
export type SmoothLineConfig = {
    tension: number;
    closed: boolean;
    segments: number;
    lineWidth: number;
    dashed: boolean;
    dashSize: number;
    dashOffset: number;
    gapSize: number;
    color: number;
    showPoints: boolean;
    pointSize: number;
    pointColor: number;
    points: LngLatHeight[];
};
export declare const DefaultSmoothLineConfig: SmoothLineConfig;
export declare class SmoothLine extends Object3D {
    private readonly _config;
    private _lineMeshes;
    private _pointsMeshes;
    private _pointsData;
    constructor(config?: Partial<SmoothLineConfig>[]);
    private updatePointsData;
    private initSubMeshes;
    private createLinePosAttr;
    private createLineMesh;
    private createSpherePointMesh;
    updateConfig(newConfig: Partial<SmoothLineConfig>[]): void;
    updateLineCfg(cfg: Partial<SmoothLineConfig>, i: number): void;
    updatePointsCfg(cfg: Partial<SmoothLineConfig>, i: number): void;
    dispose(): void;
    onResize(width: number, height: number): void;
}
