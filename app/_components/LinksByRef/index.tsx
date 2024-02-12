"use client";

import "./index.scss";

import { MouseEventHandler, useCallback, useContext, useEffect, useRef, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import GetRefs from "../../_utils/getRefs";
import { Ref, RefList } from "../../_types/Ref";
import { LinkComp, Link as LinkData } from "../../_types/Link";
import { Button, Link } from "@carbon/react";
import { Icon } from "../Icon";

interface Comp {
  refs: Ref[] | undefined,
  className?: string,
  icon?: true | null,
  text?: true | null,
  value?: true | null
  onClick?: MouseEventHandler
  delay?: boolean
}

export default function LinksByRef({ refs = [], className, onClick, text = null, icon = null, value = null, delay = false }: Comp) {
  const siteData = useContext(SiteDataContext);

  if (!siteData) {
    return null;
  }

  const links = GetRefs(refs, RefList.Links, siteData) as LinkData[];

  return !links ? null : (
    <ul className={`jd-linklist${` ${className}` || ''}`}>
      {links.map(({
          protocol,
          title,
          comp = LinkComp.Text,
          kind,
          size,
          text: _text,
          value: _value,
          icon: _icon,
          target = undefined
        }, i) => {

        const Component = comp === LinkComp.Text ? Link : Button;

        return (
          <li key={`${_text}${i}`} className="jd-linklist__item">
            <Component className="jd-linklist__link"
              href={`${protocol}${_value}`}
              target={target}
              title={title || _text}
              onClick={onClick}
              kind={kind}
              size={size}
              style={delay ? { transitionDelay: `${i * .2}s`} : {}}
            >
              {icon && _icon && <Icon iconRef={_icon} size={16} />}
              {text && _text && _text}
              {value && _value && _value}
            </Component>
          </li>
        );
      })}
    </ul>
  );
}