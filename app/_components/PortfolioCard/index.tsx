"use client";

import "./index.scss";

import { PortfolioCard } from "../../_types/Portfolio";
import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import { Ref, RefList } from "../../_types/Ref";
import GetRefs from "../../_utils/getRefs";
import { Image } from "../../_types/Image";
import LinksByRef from "../LinksByRef";
import Skills from "../Skills";
import { SkeletonPlaceholder } from "@carbon/react";

export default function PortfolioCard({
    image,
    title,
    description,
    actions,
    skills,
}: PortfolioCard) {
    const siteData = useContext(SiteDataContext);

    return (
        <article className={`jd-portfolio-card${siteData ? " active" : ""}`}>
            <SkeletonPlaceholder className="jd-portfolio-card__loading" />
            <Skills items={skills} color="blue" size="sm" />
            <div className="jd-portfolio-card__cover">{renderCover(image)}</div>
            <div className="jd-portfolio-card__content">
                <h4 className="jd-portfolio-card__title">{title}</h4>
                <p className="jd-portfolio-card__description">{description}</p>
                <LinksByRef
                    className="jd-portfolio-card__actions"
                    refs={actions}
                    text={true}
                    icon={true}
                />
            </div>
        </article>
    );

    function renderCover(cover: Ref | undefined) {
        if (!cover || !siteData?.main) {
            return null;
        }

        const image = (
            GetRefs([cover], RefList.Images, siteData) as Image[]
        )[0];

        return !image ? null : (
            <img
                className="jd-portfolio-card__img"
                src={image.src}
                alt={image.alt}
            />
        );
    }
}
