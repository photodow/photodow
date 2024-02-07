import { Link } from "./Link";

export type OrgKey = string;

export type Organization = {
    _key: OrgKey,
    name: string,
    link?: Link
}

export type Organizations = Record<OrgKey, Organization>;