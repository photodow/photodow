"use client";

import "./index.scss";

import { MouseEventHandler, useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import GetRefs from "../../_utils/getRefs";
import { Ref, RefList } from "../../_types/Ref";
import { Link as LinkData } from "../../_types/Link";
import { LinkProps } from "@carbon/react";
import { Icon } from "../Icon";
import { Link } from "../Link";

interface Comp {
  refs?: Ref[] | undefined,
  className?: string,
  icon?: true | null,
  text?: true | null,
  value?: true | null,
  onClick?: MouseEventHandler,
  delay?: boolean,
  size?: LinkProps['size'],
  itemClassName?: string,
}

export default function LinksByRef({ refs = [], size, className, onClick, text = null, icon = null, value = null, delay = false, itemClassName = '' }: Comp) {
  const siteData = useContext(SiteDataContext);

  if (!siteData || !refs?.length) {
    return null;
  }

  const links = GetRefs(refs, RefList.Links, siteData) as LinkData[];

  return !links ? null : (
    <ul className={`jd-linklist${` ${className}` || ''}`}>
      {links.map(({
          protocol,
          title,
          comp,
          kind,
          size: _size,
          text: _text,
          value: _value,
          icon: _icon,
          target = undefined
        }, i) => {

        return (
          <li key={`${_text}${i}`} className={`jd-linklist__item ${itemClassName}`}>
            <Link className="jd-linklist__link"
              href={`${protocol.replace(location.pathname, '')}${_value}`}
              target={target}
              title={title || _text}
              onClick={onClick}
              kind={kind}
              size={size || _size}
              style={delay ? { transitionDelay: `${i * .2}s`} : {}}
              compType={comp}
            >
              {icon && _icon && <Icon iconRef={_icon} size={16} />}
              {text && _text && _text}
              {value && _value && _value}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}