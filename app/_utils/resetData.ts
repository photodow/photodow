import localStore from "./localStore";
import urlParams from "./urlParams";

export default function resetData () {
    if (urlParams().has('clear')) {
        localStore().removeItem("id");
        localStore().removeItem("siteData");
    }
}