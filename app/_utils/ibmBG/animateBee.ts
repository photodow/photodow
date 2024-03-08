import { animationTimeout } from "../animation";
import { random, uniqueRandom } from "../random";

const classBase = 'ibm-rebus-bee';
const className = `${classBase}--shake`;
const classWing = `${classBase}__wing`;

export function animateBee() {
    const items = document.querySelectorAll(`.${classBase}.visible`);
    const index = uniqueRandom({ id: 'bee-index', end: items.length - 1 });
    const item = items[index];

    if (!item) {
        return;
    }
    
    const delay = random(100, 500);
    const count = random(5, 10);
    const duration = random(500, 1000);
    const wings = item.querySelectorAll(`.${classWing}`);

    for (let i = 0, l = wings.length; i < l; i++) {
        (wings[i] as HTMLElement).style.animationDuration = (duration / 1000 / count) + 's';
        (wings[i] as HTMLElement).style.animationIterationCount = `${count}`;
    }

    // start
    animationTimeout(() => {
        item.classList.add(className);

        // end
        animationTimeout(() => {
            item.classList.remove(className);
        }, duration);
    }, delay);
}