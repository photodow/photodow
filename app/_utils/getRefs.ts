import { merge, mergeWith } from "lodash";
import { KeyRef, Overrides, Ref, RefCollections, RefList } from "../_types/Ref";
import { SiteData } from "../_types/SiteData";
import handleOverride from "./handleOverride";

export default function GetRefs(
    overrideRefs: Ref[] = [],
    scope: RefList,
    siteData: Partial<SiteData>,
): Overrides[] {
    const defaultRefs = siteData[scope] as RefCollections;

    if (!defaultRefs || !overrideRefs || !overrideRefs.length) {
        return [];
    }

    const defaultKeys: KeyRef[] = Object.keys(defaultRefs);

    if (!defaultKeys.length) {
        return [];
    }

    const refs = [];

    overrideRefs.sort((a, b) => (a.order || 0) - (b.order || 0));

    for (let i = 0; i < overrideRefs.length; i++) {
        const overrideRef = overrideRefs[i];

        for (let ii = 0; ii < defaultKeys.length; ii++) {
            const defaultKey = defaultKeys[ii];
            const defaultRef = defaultRefs[defaultKey];
            const overrideKey = overrideRef._key;

            if (overrideRef.active !== false && defaultKey === overrideKey) {
                // refs.push(Object.assign({}, defaultRef, overrideRef._override) as Overrides);

                refs.push(
                    mergeWith(
                        Object.assign({}, defaultRef),
                        overrideRef._override,
                        handleOverride,
                    ) as Overrides,
                );
                break; // should be unique _key, move onto next overrideRef
            }
        }
    }

    return refs;
}
