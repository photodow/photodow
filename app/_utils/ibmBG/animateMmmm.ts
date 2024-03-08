import { animationTimeout } from "../animation";
import { uniqueRandom } from "../random";

const delay = 75; // fixed delay
const classBase = 'ibm-rebus-m';
const className = `${classBase}__row--hide`;
const classRow = `${classBase}__row`;

export function animateMmmm () {
    const items = document.querySelectorAll(`.${classBase}.visible`);
    const index = uniqueRandom({ id: 'mm-index', end: items.length - 1 });
    const item = items[index];

    if (!item) {
        return;
    }

    const rows = item.querySelectorAll(`.${classRow}`);
    const duration = delay * rows.length * .75;

    for (let i = 0, l = rows.length; i < l; i++) {
        animateRow(rows[i], (delay * i) + delay, duration);
    }
}

function animateRow (row: Element, rowDelay: number, duration: number) {
    // start
    animationTimeout(() => {
        row.classList.add(className);

        // end
        animationTimeout(() => {
            row.classList.remove(className);
        }, duration);
    }, rowDelay);
}