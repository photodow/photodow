import { Markdown } from "./Markdown"
import { OrgKey, Organization } from "./Organization"
import { PortfolioLayouts } from "./Portfolio"
import { Ref } from "./Ref"

export type MainItem = {
    lastUpdate: string,
    actions?: Ref[],
    skills?: string[],
    name: string,
    role: string,
    title: string,
    subtitle: string,
    description: Markdown,
    resume: string,
    _metaOverride?: {
        orgKey: OrgKey,
        org?: Organization,
        msg?: Markdown, // template
        links?: Ref[]
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