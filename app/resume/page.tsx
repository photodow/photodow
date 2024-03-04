import "./index.scss";

import { Metadata } from 'next';
import { metaDataObj, roleDefault } from "../_utils/metadata";
import Experience from "../experience/page";

const title = `James Dow's Resume`;
const description = `Download and review James Dow's Resume. ${roleDefault}.`;

export const metadata: Metadata = metaDataObj(title, description);

export default function Resume() {
  return <Experience />
}
