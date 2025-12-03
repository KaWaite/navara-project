import Stats from "stats.js";
type Renderer = {
    beginRender: () => void;
    endRender: () => {
        calls?: number;
        triangles?: number;
        memGeometries?: number;
    };
};
export declare class RendererStats {
    stats: Stats;
    renderer: Renderer;
    drawCalls: Stats.Panel;
    numTriangles: Stats.Panel;
    memGeometries: Stats.Panel;
    constructor(r: Renderer);
    begin(): void;
    end(): void;
    get dom(): HTMLDivElement;
}
export {};
