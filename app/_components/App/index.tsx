"use client";

import "./index.scss";

import { useCallback, useEffect, useState } from "react";
import { initStateDB } from "../../_utils/firebase";
import { SiteDataContext } from "../../_utils/contexts";
import { SiteData } from "../../_types/SiteData";
import redirectIfR from "../../_utils/redirectIfR";
import urlParams from "../../_utils/urlParams";
import { initObservers } from "../../_utils/observers";
import { clientMetaData } from "../../_utils/metadata";
import { startAnimation } from "../../_utils/animation";

type Comp = {
    children?: React.ReactNode;
};

export default function App({ children }: Comp) {
    const [redirect, setRedirect] = useState<string | null>(null);
    const [siteData, setSiteData] = useState<SiteData | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);

    const setR = useCallback((r: string | null) => setRedirect(r), []);

    useEffect(() => {
        setR(urlParams().get("r"));
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
    }, [redirect, setR, siteData, initialized]);

    return (
        <SiteDataContext.Provider value={siteData}>
            {children}
        </SiteDataContext.Provider>
    );
}
