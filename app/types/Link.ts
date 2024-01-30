
export const enum LinkType {
    Contact = "Contact",
    Social = "Social",
    Website = "Website"
}

export const enum Protocol {
    Phone = "tel:",
    Email = "mailto:",
    Web = "https://"
}

export type Link = {
    id: string,
    type: LinkType,
    text: string,
    protocol: Protocol,
    value: string,
    order: number,
    active: boolean,
}