import { Link } from "./Link";

export type OrgKey = string;

export type Organization = {
    orgKey: OrgKey,
    name: string,
    link: Link
}