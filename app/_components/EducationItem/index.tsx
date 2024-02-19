"use client";

import "./index.scss";

import { Experience } from "../../_types/Experience";
import OrgName from "../OrgName";
import { useCallback, useContext, useEffect, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import { OrgData, transformOrgData } from "../../_utils/getOrgData";
import ExperienceMeta from "../ExperienceMeta";

export default function EducationItem({ orgKey, title, start, end, credential }: Experience) {
  const siteData = useContext(SiteDataContext);

  const [org, setOrg] = useState<OrgData | null>(null);

  const setOrgData = useCallback(() => {
    setOrg(transformOrgData(orgKey, siteData));
  }, [siteData, orgKey]);

  useEffect(() => {
    setOrgData();
  }, [setOrgData]);

  return (
    <div id={orgKey} className="jd-education-item">
      <div className="jd-education-item__content">
        <OrgName {...org} className="jd-education-item__org" />
        <h4 className="jd-education-item__title">{title}</h4>
        <ExperienceMeta
          className="jd-education-item__meta"
          credential={credential}
          start={start} end={end} />
      </div>
    </div>
  );
}