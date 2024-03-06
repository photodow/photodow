"use client";

import "./index.scss";

import { ReactNode } from "react";

type Comp = {
    Type?: keyof JSX.IntrinsicElements,
    children?: ReactNode,
    className?: string,
    id?: string,
}

export default function Slant({ Type = 'section', children, className, id }: Comp) {
  return (
    <Type className={`jd-slant${className ? ` ${className}` : ''}`} id={id}>
      <div className="jd-slant__content">
        {children}
      </div>
      <div className="jd-slant__bg jd-in-view" />
    </Type>
  );
}