
import { IconKeys } from "../_components/Icon";

export type LinkKey = 'string';

export const enum LinkComp {
    Button = 'button',
    Text = 'text'
}

export const enum LinkKind {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    Ghost = 'ghost',
    Danger = 'danger',
    DangerTertiary = 'danger--tertiary',
    DangerGhost = 'danger--ghost',
}

export const enum LinkSize {
    Small = 'sm',
    Medium = 'md',
    Large = 'lg',
    // xLarge = 'xl',
    // '2xl'
}

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
    Root = "/",
}

export type Link = {
    _key: string,
    type: LinkType,
    text: string,
    title?: string,
    protocol: Protocol,
    value: string,
    target?: string,
    icon?: IconKeys // react element, or maybe a key of icons?
    kind?: LinkKind,
    size?: LinkSize,
    comp?: LinkComp
}

export type Links = Record<LinkKey, Link>;