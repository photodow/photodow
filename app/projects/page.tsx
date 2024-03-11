import "./index.scss";

import App from "../_components/App";
import MyWork from "../_components/MyWork";

import { Metadata } from 'next';
import { metaDataObj, roleDefault } from "../_utils/metadata";
import { HeaderSize } from "../_components/Header";

const title = `James Dow's Projects`;
const description = `Check out some of the ${roleDefault} projects James Dow has been working on. ${roleDefault}.`;

export const metadata: Metadata = metaDataObj(title, description);

export default function Projects() {
  return (
    <App headerSize={HeaderSize.Small}>
      <MyWork />
    </App>
  );
}
