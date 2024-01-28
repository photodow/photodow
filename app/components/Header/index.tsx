"use client";

import "./index.scss";
import { useEffect, useState } from 'react';

import Navigation from '../Navigation';
import EightBitMe from '../EightBitMe';

export default function Header() {

  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const noScrollClass = 'jd-body--noscroll';
    const body = document.body.classList;

    if (navOpen) {
      body.add(noScrollClass);
    } else {
      body.remove(noScrollClass);
    }
  }, [navOpen]);

  return (
    <header className="jd-header" data-carbon-theme="g10">
      <div className="jd-header__inner cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4">
            <h1 className="jd-header__title">
              <span className="jd-header__name">James Dow</span>
              <span className="jd-header__role">Web Designer & Developer</span>
            </h1>
          </div>
        </div>
      </div>
      <Navigation open={navOpen} />
      <EightBitMe onClick={() => setNavOpen(!navOpen)} />
    </header>
  );
}
