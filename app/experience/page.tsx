import "./index.scss";

import App from "../_components/App";
import AboutMe from "../_components/AboutMe";
import MyExperience from "../_components/MyExperience";
import { LinkComp, LinkKind, LinkSize, Protocol } from "../_types/Link";
import { IconKeys } from "../_components/Icon";
import { Ref } from "../_types/Ref";
import { Metadata } from 'next';
import { roleDefault, metaDataObj } from "../_utils/metadata";
import { HeaderSize } from "../_components/Header";

const title = `James Dow's Experiences`;
const description = `A list of James Dow's experiences and credentials as a ${roleDefault}.`;

export const metadata: Metadata = metaDataObj(title, description);

const jumpToExperienceRef: Ref = {
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
    <App headerSize={HeaderSize.Small}>
      <AboutMe replaceRefs={[jumpToExperienceRef]} nameRoleOverride={true} />
      <MyExperience />
    </App>
  );
}