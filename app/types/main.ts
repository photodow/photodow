import { Markdown } from "./Markdown"
import { OrgKey } from "./Organization"
import { PortfolioLayouts } from "./Portfolio"
import { Ref } from "./Ref"

export type MainItem = {
    lastUpdate: string,
    name: string,
    role: string,
    description: Markdown,
    _metaOverride?: {
        orgKey: OrgKey,
        msg: Markdown, // template
        links: Ref[]
    },
    social: Ref[],
    navigation: Ref[],
    contact: Ref[],
    experience: Ref[],
    education: Ref[],
    portfolio: {
        type: PortfolioLayouts,
        items: Ref[],
    },
    testimonials: Ref[],
}