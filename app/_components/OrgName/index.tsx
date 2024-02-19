"use client";

import "./index.scss";

import { OrgData } from "../../_utils/getOrgData";

export default function OrgName({ name, link, className }: Partial<OrgData>) {
  const classNames = `jd-org-name${className ? ` ${className}` : '' }`;

  return !link
    ? <span className={classNames}>{name}</span>
    : <a className={classNames}
        href={link.protocol + link.value}
        title={link.title}
        target="_blank">{name}</a>;
}