"use client";

import "./index.scss";

import { JSXElementConstructor } from "react";
import LogoGithub from "@carbon/icons-react/lib/LogoGithub";
import LogoLinkedin from "@carbon/icons-react/lib/LogoLinkedin";
import LogoCodepen from "../LogoCodepen";

export const enum IconKeys {
    GitHub = 'github',
    LinkedIn = 'linkedin',
    Codepen = 'codepen',
}

interface Comp {
    iconRef: IconKeys,
    size?: number
}

const icons: Record<IconKeys, JSXElementConstructor<any>> = {
    [IconKeys.GitHub]: LogoGithub,
    [IconKeys.LinkedIn]: LogoLinkedin,
    [IconKeys.Codepen]: LogoCodepen,
}

export function Icon({ iconRef, size }: Comp) {

  const IconJSX = icons[iconRef];
  return !IconJSX ? null : <IconJSX size={size} />;
}