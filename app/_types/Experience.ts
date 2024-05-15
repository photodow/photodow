import { Markdown } from "./Markdown";
import { OrgKey } from "./Organization";
import { Ref } from "./Ref";

export type ExpKey = string;

export const enum experienceType {
    Remote = "Remote",
    Hybrid = "Hybrid",
    Onsite = "On-Site",
}

export type StartEndDate = {
    year: number;
    month: string;
    present: boolean;
};

export type Experience = {
    _key: ExpKey;
    orgKey: OrgKey;
    title: string;
    start?: StartEndDate;
    end?: StartEndDate;
    location?: string;
    credential?: string;
    type?: experienceType;
    description?: Markdown;
    details?: Markdown[];
    skills?: string[];
    portfolio?: Ref[];
};

export type Experiences = Record<ExpKey, Experience>;
