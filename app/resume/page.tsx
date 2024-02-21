import "./index.scss";

import ResumeRedirect from "../_components/ResumeRedirect";

import { Metadata } from 'next';
import { metaDataObj, roleDefault } from "../_utils/metadata";

const title = `James Dow's Resume`;
const description = `Download and review James Dow's Resume. ${roleDefault}.`;

export const metadata: Metadata = metaDataObj(title, description);

export default function Resume() {
  return <ResumeRedirect />;
}
