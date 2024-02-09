"use client";

import { SkeletonPlaceholder } from "@carbon/react";
import "./index.scss";

export default function LoadingPortfolioGrid({ className }: {className?: string}) {
  return (
    <div className={`jd-portfolio-grid__loading`}>
        <div className={`jd-portfolio-grid__loading__inner ${className}`}>
            <SkeletonPlaceholder />
            <SkeletonPlaceholder />
            <SkeletonPlaceholder />
        </div>
    </div>
  );
}