import { MutableRefObject } from "react";
import ibmRebus from "./ibm-rebus";
import { disableMotion } from "../disableMotion";
import { random, uniqueRandom } from "../random";
import { animateEye } from "./animateEye";
import { animateBee } from "./animateBee";
import { animateMmmm } from "./animateMmmm";
import { shuffleList } from "../shuffleList";

let rebusBG: Element;
let container: ParentNode | null;
const icons = [ibmRebus.Eye, ibmRebus.Bee, ibmRebus.M];
const columns = 4;
const rows = 6;
const loops = (rows * columns) / icons.length;
const animationInterval = 2000;
const animations = shuffleList([animateEye, animateBee, animateMmmm]);

export function initIBMBG(
    key: string,
    containerRef: MutableRefObject<HTMLDivElement>,
) {
    if (!containerRef || containerRef.current === container) {
        return;
    }

    container = containerRef.current;
    rebusBG = document.createElement("div");
    rebusBG.classList.add("jd-ibm__bg");

    for (let i = 0; i < loops; i++) {
        rebusBG.innerHTML += icons[0] + icons[1] + icons[2];
    }

    containerRef.current.append(rebusBG);
}

let lastRunTime: number;

export function animateIBMBG() {
    const now = performance.now();
    if (
        (!lastRunTime || lastRunTime + animationInterval <= now) &&
        (container as Element)?.classList.contains("visible") &&
        !disableMotion("disableIbmMotion")
    ) {
        animations[
            uniqueRandom({
                id: "ibm-animation-index",
                end: animations.length - 1,
            })
        ]();
        lastRunTime = now;
    }
}
