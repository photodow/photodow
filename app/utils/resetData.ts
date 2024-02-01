export default function resetData () {
    if (!window) {
        return;
    }

    if (new URLSearchParams(location.search).has('clear')) {
        localStorage.removeItem("id");
        localStorage.removeItem("siteData");
    }
}