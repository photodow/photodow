"use client";

import "./index.scss";

import { useContext, useEffect, useRef } from "react";
import { SiteDataContext } from "../../utils/contexts";
import GetRefs from "../../utils/getRefs";
import { Ref, RefList } from "../../types/Ref";
import { Link as LinkData } from "../../types/Link";
import { MainItem } from "../../types/main";
import { Link } from "@carbon/react";
import { Icon } from "../Icon";

interface Comp {
  context: keyof MainItem,
  className?: string,
  icon?: true | null,
  text?: true | null,
  value?: true | null
}

export default function Links({ context, className, text = null, icon = null, value = null }: Comp) {
  const siteData = useContext(SiteDataContext);
  const links = useRef<LinkData[]>([]);

  useEffect(() => {
    if (siteData) {
      links.current = GetRefs(siteData.main[context] as Ref[], RefList.Links, siteData) as LinkData[];
    }
  }, [context, siteData]);

  return !links.current.length ? null : (
    <ul className={`jd-linklist ${className}`}>
      {links.current.map(({ protocol, text: _text, value: _value, icon: _icon, target = null }, i) => {
        console.log('icon', _icon);
        return (
          <li key={`${_text}${i}`} className="jd-linklist__item">
            <Link className="jd-linklist__link"
               href={`${protocol}${_value}`}
               target={`${target}`}
               title={_text}>
              
              {icon && _icon && <Icon iconRef={_icon} size={32} />}
              {text && _text && _text}
              {value && _value && _value}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}