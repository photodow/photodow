"use client";

import Navigation from '../Navigation';
import EightBitMe from '../EightBitMe';

import "./index.scss";

export default function Header() {

  return (
    <header className="jd-header" data-carbon-theme="g10">
      <div className="jd-header__inner cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-3">
            <h1 className="jd-header__title">
              <span className="jd-header__name">James Dow</span>
              <span className="jd-header__role">Web Designer & Developer</span>
            </h1>
          </div>
          <div className="cds--col-sm-4 cds--col-md-5">
            <Navigation />
          </div>
        </div>
      </div>
      <EightBitMe />
    </header>
  );
}

function openMobileNav () {
  // todo: if given breakpoint
  document.body.classList.add('active-mobile-nav');
}
