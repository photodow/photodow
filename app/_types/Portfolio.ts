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

export type PortfolioCard = {
    _key: PortfolioKey,
    image: Ref,
    title: string,
    description?: Markdown,
    actions?: Ref[],
}

export type PortfolioItem = {
    _key: PortfolioKey,
    orgKey: OrgKey,
    card: PortfolioCard,
}

export type Portfolio = Record<PortfolioKey, PortfolioItem>;