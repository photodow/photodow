import "./index.scss";

import { useContext } from "react";
import { SiteDataContext } from "../../../../_utils/contexts";
import Image from "next/image";
import Skills from "../../../../_components/Skills";
import LinksByRef from "../../../../_components/LinksByRef";

export function TextHeader() {
    const { name, role, skills, contact } =
        useContext(SiteDataContext)?.main || {};

    return (
        <header className="jd-text-resume-header">
            <div>
                <Image
                    src="/signature-initials.svg"
                    alt="JD Initial"
                    width={150}
                    height={100}
                    className="jd-text-resume-header__initial"
                />
                <h1 className={"jd-text-resume-header__title"}>{name}</h1>
                <h2 className={"jd-text-resume-header__role"}>{role}</h2>
                <LinksByRef
                    refs={contact}
                    className="jd-contact__links"
                    icon={true}
                    text={true}
                    size="md"
                />
                <Skills
                    items={skills}
                    size={"sm"}
                    className="jd-text-resume-header__skills"
                />
            </div>
        </header>
    );
}
