"use client";

import "./index.scss";

import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import { HeaderSize } from "../../_types/Header";
import App from "../../_components/App";

export function MyResumeTemplate() {
    const siteData = useContext(SiteDataContext);

    return (
        <App>
            <h1>{siteData?.main?.name}</h1>
        </App>
    );
}
