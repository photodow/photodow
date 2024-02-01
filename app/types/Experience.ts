import { Markdown } from "./Markdown";
import { OrgKey } from "./Organization";
import { Ref } from "./Ref";

export type ExpKey = string;

export const enum experienceType {
    Remote = "Remote",
    Hybrid = "Hybrid",
    Onsite = "Onsite"
}

export type Experience = {
    _key: ExpKey,
    orgKey: OrgKey,
    role: string,
    start: number,
    end: number | 'Present',
    location?: string,
    type?: experienceType,
    description?: Markdown,
    details?: Markdown[],
    skills?: string[],
    portfolio?: Ref[],
}