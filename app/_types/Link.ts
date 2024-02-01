
import { IconKeys } from "../_components/Icon";

export type LinkKey = 'string';

export const enum LinkType {
    Contact = "contact",
    Social = "social",
    Website = "website",
    Navigation = "navigation",
}

export const enum Protocol {
    Phone = "tel:",
    Email = "mailto:",
    Web = "https://",
    Hash = "#",
}

export type Link = {
    _key: string,
    type: LinkType,
    text: string,
    protocol: Protocol,
    value: string,
    target?: string,
    icon?: IconKeys // react element, or maybe a key of icons?
}