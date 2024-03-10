import localStore from "./localStore";
import { clearTMDB } from "./peacockBG/tmdb";
import urlParams from "./urlParams";

export default function resetData () {
    if (urlParams().has('clear')) {
        localStore().removeItem("id");
        localStore().removeItem("siteData");
        localStore().removeItem("c");
        clearTMDB();

        let url = new URL(location.toString());
        url.searchParams.delete('clear');
        history.replaceState({}, "", url);
    }
}