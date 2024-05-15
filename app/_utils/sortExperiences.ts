import { Experience } from "../_types/Experience";

export function sortExperiences(a: Experience, b: Experience) {
    const presentYear = new Date().getFullYear();
    const bEndYear = !b.end?.present && b.end?.year ? b.end?.year : presentYear;
    const aEndYear = !a.end?.present && a.end?.year ? a.end?.year : presentYear;
    // const bStartYear = b.start?.year || 0;
    // const aStartYear = a.start?.year || 0;

    return bEndYear - aEndYear;
    // return bStartYear - aStartYear || bEndYear - aEndYear;
}
