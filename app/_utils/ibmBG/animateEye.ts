import { animationTimeout } from "../animation";
import { random, uniqueRandom } from "../random";

const classBase = 'ibm-rebus-eye';
const className = `${classBase}--closed`;

export function animateEye () {
    const items = document.querySelectorAll(`.${classBase}.visible`);
    const index = uniqueRandom({ id: 'eye-index', end: items.length - 1 });
    const item = items[index];

    if (!item) {
        return;
    }

    const delay = random(100, 500);
    const duration = random(100, 500);

    // start
    animationTimeout(() => {
        item.classList.add(className);

        // end
        animationTimeout(() => {
            item.classList.remove(className);
        }, duration);
    }, delay);
}