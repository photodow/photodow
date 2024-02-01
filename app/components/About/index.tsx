"use client";

import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import "./index.scss";

export default function About() {
  const siteData = useContext(SiteDataContext);

  return siteData && (
    <div className="cds--grid">
      <div className="cds--row">
        <div className="cds--col" style={{height: '1000px'}}>
          <p>Hi there, my name is {siteData?.main?.name}, and I am a {siteData?.main?.role} 👋</p>
        </div>
      </div>
    </div>
  );
}