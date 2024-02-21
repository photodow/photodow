import "./index.scss";

import App from "../_components/App";
import AboutMe from "../_components/AboutMe";
import MyExperience from "../_components/MyExperience";
import { LinkComp, LinkKind, LinkSize, Protocol } from "../_types/Link";
import { IconKeys } from "../_components/Icon";
import { Ref } from "../_types/Ref";
import { useContext } from "react";
import { SiteDataContext } from "../_utils/contexts";

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
  // const { name, role } = useContext(SiteDataContext)?.main || {};

  // useEffect(() => {
  //   const titleElem = document.querySelector('title');

  //   if (titleElem) {
  //     titleElem.innerHTML = `Experiences | James Dow, Designer & Developer`;
  //   }
  // }, []);

  return (
    <App miniHeader={true}>
      <AboutMe replaceRefs={[jumpToRef]} nameRoleOverride={true} />
      <MyExperience />
    </App>
  );
}