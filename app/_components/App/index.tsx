"use client";

import "./index.scss";

import Header, { HeaderSize } from "../../_components/Header";
import { useCallback, useEffect, useState } from "react";
import { initStateDB } from "../../_utils/firebase";
import { SiteDataContext } from "../../_utils/contexts";
import { SiteData } from "../../_types/SiteData";
import redirectIfR from "../../_utils/redirectIfR";
import urlParams from "../../_utils/urlParams";
import { initObservers } from "../../_utils/observers";
import { clientMetaData } from "../../_utils/metadata";
import Slant from "../Slant";
import { startAnimation } from "../../_utils/animation";
import { CarbonTheme } from "../../_types/carbon";

type Comp = {
  id?: string,
  children?: React.ReactNode,
  miniHeader?: boolean,
  theme?: CarbonTheme,
  headerSize?: HeaderSize,
}

export default function App({ headerSize, theme = CarbonTheme.g90, children }: Comp) {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [editableContent, setEditableContent] = useState<boolean>(false);

  const setR = useCallback(() => setRedirect(urlParams().get('r')), []);
  const setToEditContent = useCallback(() => setEditableContent(Boolean(urlParams().get('edit'))), []);

  useEffect(() => {
    startAnimation();
  }, []);

  useEffect(() => {

    setR();
    redirectIfR(redirect);

    if (!redirect) {
      initStateDB(setSiteData);
    }

    initObservers();
    setToEditContent();

    clientMetaData(siteData?.main?.role);
  }, [redirect, setR, setToEditContent, siteData]);

  return (
    <SiteDataContext.Provider value={siteData}>
      <Header size={headerSize} redirect={!!redirect} contentEditable={editableContent} />
      <main className="jd-main" contentEditable={editableContent} data-carbon-theme={theme}>
        {children}
      </main>
      <Slant Type="footer" />
    </SiteDataContext.Provider>
  );
}
