import { animateFleetisticsBG } from "./fleetisticsBG";
import { animateIBMBG } from "./ibmBG";
import { animatePeacockBG } from "./peacockBG";

const animationRunning = false;

// should we build a registration model instead?

export function startAnimation () {
    if (animationRunning) {
        return;
    }

    animate();
}

function animate() {
    animatePeacockBG();
    animateIBMBG();
    animateFleetisticsBG();
    requestAnimationFrame(animate);
}

export function animationTimeout (cb: Function, delay: number) {
    innerAnimate(performance.now());

    function innerAnimate (startTime: number) {
        if ((startTime + delay) <= performance.now()) {
            cb();
        } else {
            requestAnimationFrame(() => innerAnimate(startTime));
        }
    }
}
