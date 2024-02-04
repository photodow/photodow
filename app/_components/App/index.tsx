"use client";

import "./index.scss";

import Header from "../../_components/Header";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSiteData } from "../../_utils/firebase";
import { SiteDataContext } from "../../_utils/contexts";
import { SiteData } from "../../_types/SiteData";
import { sendGTMEvent } from "@next/third-parties/google";
import getDataId from "../../_utils/getDataId";
import redirectIfR from "../../_utils/redirectIfR";
import urlParams from "../../_utils/urlParams";

// get meta data
// set meta data
// then redirect or render page.
// without flash is preferred in any instance

type Comp = {
  id?: string,
  children?: React.ReactNode,
  miniHeader?: boolean,
}

export default function App({ children, miniHeader }: Comp) {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  const setR = useCallback(() => setRedirect(urlParams().get('r')), [])

  useEffect(() => {
    sendGTMEvent({ 'oid': getDataId() });

    setR();
    redirectIfR(redirect);

    if (!redirect) {
      getSiteData().then(d => setSiteData(d));
    }
  }, [redirect, setR]);

  return (
    <SiteDataContext.Provider value={siteData}>
      <Header mini={miniHeader} redirect={!!redirect} />
      <main>
        {children}
      </main>
    </SiteDataContext.Provider>
  );
}
