import { Experience } from "../_types/Experience";

export function sortExperiences(a: Experience, b: Experience) {
    const presentYear = new Date().getFullYear();
    let bEndYear = !b.end?.present && b.end?.year ? b.end?.year : presentYear;
    let aEndYear = !a.end?.present && a.end?.year ? a.end?.year : presentYear;
    // const bStartYear = b.start?.year || 0;
    // const aStartYear = a.start?.year || 0;

    if (a.end?.present) {
        aEndYear += 1;
    }

    if (b.end?.present) {
        bEndYear += 1;
    }

    return bEndYear - aEndYear;
    // return bStartYear - aStartYear || bEndYear - aEndYear;
}
