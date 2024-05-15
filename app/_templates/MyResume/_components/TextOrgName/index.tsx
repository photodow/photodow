import { useCallback, useContext, useEffect, useState } from "react";
import { OrgData, transformOrgData } from "../../../../_utils/getOrgData";
import { SiteDataContext } from "../../../../_utils/contexts";
import { Link } from "../../../../_components/Link";

import "./index.scss";

type Comp = {
    _key: OrgData["_key"];
    className?: string;
};

export function TextOrgName({ className, _key }: Comp) {
    const classNames = `jd-org-name${className ? ` ${className}` : ""}`;
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
        <h4 className={classNames}>{org.name}</h4>
    ) : (
        <h4 className={classNames}>
            <Link
                href={org.link.protocol + org.link.value}
                title={org.link.title}
                target="_blank"
            >
                {org.name}
            </Link>
        </h4>
    );
}
