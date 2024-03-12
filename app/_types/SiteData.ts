import { Portfolio } from "./Portfolio";
import { Organizations } from "./Organization";
import { Experiences } from "./Experience";
import { People } from "./Person";
import { Images } from "./Image";
import { Links } from "./Link";
import { Testimonials } from "./Testimonial";
import { MainItem } from "./Main";
import { Redirects } from "./Redirect";

export type SiteData = {
    lastUpdate?: number | string,
    experiences: Experiences,
    // educations: Experience[],
    images: Images,
    links: Links,
    organizations: Organizations,
    people: People,
    portfolio: Portfolio,
    testimonials: Testimonials,
    redirects?: Redirects,
    main: MainItem
}