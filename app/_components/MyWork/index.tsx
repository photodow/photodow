"use client";

import "./index.scss";

import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import PortfolioGrid from "../PortfolioGrid";

export default function MyWork() {
  const siteData = useContext(SiteDataContext);

  return (
    <article className="jd-work">
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-4 cds--offset-lg-2">
              <h2 className="jd-work__title jd-body__section-title" id="my-work">My Work</h2>
            </div>
          </div>
        </div>
        <PortfolioGrid />
    </article>
  );
}