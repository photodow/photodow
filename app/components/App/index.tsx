"use client";

import "./index.scss";

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getSiteData } from "../../utils/firebase";
import { SiteDataContext } from "../../utils/contexts";
import { SiteData } from "../../types/SiteData";
import getDataId from "../../utils/getDataId";
import resetData from "../../utils/resetData";

type Comp = {
  id?: string,
  children?: React.ReactNode,
  miniHeader?: boolean,
}

export default function App({ id, children, miniHeader }: Comp) {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    resetData();
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
