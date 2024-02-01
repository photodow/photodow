import { PortfolioItem } from "./Portfolio";
import { Organization } from "./Organization";
import { Experience } from "./Experience";
import { Person } from "./Person";
import { Image } from "./Image";
import { Link } from "./Link";
import { Testimonial } from "./Testimonial";
import { MainItem } from "./main";

export type SiteData = {
    experiences: Experience[],
    // educations: Experience[],
    images: Image[],
    links: Link[],
    organizations: Organization[],
    people: Person[],
    portfolio: PortfolioItem[],
    testimonials: Testimonial[],
    main: MainItem
}