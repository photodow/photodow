"use client";

import "./index.scss";

import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import LinksByRef from "../LinksByRef";
import Skills from "../Skills";
import AboutLoading from "./loading";
import { Ref } from "../../_types/Ref";

type Comp = {
  replaceRefs?: Ref[],
  addedRefs?: Ref[],
  nameRoleOverride?: boolean,
}

export default function AboutMe({ nameRoleOverride, replaceRefs, addedRefs = [] }: Comp) {
  const main = useContext(SiteDataContext)?.main;
  const { name, title, role, subtitle, skills, description, actions } = main || {};

  const _title = nameRoleOverride ? name : title;
  const _subtitle = nameRoleOverride ? role : subtitle;
  const _description = description;
  const _actions = replaceRefs || actions || [];
  const _skills = skills;

  return (
    <article className={`jd-about${main ? ' jd-about--visible' : ''}`} data-carbon-theme="g10" id="about">
      <div className="jd-about__inner">
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-sm-4 cds--offset-md-3 cds--col-md-5 cds--col-lg-8 cds--offset-xlg-5">
              <AboutLoading />
              {!_title ? null : <h1 className="jd-about__name jd-fade-in">{_title}</h1>}
              {!_subtitle ? null : <h2 className="jd-about__role jd-fade-in">{_subtitle}</h2>}
              <Skills items={_skills} color="warm-gray" className="jd-fade-in" />
              {!_description ? null : <p className="jd-about__desc jd-fade-in">{_description}</p>}
              <LinksByRef className="jd-fade-in" refs={[..._actions, ...addedRefs]} text={true} icon={true}  />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}