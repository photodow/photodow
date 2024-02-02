
type UrlParams = {
    get: (name: string) => string | null,
    has: (name: string) => boolean,
}

export default function urlParams (): UrlParams {
    if (typeof location === 'undefined') {
        return {
            get: () => null,
            has: () => false,
        };
    }

    return new URLSearchParams(location.search);
}