import { Image } from "./Image";
import { Link } from "./Link";
import { Markdown } from "./Markdown";
import { OrgKey } from "./organization";

export type PortfolioKey = string;

export const enum PortfolioLayouts {
    Grid = "Grid",
}

export const enum PortfolioSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
}

export type PortfolioRef = {
    key: PortfolioKey,
    order: number,
    active: boolean,
    size: PortfolioSize,
    _override: Partial<PortfolioItem>
}

export type PortfolioItem = {
    key: PortfolioKey,
    title: string,
    description: Markdown,
    orgKey: OrgKey,
    details: Markdown[],
    cover: Image,
    sections: PortfolioSection[],
    actions: Link[],
}

export type PortfolioSection = {
    title: string,
    description: string,
    cover: Image,
    images: Image[],
    actions: Link[],
}