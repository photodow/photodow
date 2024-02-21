"use client";

import "./index.scss";

import { useCallback, useContext, useEffect, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import { RefList } from "../../_types/Ref";
import { Experience } from "../../_types/Experience";
import GetRefs from "../../_utils/getRefs";
import EducationItem from "../EducationItem";
import List from "../List";

export default function MyEducation() {
  const siteData = useContext(SiteDataContext);
  const [education, setEducation] = useState<Experience[]>([]);

  const setEducationData = useCallback(() => {
    if (siteData) {
      setEducation(
        (GetRefs(siteData?.main.education, RefList.Experiences, siteData) as Experience[])
        .sort((a, b) => {
          const presentYear = new Date().getFullYear();
          const bEnd = typeof b.end === 'number' ? b.end : presentYear;
          const aEnd = typeof a.end === 'number' ? a.end : presentYear;

          return b.start - a.start || bEnd - aEnd;
        })
      );
    }
  }, [siteData]);

  useEffect(() => {
    setEducationData();
  }, [setEducationData]);

  return (
    <article className="jd-education" id="education">
      {siteData && <h3 className="jd-education__title jd-body__section-title">Education</h3>}
      <List
        className="jd-education__list"
        items={education.map((item, i) => {
          return <EducationItem key={`education-${i}`} {...item} />;
        })}
      />
    </article>
  );
}