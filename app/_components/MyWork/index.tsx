"use client";

import "./index.scss";

import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";

export default function MyWork() {
  const siteData = useContext(SiteDataContext);

  return (
    <article className="jd-work">
      <div style={{ height: '100vh', padding: '64px 0' }}>
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col">
              <h2 className="jd-work__title jd-body__section-title" id="my-work">My Work</h2>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}