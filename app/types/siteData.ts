import { Experience } from "./Experience";
import { Link } from "./Link";
import { Markdown } from "./Markdown";
import { PortfolioItem, PortfolioLayouts } from "./Portfolio";
import { TestimonialKey } from "./Testimonial";
import { OrgKey } from "./organization";

export interface SiteData {
    name: string,
    role: string,
    description: Markdown,
    _override: {
        orgKey: OrgKey,
        msg: Markdown, // template
    },
    links: Link[],
    experience: Experience[],
    education: Experience[],
    portfolio: {
        type: PortfolioLayouts,
        items: PortfolioItem[],
    },
    testimonials: TestimonialKey[];
}