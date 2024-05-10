"use client";

import "./index.scss";

import { useCallback, useContext, useEffect, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import GetRefs from "../../_utils/getRefs";
import { RefList } from "../../_types/Ref";
import { Experience } from "../../_types/Experience";
import ExperienceItem from "../ExperienceItem";
import MyEducation from "../MyEducation";
import Slant from "../Slant";
import MyContact from "../MyContact";

const id = "experience";

export default function MyExperience() {
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
        <article className="jd-experience" id={id}>
            <Slant Type="header" className="jd-experience__header">
                <div className="cds--grid">
                    <div className="cds--row">
                        <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-3 cds--offset-lg-2 cds--col-lg-8">
                            {siteData && (
                                <h3
                                    className="jd-experience__title jd-body__section-title jd-fade-in"
                                    data-page={id}
                                >
                                    Experience
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
            </Slant>
            {!experiences.length
                ? null
                : experiences.map((item, i) => {
                      return (
                          <ExperienceItem
                              key={`experience-${item._key}`}
                              {...item}
                          />
                      );
                  })}
            <Slant Type="article" className="jd-experience__bottom">
                <div className="cds--grid">
                    <div className="cds--row">
                        <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-6 cds--offset-lg-2 cds--col-lg-7">
                            <MyEducation />
                        </div>
                        <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-6 cds--offset-lg-1 cds--col-lg-4">
                            <MyContact />
                        </div>
                    </div>
                </div>
            </Slant>
        </article>
    );
}
