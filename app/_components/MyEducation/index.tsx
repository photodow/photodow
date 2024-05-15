"use client";

import "./index.scss";

import { useCallback, useContext, useEffect, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import { RefList } from "../../_types/Ref";
import { Experience } from "../../_types/Experience";
import GetRefs from "../../_utils/getRefs";
import EducationItem from "../EducationItem";
import List from "../List";
import { sortExperiences } from "../../_utils/sortExperiences";

const id = "experience-education";

export default function MyEducation() {
    const siteData = useContext(SiteDataContext);
    const [education, setEducation] = useState<Experience[]>([]);

    const setEducationData = useCallback(() => {
        if (siteData) {
            setEducation(
                (
                    GetRefs(
                        siteData.main?.education,
                        RefList.Experiences,
                        siteData,
                    ) as Experience[]
                ).sort(sortExperiences),
            );
        }
    }, [siteData]);

    useEffect(() => {
        setEducationData();
    }, [setEducationData]);

    return (
        <article className="jd-education" id={id}>
            <div className="hidden-copy-paste-formatting">
                <br />
            </div>
            {siteData && (
                <h3
                    className="jd-education__title jd-body__section-title jd-fade-in"
                    data-page={id}
                >
                    Education
                </h3>
            )}
            <List
                className="jd-education__list"
                items={education.map((item, i) => {
                    return <EducationItem key={`education-${i}`} {...item} />;
                })}
            />
        </article>
    );
}
