"use client";

import "./index.scss";

import { JSXElementConstructor } from "react";
import LogoCodepen from "../LogoCodepen";
import LogoGithub from "@carbon/icons-react/lib/LogoGithub";
import LogoLinkedin from "@carbon/icons-react/lib/LogoLinkedin";
import Download from "@carbon/icons-react/lib/Download";
import Rocket from "@carbon/icons-react/lib/Rocket";
import Launch from "@carbon/icons-react/lib/Launch";

export const enum IconKeys {
    GitHub = 'github',
    LinkedIn = 'linkedin',
    Codepen = 'codepen',
    Install = 'install',
    Download = 'download',
    Rocket = 'rocket',
    Launch = 'launch',
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
}

export function Icon({ iconRef, size }: Comp) {
  const IconJSX = icons[iconRef];
  return !IconJSX ? null : <IconJSX size={size} />;
}