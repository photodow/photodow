"use client";

import "./index.scss";
import { useContext, useEffect, useRef, useState } from 'react';

import Navigation from '../Navigation';
import EightBitMe from '../EightBitMe';
import { SiteDataContext } from "../../_utils/contexts";

type Comp = {
  mini?: boolean
}

export default function Header({ mini = false }: Comp) {

  const siteData = useContext(SiteDataContext);

  const eightBitMe = useRef<HTMLButtonElement>(null);
  const navOpenFocusRef = useRef<HTMLButtonElement>(null);

  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const noScrollClass = 'jd-body--noscroll';
    const body = document.body.classList;

    if (navOpen) {
      body.add(noScrollClass);
      navOpenFocusRef.current?.focus();
    } else {
      body.remove(noScrollClass);
      eightBitMe.current?.focus();
    }
  }, [navOpen]);

  return (
    <header className={`jd-header${mini ? ' jd-header--mini' : ''}`} data-carbon-theme="g10">
      {!mini && (<div className="jd-header__inner cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4">
            <h1 className="jd-header__title">
              <span className="jd-header__name">{siteData?.main?.name}</span>
              <span className="jd-header__role">{siteData?.main?.role}</span>
            </h1>
          </div>
        </div>
      </div>)}
      <Navigation open={navOpen} toggleNav={() => setNavOpen(!navOpen)} firstFocusItem={navOpenFocusRef} />
      <EightBitMe refObj={eightBitMe} onClick={() => setNavOpen(!navOpen)} miniMe={mini} />
    </header>
  );
}
