import "./index.scss";

import { JSXElementConstructor } from "react";
import LogoCodepen from "../LogoCodepen";
import LogoGithub from "@carbon/icons-react/lib/LogoGithub";
import LogoLinkedin from "@carbon/icons-react/lib/LogoLinkedin";
import Download from "@carbon/icons-react/lib/Download";
import Rocket from "@carbon/icons-react/lib/Rocket";
import Launch from "@carbon/icons-react/lib/Launch";
import View from "@carbon/icons-react/lib/View";
import Document from "@carbon/icons-react/lib/Document";
import DownloadDocument from "@carbon/icons-react/lib/DocumentDownload";
import ArrowDown from "@carbon/icons-react/lib/ArrowDown";
import Phone from "@carbon/icons-react/lib/Phone";
import Email from "@carbon/icons-react/lib/Email";
import Wikis from "@carbon/icons-react/lib/Wikis";
import Location from "@carbon/icons-react/lib/Location";

export const enum IconKeys {
    GitHub = 'github',
    LinkedIn = 'linkedin',
    Codepen = 'codepen',
    Install = 'install',
    Download = 'download',
    Rocket = 'rocket',
    Launch = 'launch',
    View = 'view',
    Document = 'document',
    DownloadDocument = 'download-document',
    ArrowDown = 'arrow-down',
    Phone = 'phone',
    Email = 'email',
    Website = 'website',
    Map = 'map',
}
interface Comp {
    iconRef: IconKeys,
    size?: number
}

const icons: Record<IconKeys, JSXElementConstructor<any>> = {
    [IconKeys.GitHub]: LogoGithub,
    [IconKeys.LinkedIn]: LogoLinkedin,
    [IconKeys.Codepen]: LogoCodepen,
    [IconKeys.Download]: Download,
    [IconKeys.Install]: Download,
    [IconKeys.Launch]: Launch,
    [IconKeys.Rocket]: Rocket,
    [IconKeys.View]: View,
    [IconKeys.Document]: Document,
    [IconKeys.DownloadDocument]: DownloadDocument,
    [IconKeys.ArrowDown]: ArrowDown,
    [IconKeys.Phone]: Phone,
    [IconKeys.Email]: Email,
    [IconKeys.Website]: Wikis,
    [IconKeys.Map]: Location,
}

export function Icon({ iconRef, size }: Comp) {
  const IconJSX = icons[iconRef];
  return !IconJSX ? null : <IconJSX size={size} />;
}