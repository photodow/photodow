import urlParams from "./urlParams";
import localStore from "./localStore";

export default function getDataId (id?: string): string | null {
    const urlParam = urlParams().get('id');
    const storage = localStore().getItem('id');
    const storeId = storage || id || urlParam;

    if (storeId) {
        localStore().setItem('id', storeId);
    }

    return storeId;
}