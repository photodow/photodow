"use client";

import "./index.scss";

import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import { ButtonSkeleton, SkeletonText, TagSkeleton } from "@carbon/react";

export default function AboutLoading() {
  const siteData = useContext(SiteDataContext);

  return (
    <div className="jd-about-skeleton">
      <SkeletonText heading={true}  className="jd-about-skeleton__title" />
      <SkeletonText className="jd-about-skeleton__subtitle" />
      
      <TagSkeleton /> <TagSkeleton />

      <SkeletonText className="jd-about-skeleton__content" paragraph={true} lineCount={3}  />
      <ButtonSkeleton /> <ButtonSkeleton />
    </div>
  );
}