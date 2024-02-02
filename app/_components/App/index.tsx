"use client";

import "./index.scss";

import Header from "../../_components/Header";
import { useEffect, useState } from "react";
import { getSiteData } from "../../_utils/firebase";
import { SiteDataContext } from "../../_utils/contexts";
import { SiteData } from "../../_types/SiteData";
import { sendGTMEvent } from "@next/third-parties/google";
import getDataId from "../../_utils/getDataId";
import redirectIfR from "../../_utils/redirectIfR";
import urlParams from "../../_utils/urlParams";

type Comp = {
  id?: string,
  children?: React.ReactNode,
  miniHeader?: boolean,
}

export default function App({ id, children, miniHeader }: Comp) {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    sendGTMEvent({ 'oid': getDataId() });
    redirectIfR(urlParams().get('r'));
  }, []);

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
