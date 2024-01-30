export default function resetDataId () {
    if (new URLSearchParams(location.search).has('clear')) {
        localStorage.removeItem("id");
    }
}