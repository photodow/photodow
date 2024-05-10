import { Image } from "./Image";
import { Link } from "./Link";
import { Ref } from "./Ref";

export type OrgKey = string;

export interface Organization {
    _key: OrgKey;
    name: string;
    link?: Ref | Link;
    image?: Ref | Image;
}

export type Organizations = Record<OrgKey, Organization>;
