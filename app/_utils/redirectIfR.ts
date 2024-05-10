import { Redirect } from "../_types/Redirect";
import { getData } from "./firebase";

export default async function redirectIfR(r: string | null) {
    if (!r || typeof location === "undefined") {
        return;
    }

    const redirObj = (await getData(`redirects/${r}`).catch(
        () => null,
    )) as Redirect | null;

    if (redirObj) {
        location.href = redirObj.url;
    } else {
        location.href = "/";
    }
}
