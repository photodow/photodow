import { Person } from "./Person";

export type TestimonialKey = string;

export type Testimonial = {
    key: TestimonialKey,
    person: Person,
    quote: string
}