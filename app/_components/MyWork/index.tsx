"use client";

import "./index.scss";

import { KeyboardEvent, useContext, useRef, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import PortfolioGrid from "../PortfolioGrid";
import { Search } from "@carbon/react";
import Slant from "../Slant";

export default function MyWork() {
  const siteData = useContext(SiteDataContext);

  const keyupTimeout = useRef<NodeJS.Timeout>();

  const [searchValue, setSearchValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  return (
    <Slant Type="article" className="jd-work jd-section--slant" id="work">
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-3 cds--offset-lg-2 cds--col-lg-8">
              <h3 className="jd-work__title jd-body__section-title">My Projects</h3>
            </div>
            <div className="cds--col-sm-4 cds--col-md-3 cds--col-lg-4">
              <Search
                className="jd-work__search"
                labelText=''
                placeholder="Search projects..."
                onKeyUp={handleSearch}
                onClear={() => setSearchValue('')}
              />
            </div>
          </div>
        </div>
        <PortfolioGrid filterBy={searchValue} isLoading={!siteData || isTyping} />
    </Slant>
  );

  function handleSearch (e: KeyboardEvent<HTMLInputElement>) {
    setIsTyping(true);
    clearTimeout(keyupTimeout.current);
    keyupTimeout.current = setTimeout(() => {
      setSearchValue((e.target as HTMLInputElement).value as string);
      setIsTyping(false);
    }, 1000);
  }
}