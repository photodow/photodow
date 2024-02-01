export default function resetData () {
    if (typeof window === "undefined") {
        return;
    }

    if (new URLSearchParams(location.search).has('clear')) {
        localStorage.removeItem("id");
        localStorage.removeItem("siteData");
    }
}