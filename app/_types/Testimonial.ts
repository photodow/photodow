import { Person } from "./Person";

export type TestimonialKey = string;

export type Testimonial = {
    _key: TestimonialKey;
    person: Person;
    quote: string;
};

export type Testimonials = Record<TestimonialKey, Testimonial>;
