import { PosterSizes } from "./TMDB";

type CanvasSettings = {
    w: number;
    h: number;
};

type PosterSettings = {
    w: number;
    h: number;
    cols: number;
    rows: number;
    padding: number;
    resIndex: PosterSizes;
};

export interface PeacockBgSettings {
    canvas: CanvasSettings;
    poster: PosterSettings;
    startingY: number;
}
