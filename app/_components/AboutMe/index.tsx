"use client";

import "./index.scss";

import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";

export default function AboutMe() {
  const siteData = useContext(SiteDataContext);

  const title = siteData?.main?.title;
  const subtitle = siteData?.main?.subtitle;
  const description = siteData?.main?.description;

  return (
    <article className="jd-about" data-carbon-theme="g10" id="about">
      <div className="jd-about__inner">
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-sm-4 cds--offset-md-3 cds--col-md-5 cds--col-lg-8 cds--offset-xlg-5">
              {title && <h1 className="jd-about__name">{siteData?.main?.title}</h1>}
              {subtitle && <h2 className="jd-about__role">{siteData?.main?.subtitle}</h2>}
              {description && <p className="jd-about__desc">{siteData?.main?.description}</p>}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}