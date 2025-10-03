import { LayerDeclaration, LayerHandle, Layer as NavaraLayer, LayerDescription } from '@navara/three';
type LH<L> = L extends LayerDeclaration ? LayerHandle<L> : NavaraLayer;
type Props<L> = {
    config: LayerDescription;
    onReady?: (handle: LH<L>) => void;
};
export declare function Layer<L = NavaraLayer>({ config, onReady }: Props<L>): null;
export {};
