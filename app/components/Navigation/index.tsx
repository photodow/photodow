"use client";

import "./index.scss";
import CloseIcon from "../CloseIcon";
import { useRef, KeyboardEvent, FocusEvent, RefObject, ReactElement } from "react";
import LogoLinkedin from "@carbon/icons-react/lib/LogoLinkedin";
import LogoGithub from "@carbon/icons-react/lib/LogoGithub";
import LogoCodepen from "../LogoCodepen";

// todo: add phone and email to nav

type NavItem = {
  text: string,
  href: string,
  target?: string,
  icon?: ReactElement
}

const links: NavItem[] = [
  {
    text: 'About',
    href: '#about'
  },
  {
    text: 'Resume',
    href: '/james-dow-resume.pdf',
    target: '_blank'
  },
  {
    text: 'Portfolio',
    href: 'https://github.com/photodow',
    target: '_blank'
  },
  {
    text: 'Contact',
    href: '#contact'
  }
];

const socialLinks: NavItem[] = [
  {
    text: 'LinkedIn',
    href: 'https://linkedin.com/in/photodow',
    icon: <LogoLinkedin size={32} />
  },
  {
    text: 'Codepen',
    href: 'https://codepen.io/photodow',
    icon: <LogoCodepen />
  },
  {
    text: 'GitHub',
    href: 'https://github.com/photodow',
    icon: <LogoGithub size={32} />
  }
];

export default function Navigation({ open, toggleNav, firstFocusItem }: { open: boolean, toggleNav: Function, firstFocusItem: RefObject<HTMLButtonElement> }) {

  const tabState = useRef(false);
  const lastFocusItem = useRef<HTMLDivElement>(null);

  return (
    <nav className={`jd-nav${open ? ' jd-nav--open' : ''}`} onKeyDown={handleKeyStateDown} onKeyUp={handleKeyStateUp}>
      <div className="cds--grid jd-nav__inner">
        <CloseIcon
          active={open}
          onClick={() => closeNav()}
          refObj={firstFocusItem}
        />
        <div className="cds--row">
          <div className="cds--col-sm-4 jd-nav__header">
            <p className="jd-nav__name">James Dow</p>
            <p className="jd-nav__role">Design Technologist</p>
          </div>
        </div>
        <div className="cds--row">
          <div className="cds--col-sm-4">
            <ul className="jd-nav__items">
              {links.map(link => {
                return (
                  <li className="jd-nav__item" key={link.text}>
                    <a className="jd-nav__link" href={link.href} target={link.target} onClick={() => closeNav()}>{link.text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="cds--row">
          <div className="cds--col-sm-4">
            <ul className="jd-nav__social-items">
              {socialLinks.map(link => {
                return (
                  <li className="jd-nav__social-item" key={link.text}>
                    <a className="jd-nav__social-link" href={link.href} target={link.target} onClick={() => closeNav()}>{link.icon}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="cds--row">
          <div className="cds--col-sm-4">
          </div>
        </div>
      </div>
      <div className="jd-nav__bg" tabIndex={0} ref={lastFocusItem} onFocus={_handleLastTab} />
    </nav>
  );

  function closeNav () {
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
