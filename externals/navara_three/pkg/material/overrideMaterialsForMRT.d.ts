import { ShaderMaterial } from "three";
import { LineMaterial } from "three-stdlib";
declare const SETUP: unique symbol;
declare module "three" {
    interface ShaderLibShader {
        [SETUP]?: boolean;
    }
    interface ShaderMaterial {
        [SETUP]?: boolean;
    }
}
export declare function overrideMaterialsForMRT(): void;
export declare function overrideShaderMaterialForMRT(material: ShaderMaterial, normalVariableName?: string): void;
export declare function overrideLineMaterialForMRT(material: LineMaterial): void;
export {};
