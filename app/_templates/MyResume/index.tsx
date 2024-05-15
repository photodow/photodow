"use client";

import "./index.scss";

import { TextHeader } from "./_components/TextHeader";
import { TextExperiences } from "./_components/TextExperiences";
import { TextSummary } from "./_components/TextSummary";
import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import LinksByRef from "../../_components/LinksByRef";
import { Ref } from "../../_types/Ref";
import { addUrlId } from "../../_utils/addUrlId";
import PortfolioGrid from "../../_components/PortfolioGrid";

const websiteRef: Ref = {
    _key: "website",
    _override: {
        value: addUrlId("jamesdow.me"),
    },
};

export function MyResumeTemplate() {
    const siteData = useContext(SiteDataContext);

    return (
        <div
            className="jd-text-resume"
            data-carbon-theme="white"
            // contentEditable={contentEditable}
        >
            <TextHeader />
            <main className="jd-text-resume__main">
                <TextSummary />
                <section className="jd-text-resume__layout-section">
                    <h3 className="jd-text-resume__layout-title">Experience</h3>
                    <TextExperiences
                        refs={siteData?.main?.experience}
                        className="jd-text-resume__layout-content"
                    />
                </section>
                <section className="jd-text-resume__layout-section">
                    <h3 className="jd-text-resume__layout-title">Education</h3>
                    <TextExperiences
                        refs={siteData?.main?.education}
                        className="jd-text-resume__layout-content"
                    />
                </section>
                <section className="jd-text-resume__layout-section">
                    <h3 className="jd-text-resume__layout-title">Websites</h3>
                    <div className="jd-text-resume__layout-content">
                        <LinksByRef
                            refs={[
                                websiteRef,
                                ...(siteData?.main?.social || []),
                            ]}
                            className="jd-contact__links jd-text-resume__websites"
                            icon={true}
                            value={true}
                            size="md"
                        />
                    </div>
                </section>
                <section className="jd-text-resume__layout-section">
                    <h3 className="jd-text-resume__layout-title">Contact</h3>
                    <div className="jd-text-resume__layout-content">
                        <LinksByRef
                            refs={siteData?.main?.contact}
                            className="jd-contact__links jd-text-resume__contact"
                            icon={true}
                            text={true}
                            size="md"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
