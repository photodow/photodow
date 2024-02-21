import { OrgKey, Organization } from "../_types/Organization";
import GetRefs from "../_utils/getRefs";
import { RefList } from "../_types/Ref";
import { Link } from "../_types/Link";
import { Image } from "../_types/Image";
import { SiteData } from "../_types/SiteData";

export interface OrgData extends Organization {
    image?: Image,
    link?: Link,
    className?: string,
}

export function transformOrgData (orgKey: OrgKey, siteData: SiteData | null): OrgData | null {
    if (!siteData) {
        return null;
    }

    const data = (GetRefs([{ "_key": orgKey }], RefList.Organizations, siteData) as Organization[])[0];

    if (data.link) {
        data.link = (GetRefs([data.link], RefList.Links, siteData) as Link[])[0];
    }

    if (data.image) {
        data.image = (GetRefs([data.image], RefList.Images, siteData) as Image[])[0];
    }

    return data as OrgData;
}