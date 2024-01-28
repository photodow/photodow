"use client";

import { Link } from '@carbon/react';
import "./index.scss";

// todo: animate in

type NavItem = {
  text: string,
  href: string,
  target?: string,
  icon?: string
}

export default function Navigation({ open }: { open: boolean }) {
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
      href: 'https://linkedin.com/in/photodow'
    },
    {
      text: 'Codepen',
      href: 'https://codepen.io/photodow'
    },
    {
      text: 'GitHub',
      href: 'https://github.com/photodow'
    }
  ];

  return (
    <nav className={`jd-nav${open ? ' jd-nav--open' : ''}`}>
      <div className="cds--grid jd-nav__inner">
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
                    <a className="jd-nav__link" href={link.href} target={link.target}>{link.text}</a>
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
                    <a className="jd-nav__social-link" href={link.href} target={link.target}>{link.text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="jd-nav__bg" />
    </nav>
  );
}
