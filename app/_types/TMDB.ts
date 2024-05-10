export const enum AssetType {
    Movie = "movie",
    TV = "tv",
}

export const enum PosterSizes {
    w92,
    w154,
    w185,
    w342,
    w500,
    w780,
    Original,
}

export interface TMDB_Config {
    change_keys: string[];
    images: {
        backdrop_sizes: string[]; // ['w300', 'w780', 'w1280', 'original']
        base_url: string;
        logo_sizes: string[]; // ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original']
        poster_sizes: PosterSizes[]; // ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
        profile_sizes: string[]; // ['w45', 'w185', 'h632', 'original']
        secure_base_url: string;
        still_sizes: string[]; //['w92', 'w185', 'w300', 'original']
    };
}

export interface TMDB_AssetBase {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

export interface TMDB_TV extends TMDB_AssetBase {
    first_air_date: string;
    name: string;
    origin_country: string[];
    original_name: string;
}

export interface TMDB_Movie extends TMDB_AssetBase {
    adult: boolean;
    original_title: string;
    release_date: string;
    title: string;
    video: boolean;
}

export type TMDB_Result = TMDB_Movie | TMDB_TV;

export interface TMDB_Page {
    page: number;
    total_pages: number;
    total_results: number;
    results: TMDB_Result[];
}

export interface TMDB {
    config: Promise<TMDB_Config>;
    results: Promise<TMDB_Result[]>;
}
