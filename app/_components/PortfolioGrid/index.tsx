"use client";

import "./index.scss";

// - [] data for items
// - [] basic card
// - [] build in cards in view

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import { PortfolioItem } from "../../_types/Portfolio";
import GetRefs from "../../_utils/getRefs";
import { Ref, RefList } from "../../_types/Ref";
import PortfolioCard from "../PortfolioCard";

export default function PortfolioGrid() {
  const portfolioItems = useRef<PortfolioItem[] | null>(null);
  const siteData = useContext(SiteDataContext);
  const [items, setItems] = useState<PortfolioItem[]>([]);

  const setPortfolioItems = useCallback((data: PortfolioItem[]) => {
    setItems(data);
  }, []);

  useEffect(() => {
    if (siteData) {
      setPortfolioItems(GetRefs(siteData.main.portfolio.items as Ref[], RefList.Portfolio, siteData) as PortfolioItem[]);
    }
  }, [setPortfolioItems, siteData]);

  return (
    <article className="jd-portfolio-grid">
        <div className="cds--grid">
          <div className="cds--row">
            {renderPortfolioGridItems()}
          </div>
        </div>
    </article>
  );

  function renderPortfolioGridItems () {
    return (
        <ul className="jd-portfolio-grid__items cds--col-sm-3 cds--offset-md-1 cds--col-md-6 cds--offset-lg-2 cds--col-lg-12">
            {!items.length ? null : items.map(({ card }) => {
                return (
                  <li className="jd-portfolio-grid__item jd-fade-in" key={card.title}>
                      <PortfolioCard {...card} />
                  </li>
                )
            })}
        </ul>
    )
  }
}