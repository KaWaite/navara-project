import { default as default_2 } from '@navara/three';
import { FC } from 'react';
import { Layer as Layer_2 } from '@navara/three';
import { LayerDeclaration } from '@navara/three';
import { LayerDescription } from '@navara/three';
import { LayerHandle } from '@navara/three';
import { Options } from '@navara/three';
import { PropsWithChildren } from 'react';
import { RefObject } from 'react';

export declare function Layer<L = Layer_2>({ config, onReady, }: PropsWithChildren<Props<L>>): null;

declare type LH<L> = L extends LayerDeclaration ? LayerHandle<L> : Layer_2;

declare type Props<L> = {
    config: LayerDescription;
    onReady?: (handle: LH<L>) => (() => void) | void;
};

export declare const useViewContext: <CustomLayerDescriptions extends Record<string, unknown> | undefined = undefined>() => Required<ViewContextValues<CustomLayerDescriptions>>;

declare type ViewContextValues<CustomLayerDescriptions extends Record<string, unknown> | undefined = undefined> = {
    view?: default_2<CustomLayerDescriptions>;
};

export declare const ViewProvider: FC<PropsWithChildren<ViewProviderProps>>;

export declare type ViewProviderProps = {
    canvas?: HTMLCanvasElement | RefObject<HTMLCanvasElement>;
} & Options;

export { }
