"use client";

import "./index.scss";

import { Experience } from "../../_types/Experience";
import { useCallback, useContext, useEffect, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import Skills from "../Skills";
import { OrgData, transformOrgData } from "../../_utils/getOrgData";
import OrgName from "../OrgName";
import ExperienceMeta from "../ExperienceMeta";
import Slant from "../Slant";

export default function ExperienceItem({ orgKey, title, description, details, start, end, location, type, skills }: Experience) {
  const siteData = useContext(SiteDataContext);

  const [org, setOrg] = useState<OrgData | null>(null);

  const setOrgData = useCallback(() => {
    setOrg(transformOrgData(orgKey, siteData));
  }, [siteData, orgKey]);

  useEffect(() => {
    setOrgData();
  }, [setOrgData]);

  return (
    <Slant Type="section" className="jd-experience-item" id={`experience-${orgKey}`}>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-2 cds--col-md-1 cds--offset-lg-2 cds--col-lg-2">
            {renderOrgImage()}
          </div>
          <div className="cds--col-sm-4 cds--col-md-6  cds--offset-lg-0 cds--col-lg-10 jd-experience-item__container">
            {org && <p className="jd-experience-item__org">
              <OrgName className="jd-experience-item__org" {...org} />
            </p>}
            <h4 className="jd-experience-item__title">{title}</h4>
            <ExperienceMeta
              start={start}
              end={end}
              location={location}
              type={type}
            />
            <Skills items={skills} size={'sm'}
              className="jd-experience-item__skills" />
            <p className="jd-experience-item__desc">{description}</p>
            {renderDetails()}
          </div>
        </div>
      </div>
    </Slant>
  );

  function renderOrgImage () {
    if (!org?.image) {
      return null;
    }

    const img = (<img className="jd-experience-item__image" src={org.image.src} alt={org.image?.alt} />);

    return (org.link ?
      <a className="jd-experience-item__logo" href={org.link.protocol + org.link.value} target="_blank">{img}</a> :
      <div className="jd-experience-item__logo">{img}</div>);
  }

  function renderDetails () {
    return !details?.length ? null : (
      <ul className="jd-experience-item__details">
        {details.map((detail, i) => {
          return (
            <li key={`details-${detail}`}>{detail}</li>
          )}
        )}
      </ul>
    );
  }
}