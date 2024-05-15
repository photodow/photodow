import getDataId from "./getDataId";

export function addUrlId(url: string) {
    const id = getDataId()?.replace(/-?test-?/g, "");
    return url + (id ? `?id=${id}` : "");
}
