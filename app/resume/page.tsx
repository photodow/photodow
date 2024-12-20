import "./index.scss";

import { Metadata } from "next";
import { metaDataObj, roleDefault } from "../_utils/metadata";
import { MyResumeTemplate } from "../_templates/MyResume";
import App from "../_components/App";

const title = `James Dow's Resume`;
const description = `Download, print, and review James Dow's ${roleDefault} Resume.`;

export const metadata: Metadata = metaDataObj(title, description);

export default function Resume() {
    return (
        <App>
            <MyResumeTemplate />
        </App>
    );
}
