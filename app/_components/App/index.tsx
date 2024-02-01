"use client";

import "./index.scss";

import Header from "../../_components/Header";
import { useEffect, useState } from "react";
import { getSiteData } from "../../_utils/firebase";
import { SiteDataContext } from "../../_utils/contexts";
import { SiteData } from "../../_types/SiteData";

type Comp = {
  id?: string,
  children?: React.ReactNode,
  miniHeader?: boolean,
}

export default function App({ id, children, miniHeader }: Comp) {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    getSiteData().then(d => setSiteData(d));
    // todo: handle a 404 scenario incase data doesn't load?
  }, [id]);

  return (
    <SiteDataContext.Provider value={siteData}>
        <Header mini={miniHeader} />
        {children}
    </SiteDataContext.Provider>
  );
}