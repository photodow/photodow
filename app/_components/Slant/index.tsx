"use client";

import "./index.scss";

import { MutableRefObject, ReactNode } from "react";

type Comp = {
    Type?: keyof JSX.IntrinsicElements,
    children?: ReactNode,
    className?: string,
    id?: string,
    bgRef?: MutableRefObject<HTMLDivElement | null>
}

export default function Slant({ Type = 'section', children, className, id, bgRef }: Comp) {
  return (
    <Type
      className={`jd-slant${className ? ` ${className}` : ''}`}
      id={id}
    >
      <div className="jd-slant__content">
        {children}
      </div>
      <div ref={bgRef} className="jd-slant__bg jd-in-view" />
    </Type>
  );
}