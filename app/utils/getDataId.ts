export default function getDataId (id?: string) {
    // const path = location.pathname.substring(1);
    if (typeof window === "undefined") {
        return;
    }
    
    const urlParam = new URLSearchParams(location.search).get('id');
    const storage = localStorage.getItem('id');
    const storeId = storage || id || urlParam;

    if (storeId) {
        localStorage.setItem('id', storeId);
    }

    return storeId;
}