import "./index.scss";

import App from "../../_components/App";
import { Metadata } from "next";
import { metaDataObj } from "../../_utils/metadata";
import { HeaderSize } from "../../_types/Header";
import { DefaultTemplate } from "../../_templates/Default";
import { CaseStudyCarbonDevtools } from "../../_components/CaseStudyCarbonDevtools";

const title = "Carbon Devtools Case Study";
const description =
    "How James Dow designed and built Carbon Devtools, a browser extension that helps design and engineering teams verify Carbon Design System usage on live pages.";

export const metadata: Metadata = metaDataObj(title, description);

export default function CarbonDevtoolsCaseStudy() {
    return (
        <App>
            <DefaultTemplate headerSize={HeaderSize.Small}>
                <CaseStudyCarbonDevtools />
            </DefaultTemplate>
        </App>
    );
}
