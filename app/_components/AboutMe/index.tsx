"use client";

import "./index.scss";

import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";

export default function AboutMe() {
  const siteData = useContext(SiteDataContext);

  return (
    <article className="jd-about" data-carbon-theme="g10">
      <div className="jd-about__inner">
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-sm-4 cds--offset-md-3 cds--col-md-5 cds--col-lg-8 cds--offset-xlg-5">
              <h1 className="jd-about__name">{siteData?.main?.title}</h1>
              <h2 className="jd-about__role">{siteData?.main?.subtitle}</h2>
              <p className="jd-about__desc">{siteData?.main?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}