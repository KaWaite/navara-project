import type { LngLat } from "@navara/core";
import { Object3D, Mesh, InstancedBufferGeometry, ShaderMaterial } from "three";
export type ArcLineConfig = {
    thickness: number;
    transparent: boolean;
    opacity: number;
    segments: number;
    srcColor: number;
    tgtColor: number;
    height: number;
    arcHeightScale: number;
    gradation: number;
    dashed: boolean;
    dashSize: number;
    gapSize: number;
    dashOffset: number;
    geometry: LngLat[];
};
export declare const DefaultArcLineConfig: ArcLineConfig;
export declare class ArcLine extends Object3D {
    private readonly _config;
    private _subMeshes;
    constructor(config?: Partial<ArcLineConfig>[]);
    private initSubMeshes;
    private createSubMesh;
    /**
     * Calculate the arc length between two points considering elevation.
     * Uses circular arc approximation for better performance.
     *        ╱‾‾‾╲
     *      ╱   h   ╲  ← sagitta (arcHeight)
     *     ╱_________╲
     *          c        ← chord (surfaceDistance)
     * Given chord length (surface distance) and sagitta (arc height),
     * we calculate the arc length using the formula:
     * - Radius: R = c²/(8h) + h/2
     * - Central angle: θ = 2 * arcsin(c/(2R))
     * - Arc length: L = R * θ
     */
    private calculateArcLength;
    private fillSingleConfigAttributes;
    private fillSingleConfigInstanceData;
    private createMaterial;
    private updateBoundingSphere;
    updateConfig(newConfig: Partial<ArcLineConfig>[]): void;
    updateMaterials(config: ArcLineConfig, subMesh: Mesh<InstancedBufferGeometry, ShaderMaterial>): void;
    onResize(width: number, height: number): void;
    dispose(): void;
}
