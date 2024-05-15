import { useContext } from "react";
import { SiteDataContext } from "../../../../_utils/contexts";

import "./index.scss";

export function TextSummary() {
    const { description } = useContext(SiteDataContext)?.main || {};

    return (
        <section className="jd-text-resume-summary jd-text-resume__layout-section">
            <h3 className="jd-text-resume-summary__title jd-text-resume__layout-title">
                Summary
            </h3>
            <div className="jd-text-resume__layout-content">
                <p className="jd-text-resume-summary__text">{description}</p>
            </div>
        </section>
    );
}
