"use client";

import "./index.scss";

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getSiteData } from "../../utils/firebase";
import { SiteDataContext } from "../../utils/contexts";
import { SiteData } from "../../types/siteData";

type Comp = {
  id?: string,
  children?: React.ReactNode,
  miniHeader?: boolean,
}

export default function App({ id, children, miniHeader }: Comp) {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    getSiteData(id || new URLSearchParams(location.search).get('id')).then(d => setSiteData(d));
    // todo: handle a 404 scenario incase data doesn't load?
  }, [id]);

  return (
    <SiteDataContext.Provider value={siteData}>
        <Header mini={miniHeader} />
        {children}
    </SiteDataContext.Provider>
  );
}
