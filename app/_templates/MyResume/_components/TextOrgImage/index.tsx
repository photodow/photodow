import { useCallback, useContext, useEffect, useState } from "react";
import { OrgData, transformOrgData } from "../../../../_utils/getOrgData";
import { SiteDataContext } from "../../../../_utils/contexts";
import { Link } from "../../../../_components/Link";

import "./index.scss";

type Comp = {
    _key: OrgData["_key"];
};

export function TextOrgImage({ _key }: Comp) {
    const siteData = useContext(SiteDataContext);
    const [org, setOrg] = useState<OrgData | null>(null);

    const setOrgData = useCallback(() => {
        setOrg(transformOrgData(_key, siteData));
    }, [siteData, _key]);

    useEffect(() => {
        setOrgData();
    }, [setOrgData]);

    if (!org) {
        return;
    }

    return !org.link ? (
        <span>{orgImage(org.image, _key)}</span>
    ) : (
        <Link
            href={org.link.protocol + org.link.value}
            title={org.link.title}
            target="_blank"
            className={`jd-org-image ${_key}`}
        >
            <span>{orgImage(org.image, _key)}</span>
        </Link>
    );
}

function orgImage(image: OrgData["image"], _key: string) {
    return !image ? null : <img src={image.src} alt={image.alt} />;
}
