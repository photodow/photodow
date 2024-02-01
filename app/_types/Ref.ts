import { ExpKey, Experience } from "./Experience";
import { Image, ImageKey } from "./Image";
import { Link, LinkKey } from "./Link";
import { Person, PersonKey } from "./Person";
import { PortfolioItem, PortfolioKey } from "./Portfolio";
import { Testimonial, TestimonialKey } from "./Testimonial";
import { OrgKey, Organization } from "./Organization";

export type KeyRef = OrgKey | ExpKey | ImageKey | LinkKey | PortfolioKey | PersonKey | TestimonialKey;

export type Overrides = Organization | Experience | Image | Link | PortfolioItem | Person | Testimonial;

export const enum RefList {
    Organizations = 'organizations',
    Experiences = 'experiences',
    Images = 'images',
    Links = 'links',
    Portfolio = 'portfolio',
    People = 'people',
    Testimonials = 'testimonials',
}

export type Ref = {
    _key: KeyRef,
    _override?: Overrides,
    active?: boolean,
    order?: number,
}