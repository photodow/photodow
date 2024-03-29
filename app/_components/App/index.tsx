"use client";

import "./index.scss";

import Header from "../../_components/Header";
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
import { HeaderSize } from "../../_types/Header";

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
  const [initialized, setInitialized] = useState<boolean>(false);

  const setR = useCallback((r: string | null) => setRedirect(r), []);
  const setToEditContent = useCallback(() => setEditableContent(urlParams().has('edit')), []);

  useEffect(() => {
    setR(urlParams().get('r'));
    redirectIfR(redirect);

    if (initialized) {
      return;
    }

    setInitialized(true);

    if (!redirect) {
      initStateDB(setSiteData);
    }

    clientMetaData(siteData?.main?.role);
    initObservers();
    startAnimation();
    setToEditContent();

  }, [redirect, setR, setToEditContent, siteData, initialized]);

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
