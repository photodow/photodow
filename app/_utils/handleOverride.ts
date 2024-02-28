import { merge } from "lodash";

export default function handleOverride (value: any, srcValue: any, key: string, object: any, source: any) {
    if (Array.isArray(value) || Array.isArray(srcValue)) {
        const mergedItems: any[] = srcValue;

        srcValue.forEach((srcVal: any, srcIndex: number) => {
            if (srcVal._key) {
                value.forEach((val: any) => {
                    if (srcVal._key && srcVal._key === val._key) {
                        mergedItems[srcIndex] = merge(val, srcVal);
                    }
                });
            }
        });

        return mergedItems.length ? mergedItems : removeDuplicates(merge(value, srcValue));
    }
}

function removeDuplicates (src: any[]) {
    const newArray: any[] = [];

    for (let i = 0; i < src.length; i++) {
        const item = src[i];
        let repeated = false;

        if (newArray.indexOf(item) > -1) {
            repeated = true;
        } else {
            for (let ii = 0; ii < newArray.length; ii++) {
                const checkedItem = newArray[ii];

                if (checkedItem._key && checkedItem._key === item._key) {
                    repeated = true;
                    break;
                }
            }
        }

        if (!repeated) {
            newArray.push(item);
        }
    }

    return newArray;
}
