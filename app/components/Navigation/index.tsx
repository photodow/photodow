"use client";

import { Link } from '@carbon/react';
import "./index.scss";

// todo: mobile navigation
// todo: open when clicked
// todo: animate in

export default function Navigation() {
  const sections = ['About', 'Resume', 'Portfolio', 'Contact'];
  const links: React.ReactNode[] = [];

  sections.forEach(section => {
    links.push(
      <li className="jd-nav__item" key={section}>
        <Link className="jd-nav__link" href={`#${section}`}>{section}</Link>
      </li>
    );
  });

  return (
    <nav className="jd-nav">
      <ul className="jd-nav__items">
        {links}
      </ul>
    </nav>
  );
}
