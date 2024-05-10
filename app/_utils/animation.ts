import { animateFleetisticsBG } from "./fleetisticsBG";
import { animateIBMBG } from "./ibmBG";
import { animatePeacockBG } from "./peacockBG";

let animationRunning = false;
let isScrolling = false;
let isScrollingTimeout: NodeJS.Timeout;
let i = 1;

// should we build a registration model instead?
// aim for 30 frames per second vs 60?

export function startAnimation() {
    if (animationRunning) {
        return;
    }

    animate();

    window.addEventListener("scroll", () => pauseAnimationOnScroll(250));
    window.addEventListener("touchmove", () => pauseAnimationOnScroll(50));

    animationRunning = true;
}

function animate() {
    if (!isScrolling) {
        if (i % 6 === 0) {
            animatePeacockBG();
            animateIBMBG();
            animateFleetisticsBG();
            i = 1;
        } else {
            i++;
        }
    }

    requestAnimationFrame(animate);
}

export function animationTimeout(cb: Function, delay: number) {
    innerAnimate(performance.now());

    function innerAnimate(startTime: number) {
        if (startTime + delay <= performance.now() && !isScrolling) {
            cb();
        } else {
            requestAnimationFrame(() => innerAnimate(startTime));
        }
    }
}

function pauseAnimationOnScroll(delay: number) {
    isScrolling = true;

    // maybe add a delay here too?

    clearTimeout(isScrollingTimeout);
    isScrollingTimeout = setTimeout(() => {
        isScrolling = false;
    }, delay);
}
