"use client";

import "./index.scss";

import { OrgData } from "../../_utils/getOrgData";
import Link from "next/link";

export default function OrgName({ name, link, className }: Partial<OrgData>) {
    const classNames = `jd-org-name${className ? ` ${className}` : ""}`;

    return !link ? (
        <span className={classNames}>{name}</span>
    ) : (
        <Link
            className={classNames}
            href={link.protocol + link.value}
            title={link.title}
            target="_blank"
        >
            {name}
        </Link>
    );
}
