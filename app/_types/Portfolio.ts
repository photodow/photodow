import { Image } from "./Image";
import { Markdown } from "./Markdown";
import { OrgKey } from "./Organization";
import { Ref } from "./Ref";

export type PortfolioKey = string;

export const enum PortfolioLayouts {
    Grid = "Grid",
}

export const enum PortfolioSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
}

export type PortfolioItem = {
    _key: PortfolioKey,
    orgKey: OrgKey,
    title: string,
    cover?: Image,
    description?: Markdown,
    details?: Markdown[],
    sections?: PortfolioSection[],
    actions?: Ref[],
}

export type PortfolioSection = {
    // add a key reference?
    title?: string,
    description?: string,
    cover?: Image,
    images?: Ref[],
    actions?: Ref[],
}