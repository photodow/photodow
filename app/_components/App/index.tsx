"use client";

import "./index.scss";

import Header from "../../_components/Header";
import { useCallback, useEffect, useState } from "react";
import { getSiteData } from "../../_utils/firebase";
import { SiteDataContext } from "../../_utils/contexts";
import { SiteData } from "../../_types/SiteData";
import { sendGTMEvent } from "@next/third-parties/google";
import getDataId from "../../_utils/getDataId";
import redirectIfR from "../../_utils/redirectIfR";
import urlParams from "../../_utils/urlParams";
import { createFadeInObserver } from "../../_utils/fadeIn";

type Comp = {
  id?: string,
  children?: React.ReactNode,
  miniHeader?: boolean,
}

export default function App({ children, miniHeader }: Comp) {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [editableContent, setEditableContent] = useState<boolean>(false);

  const setR = useCallback(() => setRedirect(urlParams().get('r')), []);
  const setToEditContent = useCallback(() => setEditableContent(Boolean(urlParams().get('edit'))), []);

  useEffect(() => {
    sendGTMEvent({ 'oid': getDataId() });

    setR();
    redirectIfR(redirect);

    if (!redirect) {
      getSiteData().then(d => setSiteData(d));
    }

    createFadeInObserver();
    setToEditContent();
  }, [redirect, setR, setToEditContent]);

  return (
    <SiteDataContext.Provider value={siteData}>
      <Header mini={miniHeader} redirect={!!redirect} />
      <main className="jd-main" contentEditable={editableContent}>
        {children}
      </main>
    </SiteDataContext.Provider>
  );
}
