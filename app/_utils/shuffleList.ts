import { random } from "./random";

export function shuffleList(list: any[]) {
    const copiedList = [...list];
    const newList = [];

    while (copiedList.length > 0) {
        newList.push(copiedList.splice(random(0, copiedList.length - 1), 1)[0]);
    }

    return newList;
}
