"use client";

import "./index.scss";

import { Experience } from "../../_types/Experience";
import {
    MutableRefObject,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { SiteDataContext } from "../../_utils/contexts";
import Skills from "../Skills";
import { OrgData, transformOrgData } from "../../_utils/getOrgData";
import OrgName from "../OrgName";
import ExperienceMeta from "../ExperienceMeta";
import Slant from "../Slant";
import { initPeacockBG } from "../../_utils/peacockBG";
import { initFleetisticsBG } from "../../_utils/fleetisticsBG";
import { initIBMBG } from "../../_utils/ibmBG";
import Link from "next/link";
import Markdown from "react-markdown";

const initOrgKey: Record<string, Function> = {
    peacock: initPeacockBG,
    "ibm-design": initIBMBG,
    fleetistics: initFleetisticsBG,
};

export default function ExperienceItem({
    orgKey,
    title,
    description,
    details,
    start,
    end,
    location,
    type,
    skills,
}: Experience) {
    const siteData = useContext(SiteDataContext);

    const bgRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const [org, setOrg] = useState<OrgData | null>(null);

    const setOrgData = useCallback(() => {
        setOrg(transformOrgData(orgKey, siteData));
    }, [siteData, orgKey]);

    useEffect(() => {
        setOrgData();
    }, [setOrgData]);

    useEffect(() => {
        initOrgKey[orgKey]?.(`experience-${orgKey}`, bgRef);
    }, [orgKey, bgRef]);

    return (
        <Slant
            bgRef={bgRef}
            Type="section"
            className="jd-experience-item"
            id={`experience-${orgKey}`}
        >
            <div className="hidden-copy-paste-formatting">
                <br />
            </div>
            <div className="cds--grid">
                <div className="cds--row">
                    <div className="cds--col-sm-2 cds--col-md-1 cds--offset-lg-2 cds--col-lg-2">
                        {renderOrgImage()}
                    </div>
                    <div className="cds--col-sm-4 cds--col-md-6  cds--offset-lg-0 cds--col-lg-10 jd-experience-item__container">
                        {org && (
                            <p className="jd-experience-item__org jd-fade-in">
                                <OrgName
                                    className="jd-experience-item__org"
                                    {...org}
                                />
                            </p>
                        )}
                        <h4
                            className="jd-experience-item__title jd-fade-in"
                            data-page={`experience-${orgKey}`}
                        >
                            {title}
                        </h4>
                        <ExperienceMeta
                            start={start}
                            end={end}
                            location={location}
                            type={type}
                            className="jd-experience-item__meta jd-fade-in"
                        />
                        <Skills
                            items={skills}
                            size={"sm"}
                            className="jd-experience-item__skills jd-fade-in"
                        />
                        {renderDesc()}
                        {renderDetails()}
                    </div>
                </div>
            </div>
        </Slant>
    );

    function renderOrgImage() {
        if (!org?.image) {
            return null;
        }

        const img = (
            <img
                className="jd-experience-item__image"
                src={org.image.src}
                alt={org.image?.alt}
            />
        );

        return org.link ? (
            <Link
                className="jd-experience-item__logo jd-fade-in"
                href={org.link.protocol + org.link.value}
                target="_blank"
            >
                {img}
            </Link>
        ) : (
            <div className="jd-experience-item__logo jd-fade-in">{img}</div>
        );
    }

    function renderDesc() {
        return !description ? null : (
            <Markdown className="jd-experience-item__desc jd-fade-in">
                {description}
            </Markdown>
        );
    }

    function renderDetails() {
        return !details?.length ? null : (
            <ul className="jd-experience-item__details">
                {details.map((detail, i) => {
                    return (
                        <li key={`details-${detail}`} className={"jd-fade-in"}>
                            <span className="hidden-copy-paste-formatting">
                                {"-"}&nbsp;
                            </span>
                            <Markdown
                                disallowedElements={["p"]}
                                unwrapDisallowed={true}
                            >
                                {detail}
                            </Markdown>
                            <div className="hidden-copy-paste-formatting">
                                <br />
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
