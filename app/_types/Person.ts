import { Link } from "./Link";

export type PersonKey = string;

export type Person = {
    _key: PersonKey;
    name: string;
    role?: string;
    location?: string;
    link?: Link;
};

export type People = Record<PersonKey, Person>;
