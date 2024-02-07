import { ExpKey, Experience, Experiences } from "./Experience";
import { Image, ImageKey, Images } from "./Image";
import { Link, LinkKey, Links } from "./Link";
import { People, Person, PersonKey } from "./Person";
import { Portfolio, PortfolioItem, PortfolioKey } from "./Portfolio";
import { Testimonial, TestimonialKey, Testimonials } from "./Testimonial";
import { OrgKey, Organization, Organizations } from "./Organization";
import { Redirect, RedirectKey, Redirects } from "./Redirect";

export type KeyRef = OrgKey | ExpKey | ImageKey | LinkKey | PortfolioKey | PersonKey | TestimonialKey | RedirectKey;

export type Overrides = Organization | Experience | Image | Link | PortfolioItem | Person | Testimonial | Redirect;

export type RefCollections = Record<string, Overrides>;

export const enum RefList {
    Organizations = 'organizations',
    Experiences = 'experiences',
    Images = 'images',
    Links = 'links',
    Portfolio = 'portfolio',
    People = 'people',
    Testimonials = 'testimonials',
    Redirects = 'redirects',
}

export type Ref = {
    _key: KeyRef,
    _override?: Overrides,
    active?: boolean,
    order?: number,
}