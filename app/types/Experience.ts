import { Markdown } from "./Markdown";
import { PortfolioRef } from "./Portfolio";
import { OrgKey } from "./organization";

export const enum experienceType {
    Remote = "Remote",
    Hybrid = "Hybrid",
    Onsite = "Onsite"
}

export type Experience = {
    orgKey: OrgKey,
    location: string,
    role: string,
    type: experienceType,
    start: number,
    end: number | 'Present',
    description: Markdown,
    details: Markdown[],
    skills: string[],
    portfolio: PortfolioRef[],
}