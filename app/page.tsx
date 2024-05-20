import "./page.scss";

import App from "./_components/App";
import AboutMe from "./_components/AboutMe";
import MyExperience from "./_components/MyExperience";
import MyWork from "./_components/MyWork";
import { LinkComp, LinkKind, LinkSize, Protocol } from "./_types/Link";
import { Ref } from "./_types/Ref";
import { IconKeys } from "./_components/Icon";
import { DefaultTemplate } from "./_templates/Default";

const addedRefs: Ref[] = [
    {
        _key: "experience",
        _override: {
            kind: LinkKind.Primary,
            size: LinkSize.Large,
            comp: LinkComp.Button,
        },
    },
    {
        _key: "mywork",
        _override: {
            protocol: Protocol.Hash,
            icon: IconKeys.ArrowDown,
            kind: LinkKind.Ghost,
            size: LinkSize.Large,
            comp: LinkComp.Button,
        },
    },
];

export default function Home() {
    return (
        <App>
            <DefaultTemplate>
                <AboutMe addedRefs={addedRefs} />
                <MyWork />
                <MyExperience />
            </DefaultTemplate>
        </App>
    );
}
