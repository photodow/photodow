"use client";

import "./index.scss";
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import Navigation from '../Navigation';
import EightBitMe from '../EightBitMe';
import { SiteDataContext } from "../../_utils/contexts";
import { SkeletonText } from "@carbon/react";
import { MainItem } from "../../_types/Main";
import { Icon, IconKeys } from "../Icon";

type Comp = {
  mini?: boolean,
  redirect?: boolean,
  contentEditable?: boolean
}

export default function Header({ mini = false, redirect, contentEditable = false }: Comp) {
  const siteData = useContext(SiteDataContext);

  const eightBitMe = useRef<HTMLButtonElement>(null);
  const navOpenFocusRef = useRef<HTMLButtonElement>(null);
  const scrollReminderTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const [navOpen, setNavOpen] = useState(false);
  const [scrollReminder, setScrollReminder] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleIsScrolled = useCallback(() => {
    setHasScrolled(true);
    clearTimeout(scrollReminderTimeout.current);
    document.removeEventListener('scroll', handleIsScrolled);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleIsScrolled);

    clearTimeout(scrollReminderTimeout.current);
    scrollReminderTimeout.current = setTimeout(() => {
      setScrollReminder(false)
    }, 1000 * 4);
  }, [handleIsScrolled]);

  useEffect(() => {
    const noScrollClass = 'jd-body--noscroll';
    const body = document.body.classList;

    if (navOpen && !body.contains(noScrollClass)) {
      body.add(noScrollClass);
      navOpenFocusRef.current?.focus();
    } else if (!navOpen && body.contains(noScrollClass)) {
      body.remove(noScrollClass);
      eightBitMe.current?.focus();
    }
  }, [navOpen]);

  return (
    <header data-carbon-theme="g10" contentEditable={contentEditable}
      className={`jd-header${mini ? ' jd-header--mini' : ''}${redirect ? ' jd-header--redirect' : ''}`}>
      <div className="jd-header__inner cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4">
            {renderTitle(siteData?.main)}
          </div>
        </div>
      </div>
      <Navigation open={navOpen} toggleNav={() => setNavOpen(!navOpen)} firstFocusItem={navOpenFocusRef} />
      <EightBitMe refObj={eightBitMe} onClick={() => setNavOpen(!navOpen)} miniMe={mini} />
      <p className={`jd-header__scroll-indicator${hasScrolled || scrollReminder ? ' jd-header__scroll-indicator--hide' : ''}`}>
        <Icon iconRef={IconKeys.ChevronDown} />
      </p>
    </header>
  );

  function renderTitle (main?: MainItem) {
    return (
      <h1 className={`jd-header__title${main ? ' jd-header__title--active' : ''}`}>
        <div className="jd-header__title-skeleton">
          <SkeletonText />
          <SkeletonText />
        </div>
        <span className="jd-header__name">{main?.name}</span>
        <span className="jd-header__role">{main?.role}</span>
      </h1>
    )
  }
}
