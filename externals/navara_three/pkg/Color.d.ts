import { Color as CoreColor } from "@navara/core";
import { Color as ThreeColor } from "three";
/**
 * Class representing a color.
 * This class assumes that the specified color represents the sRGB color space.
 *
 * ```
 * const red = new Color().setRGB(1.0, 0.0, 0.0);
 * const green = new Color().setHex(0x00ff00);
 * const blue = new Color().setStyle("#0000ff");
 * ```
 */
export declare class Color implements CoreColor {
    #private;
    /**
     * Sets RGB. The range is: 0.0 ~ 1.0
     */
    setRGB(r: number, g: number, b: number): this;
    setRGBLinear(r: number, g: number, b: number): this;
    /**
     * Sets hex color: 0xffffff
     */
    setHex(hex: number): this;
    /**
     * Sets this color from a CSS context style string.
     */
    setStyle(style: string): this;
    copy(color: Color): this;
    clone(): this;
    toArray(): [r: number, g: number, b: number];
    srgb(): this;
    get raw(): ThreeColor;
}
