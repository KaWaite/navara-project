import { default as ThreeView, Options } from '@navara/three';
import { FC, PropsWithChildren, RefObject } from 'react';
type ViewContextValues<CustomLayerDescriptions extends Record<string, unknown> | undefined = undefined> = {
    view?: ThreeView<CustomLayerDescriptions>;
};
export declare const useViewContext: <CustomLayerDescriptions extends Record<string, unknown> | undefined = undefined>() => Required<ViewContextValues<CustomLayerDescriptions>>;
export type ViewProviderProps = {
    canvas?: HTMLCanvasElement | RefObject<HTMLCanvasElement>;
} & Options;
export declare const ViewProvider: FC<PropsWithChildren<ViewProviderProps>>;
export {};
