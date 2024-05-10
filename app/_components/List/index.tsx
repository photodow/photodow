"use client";

import "./index.scss";

import { ReactNode } from "react";

type Comp = {
    items: ReactNode[];
    className?: string;
};

export default function List({ items, className }: Comp) {
    return (
        <ul className={`jd-list ${className}`}>
            {items.map((item, i) => {
                return (
                    <li key={`list-${i}`} className="jd-list__item">
                        {item}
                    </li>
                );
            })}
        </ul>
    );
}
