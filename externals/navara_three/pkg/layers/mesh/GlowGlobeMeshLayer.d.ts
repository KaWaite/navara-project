import { Mesh, ShaderMaterial, SphereGeometry } from "three";
import { MeshLayerDeclaration, type MeshLayerConfig, type ViewContext } from "../../core";
import type { MeshLayerUpdate } from "../../core/MeshLayerDeclaration";
type LayerDescription = {
    /**
     * Configuration for the glow globe mesh layer.
     *
     * Implements a Fresnel-based glow effect that creates a halo
     * around a spherical body. The glow intensity varies based on the viewing angle,
     * with maximum intensity at the center and minimum at the edges.
     */
    glowGlobe?: {
        /**
         * The scale factor for the glow globe radius relative to the WGS84 semi-major axis.
         *
         * This value is multiplied by the WGS84 semi-major axis (Earth's equatorial radius)
         * to determine the final glow globe radius. Values greater than 1.0 create a glow
         * globe larger than Earth, which is necessary for the atmospheric effect to be visible
         * around the surface. The globe also respects Earth's flattening factor to maintain
         * an oblate spheroid shape matching the planet.
         *
         * @default 1.2 (120% of Earth's equatorial radius: ~7,653,764 meters)
         * @example 1.1 - Glow globe 10% larger than Earth (typical atmospheric effect)
         * @example 1.05 - Subtle glow close to the surface
         * @example 1.2 - Extended atmospheric glow
         */
        radiusScale?: number;
        /**
         * The coefficient controlling the glow threshold in the Fresnel calculation.
         *
         * This value is subtracted from the facing ratio (dot product of surface normal
         * and view direction) to control where the glow begins. Higher values create
         * a more pronounced glow that extends further toward the edges of the globe.
         *
         * Formula: `intensity = pow(max(coefficient - facing_ratio, 0.0), exponent)`
         *
         * @default 0.5
         * @range Typically 0.0 to 1.0, though values outside this range are valid
         */
        coefficient?: number;
        /**
         * The exponent controlling the glow falloff intensity in the Fresnel calculation.
         *
         * Higher values create a sharper, more concentrated glow at the center.
         * Lower values create a softer, more diffuse glow that extends outward.
         * This parameter controls how quickly the glow intensity decreases from
         * the center toward the edges of the globe.
         *
         * Formula: `intensity = pow(max(coefficient - facing_ratio, 0.0), exponent)`
         *
         * @default 5.0
         * @range Typically 1.0 to 10.0, though higher values are valid
         */
        exponent?: number;
        /**
         * The color of the glow effect as a hexadecimal value.
         *
         * Accepts standard hex color formats (e.g., 0x8cf3ff for light cyan).
         * The RGB components determine the hue of the glow, which is then
         * modulated by the calculated Fresnel intensity and the opacity value.
         *
         * @default 0x8cf3ff - Light cyan
         * @example 0xff0000 - Red glow
         * @example 0x00ff00 - Green glow
         * @example 0x0080ff - Blue glow
         */
        glowColor?: number;
        /**
         * The opacity/alpha channel of the glow effect.
         *
         * Controls the overall transparency of the glow layer. This value is used
         * as the alpha component in the shader's color uniform. Lower values create
         * a more subtle, transparent glow, while higher values make it more opaque.
         *
         * @default 0.5
         * @range 0.0 (fully transparent) to 1.0 (fully opaque)
         */
        opacity?: number;
    };
};
export declare const DEFAULT_GLOW_GLOBE_OPTIONS: Required<NonNullable<LayerDescription["glowGlobe"]>>;
export type GlowGlobeMeshLayerConfig = MeshLayerConfig & LayerDescription;
export type GlowGlobeMeshLayerUpdate = MeshLayerUpdate & LayerDescription;
export declare class GlowGlobeMeshLayer extends MeshLayerDeclaration<GlowGlobeMeshLayerConfig, GlowGlobeMeshLayerUpdate, Mesh<SphereGeometry, ShaderMaterial>> {
    private config;
    constructor(view: ViewContext, config: GlowGlobeMeshLayerConfig);
    createMesh(): Mesh<SphereGeometry, ShaderMaterial, import("three").Object3DEventMap>;
    onUpdateConfig(updates: GlowGlobeMeshLayerUpdate): void;
    protected disposeMesh(): void;
}
export {};
