import { Overrides, Ref, RefList } from "../types/Ref";
import SiteData from "../types/SiteData";

export default function GetRefs (
  overrideRefs: Ref[] = [],
  scope: RefList,
  siteData: SiteData
): Overrides[] {
  const defaultRefs = siteData[scope];
  const refs = [];

  overrideRefs.sort((a, b) => (a.order || 0) - (b.order || 0));

  for (let i = 0; i < overrideRefs.length; i++) {
    const overrideRef = overrideRefs[i]; 

    for (let ii = 0; ii < defaultRefs.length; ii++) {
      const defaultRef = defaultRefs[ii];

      if (overrideRef.active !== false && overrideRef._key === defaultRef._key) {
        refs.push(Object.assign(defaultRef, overrideRef._override) as Overrides);
        break; // should be unique _key, move onto next overrideRef
      }
    }
  }

  return refs;
}