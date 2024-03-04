"use client";

import "./index.scss";

import Header from "../../_components/Header";
import { useCallback, useEffect, useState } from "react";
import { initStateDB } from "../../_utils/firebase";
import { SiteDataContext } from "../../_utils/contexts";
import { SiteData } from "../../_types/SiteData";
import redirectIfR from "../../_utils/redirectIfR";
import urlParams from "../../_utils/urlParams";
import { createFadeInObserver } from "../../_utils/fadeIn";
import { clientMetaData } from "../../_utils/metadata";
import Slant from "../Slant";

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

    setR();
    redirectIfR(redirect);

    if (!redirect) {
      initStateDB(setSiteData);
    }

    createFadeInObserver();
    setToEditContent();

    clientMetaData(siteData?.main?.role);
  }, [redirect, setR, setToEditContent, siteData]);

  return (
    <SiteDataContext.Provider value={siteData}>
      <Header mini={miniHeader} redirect={!!redirect} contentEditable={editableContent} />
      <main className="jd-main" contentEditable={editableContent}>
        {children}
      </main>
      <Slant Type="footer" />
    </SiteDataContext.Provider>
  );
}
