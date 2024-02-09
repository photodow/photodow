"use client";

import "./index.scss";

import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import LinksByRef from "../LinksByRef";
import Skills from "../Skills";

export default function AboutMe() {
  const siteData = useContext(SiteDataContext);

  const title = siteData?.main.title;
  const subtitle = siteData?.main.subtitle;
  const description = siteData?.main.description;
  const actions = siteData?.main.actions;
  const skills = siteData?.main.skills;

  return (
    <article className="jd-about" data-carbon-theme="g10" id="about">
      <div className="jd-about__inner">
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-sm-4 cds--offset-md-3 cds--col-md-5 cds--col-lg-8 cds--offset-xlg-5">
              {title && <h1 className="jd-about__name jd-fade-in">{title}</h1>}
              {subtitle && <h2 className="jd-about__role jd-fade-in">{subtitle}</h2>}
              {skills && <Skills items={skills} color="warm-gray" className="jd-fade-in" />}
              {description && <p className="jd-about__desc jd-fade-in">{description}</p>}
              {actions && <LinksByRef className="jd-fade-in" refs={actions} text={true} icon={true} />}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}