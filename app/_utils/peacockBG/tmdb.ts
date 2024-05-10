import {
    AssetType,
    PosterSizes,
    TMDB,
    TMDB_Config,
    TMDB_Result,
} from "../../_types/TMDB";
import localStore from "../localStore";

const numOfPages = 3;
const apiKey = "17f6c7973c2ed29ef001953add2d04d3";

const enum StorageKeys {
    TMDB_Date = "tmdb_date",
    TMDB_Results = "tmdb_results",
    TMDB_Config = "tmdb_config",
}

function getData(pageCount: number): Promise<TMDB_Result[]> {
    const key = StorageKeys.TMDB_Results;
    const storage = JSON.parse(
        localStore().getItem(key) || "null",
    ) as TMDB_Result[];

    if (storage && !isDataExpired()) {
        return Promise.resolve(storage);
    }

    const waitForIt: Promise<any>[] = [];
    let results: TMDB_Result[][] = [];

    for (let i = 1; i < pageCount; i++) {
        waitForIt.push(
            getResultsByType(AssetType.Movie, i).then((d) => results.push(d)),
        );
        waitForIt.push(
            getResultsByType(AssetType.TV, i).then((d) => results.push(d)),
        );
    }

    return Promise.all(waitForIt).then(() => {
        const flatResults = results.flat();
        localStore().setItem(key, JSON.stringify(flatResults));
        setExpirationDate();
        return flatResults;
    });
}

function getResultsByType(
    type: AssetType,
    pageNum: number,
): Promise<TMDB_Result[]> {
    const peacockProvider = [386, 387];
    const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&include_adult=true&sort_by=popularity.desc&language=en-US&page=${pageNum}&watch_region=US&with_watch_providers=${peacockProvider.join("|")}&with_networks=3353`;

    return fetch(url)
        .then((r) => r.json())
        .then((d) => d.results);
}

function fetchConfig(): Promise<TMDB_Config> {
    const key = StorageKeys.TMDB_Config;
    const storage = localStore().getItem(key);

    if (storage && !isDataExpired()) {
        return Promise.resolve(JSON.parse(storage));
    } else {
        return fetch(
            `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`,
        )
            .then((r) => r.json())
            .then((d) => {
                localStore().setItem(key, JSON.stringify(d));
                setExpirationDate();
                return d;
            });
    }
}

function isDataExpired() {
    // refresh in 7 days
    return (
        Number(localStore().getItem(StorageKeys.TMDB_Date)) <
        new Date().valueOf()
    );
}

function setExpirationDate() {
    // refresh in 7 days
    localStore().setItem(
        StorageKeys.TMDB_Date,
        `${new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 7).valueOf()}`,
    );
}

export function createImageURL(
    baseUrl: string,
    size: PosterSizes,
    path: string,
) {
    return `${baseUrl}${size}${path}`;
}

export function clearTMDB() {
    localStore().removeItem(StorageKeys.TMDB_Date);
    localStore().removeItem(StorageKeys.TMDB_Results);
    localStore().removeItem(StorageKeys.TMDB_Config);
}

export function initTMDB(n?: number): TMDB {
    return {
        config: fetchConfig(),
        results: getData(n || numOfPages),
    };
}
