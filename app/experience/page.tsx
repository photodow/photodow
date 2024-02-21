import "./index.scss";

import App from "../_components/App";
import AboutMe from "../_components/AboutMe";
import MyExperience from "../_components/MyExperience";
import { LinkComp, LinkKind, LinkSize, Protocol } from "../_types/Link";
import { IconKeys } from "../_components/Icon";
import { Ref } from "../_types/Ref";

import { Metadata } from 'next';
import { descriptionBase, roleDefault } from "../_utils/metadata";

const title = `James Dow's Experiences`;
const description = `A list of James Dow's experiences and credentials as a ${roleDefault}.`;

export const metadata: Metadata = {
  title,
  description: `${description} ${descriptionBase}`,
  twitter: {
    title,
    description: `${description} ${descriptionBase}`
  },
  openGraph: {
    title,
    description: `${description} ${descriptionBase}`
  }
};

const jumpToRef: Ref = {
  _key: "experience",
  _override: {
    protocol: Protocol.Hash,
    icon: IconKeys.ArrowDown,
    kind: LinkKind.Ghost,
    size: LinkSize.Large,
    comp: LinkComp.Button
  }
};

export default function Experience() {
  return (
    <App miniHeader={true}>
      <AboutMe replaceRefs={[jumpToRef]} nameRoleOverride={true} />
      <MyExperience />
    </App>
  );
}