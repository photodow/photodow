import "./index.scss";

import { Experience } from "../../../../_types/Experience";
import { RefList } from "../../../../_types/Ref";
import { SiteDataContext } from "../../../../_utils/contexts";
import GetRefs from "../../../../_utils/getRefs";
import { useCallback, useContext, useEffect, useState } from "react";
import { TextOrgName } from "../TextOrgName";
import Skills from "../../../../_components/Skills";
import ExperienceMeta from "../../../../_components/ExperienceMeta";
import { TextOrgImage } from "../TextOrgImage";
import { sortExperiences } from "../../../../_utils/sortExperiences";
import Markdown from "react-markdown";

type Comp = {
    className?: string;
    refs: any;
};

export function TextExperiences({ refs, className }: Comp) {
    const siteData = useContext(SiteDataContext);
    const [experiences, setExperiences] = useState<Experience[]>([]);

    const setExperienceData = useCallback(() => {
        if (siteData) {
            setExperiences(
                (
                    GetRefs(refs, RefList.Experiences, siteData) as Experience[]
                ).sort(sortExperiences),
            );
        }
    }, [siteData, refs]);

    useEffect(() => {
        setExperienceData();
    }, [setExperienceData, siteData]);

    return (
        <>
            {experiences.map((experience, i) => {
                return (
                    <article
                        className={`jd-text-experience ${className} ${experience.orgKey}`}
                        key={i + experience.title + experience.orgKey}
                    >
                        <TextOrgImage _key={experience.orgKey} />
                        <TextOrgName _key={experience.orgKey} />
                        <h5 className="jd-text-experience__title">
                            {experience.title}
                        </h5>
                        <ExperienceMeta
                            start={experience.start}
                            end={experience.end}
                            location={experience.location}
                            type={experience.type}
                            credential={experience.credential}
                            className="jd-text-experience__meta"
                        />
                        <Skills
                            items={experience.skills}
                            size={"sm"}
                            className="jd-text-experience__skills"
                        />

                        {experience.description && (
                            <Markdown className="jd-text-experience__desc">
                                {experience.description}
                            </Markdown>
                        )}
                        {renderDetails(experience.details)}
                    </article>
                );
            })}
        </>
    );
}

function renderDetails(details: Experience["details"]) {
    return !details?.length ? null : (
        <ul className="jd-text-experience__details">
            {details.map((detail, i) => {
                return (
                    <li key={`details-${detail}`}>
                        <span className="hidden-copy-paste-formatting">
                            {"-"}&nbsp;
                        </span>
                        {
                            <Markdown
                                disallowedElements={["p"]}
                                unwrapDisallowed={true}
                            >
                                {detail}
                            </Markdown>
                        }
                        <div className="hidden-copy-paste-formatting">
                            <br />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
