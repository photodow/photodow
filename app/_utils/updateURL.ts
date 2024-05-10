export function updateURL(url: string | URL, pushState?: boolean) {
    // const state = history.state;
    const state = {};

    if (pushState) {
        history.pushState(state, "", url);
    } else {
        history.replaceState(state, "", url);
    }
}
