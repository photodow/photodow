import urlParams from "./urlParams";

export function disableMotion (uniqueId: string) {
    const uid = urlParams().has(uniqueId);
    return uid || urlParams().has('disableMotion')
}