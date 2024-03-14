import localStore from "./localStore";
import { clearTMDB } from "./peacockBG/tmdb";
import { updateURL } from "./updateURL";
import urlParams from "./urlParams";

export default function resetData () {
    if (urlParams().has('clear') || urlParams().has('_clear')) {
        localStore().removeItem("id");
        localStore().removeItem("siteData");
        clearTMDB();

        if (urlParams().has('clear')) {
            let url = new URL(location.toString());
            url.searchParams.delete('clear');
            updateURL(url);
        }
    }
}