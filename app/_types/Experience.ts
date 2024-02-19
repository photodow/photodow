import { Markdown } from "./Markdown";
import { OrgKey } from "./Organization";
import { Ref } from "./Ref";

export type ExpKey = string;

export const enum experienceType {
    Remote = "Remote",
    Hybrid = "Hybrid",
    Onsite = "On-Site"
}

export type Experience = {
    _key: ExpKey,
    orgKey: OrgKey,
    title: string,
    start: number,
    end: number | 'Present',
    location?: string,
    credential?: string,
    type?: experienceType,
    description?: Markdown,
    details?: Markdown[],
    skills?: string[],
    portfolio?: Ref[],
}

export type Experiences = Record<ExpKey, Experience>;