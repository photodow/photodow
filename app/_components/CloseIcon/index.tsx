"use client";

import { MouseEventHandler, RefObject } from "react";
import "./index.scss";

export default function CloseIcon({
    active,
    onClick,
    refObj,
}: {
    active?: boolean;
    onClick: MouseEventHandler;
    refObj: RefObject<HTMLButtonElement>;
}) {
    return (
        <button
            className={`jd-close ${active ? "jd-close--active" : ""}`}
            title="Close"
            aria-label="Close"
            onClick={onClick}
            ref={refObj}
        />
    );
}
