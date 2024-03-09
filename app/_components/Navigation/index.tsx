"use client";

import "./index.scss";

import CloseIcon from "../CloseIcon";
import { useRef, KeyboardEvent, FocusEvent, RefObject, useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import LinksByRef from "../LinksByRef";
import { Link } from "@carbon/react";

type Comp = {
  open: boolean,
  toggleNav: Function,
  firstFocusItem: RefObject<HTMLButtonElement>
}

export default function Navigation({ open, toggleNav, firstFocusItem }: Comp) {

  const siteData = useContext(SiteDataContext);

  const tabState = useRef(false);
  const lastFocusItem = useRef<HTMLDivElement>(null);

  return !siteData ? null : (
    <nav className={`jd-nav${open ? ' jd-nav--open' : ''}`} onKeyDown={handleKeyStateDown} onKeyUp={handleKeyStateUp}>
      <div className="cds--grid jd-nav__inner">
        <CloseIcon
          active={open}
          onClick={() => closeNav()}
          refObj={firstFocusItem}
        />
        <div className="cds--row">
          <div className="cds--col-sm-4 jd-nav__header">
            <p className="jd-nav__name">
              <Link href="/">{siteData?.main?.name}</Link>
            </p>
            <p className="jd-nav__role">{siteData?.main?.role}</p>
          </div>
        </div>

        <div className="cds--row">
          <div className="cds--col-sm-4">
            <LinksByRef
              refs={siteData.main?.navigation}
              className="jd-nav__items"
              text={true}
              onClick={() => closeNav()}
            />
          </div>
        </div>
        <div className="cds--row">
          <div className="cds--col-sm-4">
            <LinksByRef
              refs={siteData.main?.social}
              className="jd-nav__social"
              icon={true}
            />
          </div>
        </div>
        <div className="cds--row">
          <div className="cds--col-sm-4">
            <LinksByRef
              refs={siteData.main?.contact}
              className="jd-nav__contact"
              text={true}
            />
          </div>
        </div>
      </div>
      <div className="jd-nav__bg" tabIndex={0} ref={lastFocusItem} onFocus={_handleLastTab} />
    </nav>
  );

  function closeNav (e?: MouseEvent) {
    // focus on eightBitMe
    toggleNav();
  }

  function _handleLastTab (e: FocusEvent) {
    if (tabState.current) {
      firstFocusItem?.current?.focus();
    }
  }

  function handleKeyStateDown (e: KeyboardEvent) {
    if (e.key === 'Tab') {
      tabState.current = true;
    } else if (e.key === 'Escape') {
      closeNav();
    }
  }

  function handleKeyStateUp (e: KeyboardEvent) {
    if (e.key === 'Tab') {
      tabState.current = false;
    }
  }
}
