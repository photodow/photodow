"use client";

import "./index.scss";

import { useCallback, useContext, useEffect, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import App from "../../_components/App";
import { Experience } from "../../_types/Experience";
import GetRefs from "../../_utils/getRefs";
import { RefList } from "../../_types/Ref";

export function MyResumeTemplate() {
    const siteData = useContext(SiteDataContext);
    const [experiences, setExperiences] = useState<Experience[]>([]);

    const setExperienceData = useCallback(() => {
        if (siteData) {
            setExperiences(
                (
                    GetRefs(
                        siteData.main?.experience,
                        RefList.Experiences,
                        siteData,
                    ) as Experience[]
                ).sort((a, b) => {
                    const presentYear = new Date().getFullYear();
                    const bEnd =
                        typeof b.end === "number" ? b.end : presentYear;
                    const aEnd =
                        typeof a.end === "number" ? a.end : presentYear;

                    return b.start - a.start || bEnd - aEnd;
                }),
            );
        }
    }, [siteData]);

    useEffect(() => {
        setExperienceData();
    }, [setExperienceData, siteData]);

    return (
        <>
            <h1>{siteData?.main?.name}</h1>
            <p>asdf asdf</p>
        </>
    );
}
