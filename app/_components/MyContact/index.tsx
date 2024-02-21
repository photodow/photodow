"use client";

import "./index.scss";

import { useContext } from "react";
import { SiteDataContext } from "../../_utils/contexts";
import LinksByRef from "../LinksByRef";
import { Ref } from "../../_types/Ref";
import getDataId from "../../_utils/getDataId";

const websiteRef: Ref = {
    _key: 'website',
    _override: {
      value:  addUrlId('jamesdow.me')
    }
}

export default function MyContact() {
  const siteData = useContext(SiteDataContext);

  return (
    <article className="jd-contact" id="education">
      {siteData && <h3 className="jd-contact__title jd-body__section-title">Contact</h3>}
      
      <LinksByRef
        refs={siteData?.main.contact}
        className="jd-contact__links"
        icon={true}
        text={true}
        size="md"
      />
      <hr className="jd-contact__divider" />
      <LinksByRef
        refs={[websiteRef, ...siteData?.main.social || []]}
        className="jd-contact__links"
        icon={true}
        value={true}
        size="md"
      />
    </article>
  );
}

function addUrlId (url: string) {
  const id = getDataId();
  return url + (id ? `?id=${getDataId()}` : '')
}