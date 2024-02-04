"use client";

import "./index.scss";

import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { getData } from "../_utils/firebase";
import { Redirect } from "../_types/Redirect";
import { Link, Search } from "@carbon/react";

export default function Resume() {
  const keyupTimeout = useRef<NodeJS.Timeout>();
  const [links, setLinks] = useState<Redirect[] | null>(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getData('redirects').then(links => {
      const keys = Object.keys(links);
  
      setLinks(keys.map(key => {
        const link = links[key];
        link.key = key;
        return link;
      }));
    });
  }, []);

  return (
    <div className="jd-redirects cds--grid">
      <div className="cds--row">
        <div className="cds--col jd-redirects__main">
          <h1 className="jd-redirects__main-title">Redirect Library</h1>
          <p className="jd-redirects__main-desc">A list of redirect links setup for redirection and sharing.</p>
        </div>
      </div>
      <div className="cds--row">
        <div className="cds--col">
          <Search className="jd-redirects__search" labelText="Search" placeholder="Search links..." onKeyUp={handleSearch} onClear={() => setSearchValue('')} />
        </div>
      </div>
      {renderLinks(links) as ReactNode}
    </div>
  );

  function renderLinks (links: Redirect[] | null): ReactNode {
    if (!links) {
      return renderEmptyState();
    }

    links = links.filter(({ key, description, title, url }) => {
      const value = searchValue.toLowerCase();
      return (
        description.toLowerCase().indexOf(value) > -1
        || title.toLowerCase().indexOf(value) > -1
        || url.toLowerCase().indexOf(value) > -1
        || (key && key.toLowerCase().indexOf(value) > -1)
      )
    });

    return !links.length ? renderEmptyState() : 
      <ul className="cds--row jd-redirects__items">
        {links.map(({ key, description, title, url }) => {
          return (
            <li key={key} className="jd-redirects__item cds--col-sm-4 cds--col-md-4 cds--col-lg-4">
              <div className="jd-redirects__item-inner">
                <h2 className="jd-redirects__key">{key}</h2>
                <h3 className="jd-redirects__title">
                  <Link href={url} target="_blank">{title}</Link>
                </h3>
                <p className="jd-redirects__desc">{description}</p>
                <p className="jd-redirects__redirect-link"><Link href={`https://jamesdow.me?r=${key}`} target="_blank">{`jamesdow.me?r=${key}`}</Link></p>
              </div>
            </li>
          );
        })}
      </ul>;
  }

  function handleSearch (e: KeyboardEvent<HTMLInputElement>) {
    clearTimeout(keyupTimeout.current);
    keyupTimeout.current = setTimeout(() => {
      setSearchValue((e.target as HTMLInputElement).value as string)
    }, 200);
  }

  function renderEmptyState () {
    if (!links) {
      return <p className="jd-redirects__loading">{`Loading...`}</p>
    }

    return <p className="jd-redirects__empty">{`Sorry, we couldn't find any matching results.`}</p>
  }
}
