"use client";

import "./index.scss";

import { PortfolioCard, PortfolioItem } from "../../_types/Portfolio";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import { Ref, RefList } from "../../_types/Ref";
import GetRefs from "../../_utils/getRefs";
import { Image } from "../../_types/Image";
import LinksByRef from "../LinksByRef";

export default function PortfolioCard({ image, title, description, actions }: PortfolioCard) {
  const siteData = useContext(SiteDataContext);
  const cardRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const setObserver = useCallback(() => {
    const observer = new IntersectionObserver(entries => {
      setVisible(entries[0].isIntersecting);
    });
    observer.observe(cardRef.current as Element);
  }, []);

  useEffect(() => {
    setObserver();
  }, [setObserver]);

  return (
    <article ref={cardRef} className={`jd-portfolio-card${visible ? ' visible' : ''}`}>
        <div className="jd-portfolio-card__cover">
          {renderCover(image)}
        </div>
        <div className="jd-portfolio-card__content">
          <h4 className="jd-portfolio-card__title">{title}</h4>
          <p className="jd-portfolio-card__description">{description}</p>
          <LinksByRef
            className="jd-portfolio-card__actions"
            refs={actions}
            text={true}
            icon={true}
          />
        </div>
    </article>
  );

  function renderCover (cover: Ref | undefined) {
    if (!cover || !siteData?.main) {
        return null;
    }

    const image = (GetRefs([cover], RefList.Images, siteData) as Image[])[0];

    return !image ? null : (
        <img className="jd-portfolio-card__img" src={image.src} alt={image.alt} />
    );
  }
}