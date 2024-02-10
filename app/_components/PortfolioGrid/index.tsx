"use client";

import "./index.scss";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import { PortfolioItem } from "../../_types/Portfolio";
import GetRefs from "../../_utils/getRefs";
import { Ref, RefList } from "../../_types/Ref";
import PortfolioCard from "../PortfolioCard";
import LoadingPortfolioGrid from "./loading";

type Comp = {
  filterBy?: string,
  isLoading?: boolean
}

export default function PortfolioGrid({ filterBy = '', isLoading }: Comp) {
  const siteData = useContext(SiteDataContext);

  const loaded = useRef(false);

  const [items, setItems] = useState<PortfolioItem[] | null>(null);

  const setPortfolioItems = useCallback((items: PortfolioItem[]) => {
    setItems(items);
  }, []);

  useEffect(() => {
    loaded.current = true;
    if (siteData) {
      const data = GetRefs(siteData.main.portfolio.items as Ref[], RefList.Portfolio, siteData) as PortfolioItem[];

      setPortfolioItems(data.filter(({ card }) => {
        const value = filterBy.toLowerCase().trim();
        const title = card.title.toLowerCase();
        const description = (card.description || '').toLowerCase();
        const skills = JSON.stringify(card.skills || '').toLowerCase();
        let actions = JSON.stringify(card.actions || '').toLowerCase();

        return (
          title.indexOf(value) > -1
          || description.indexOf(value) > -1
          || skills.indexOf(value) > -1
          || actions.indexOf(value) > -1
        )
      }));
    }
  }, [setPortfolioItems, siteData, filterBy]);

  return (
    <article className={`jd-portfolio-grid${!isLoading ? ' jd-portfolio-grid--active' : ''}`}>
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-6 cds--offset-lg-2 cds--col-lg-12">
            <LoadingPortfolioGrid className="jd-portfolio-grid__items" />
            {renderPortfolioGridItems()}
            </div>
          </div>
        </div>
    </article>
  );

  function renderPortfolioGridItems () {
    if (!items) {
      return null;
    }

    return !items.length ? <EmptyGridItems /> : (
        <ul className="jd-portfolio-grid__items">
            {items.map(({ card }) => {
                return (
                  <li className="jd-portfolio-grid__item jd-fade-in" key={card.title}>
                      <PortfolioCard {...card} />
                  </li>
                )
            })}
        </ul>
    )
  }

  function EmptyGridItems () {
    return (
      <p className="jd-portfolio-grid__empty">{`Looks like this information is on vacation and didn't leave a forwarding address.`}</p>
    )
  }
}