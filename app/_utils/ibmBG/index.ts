import { MutableRefObject } from "react";
import ibmRebus from "./ibm-rebus";
import { disableMotion } from "../disableMotion";

// todo:
// - [] if same random item, run it again
// todo: add a motion pause button?
// 

let rebusBG: Element;
let parentContainer: ParentNode | null;
const icons = [ibmRebus.Eye, ibmRebus.Bee, ibmRebus.M];
const columns = 4;
const rows = 6;
const loops = rows * columns / icons.length;
const animations = [EyeBlinkMotion, BeeWingMotion, MMmmMotion];

export function initIBMBG (key: string, container: MutableRefObject<HTMLDivElement>) {
    if (!container || rebusBG) {
        return;
    }

    parentContainer = container.current;
    rebusBG = document.createElement('div');
    rebusBG.classList.add('jd-ibm__bg');

    for (let i = 0; i < loops; i++) {
        rebusBG.innerHTML += icons[0] + icons[1] + icons[2];
    }

    container.current.append(rebusBG);
    randomAnimation();
}

function randomAnimation () {
    setInterval(() => {
        if (
            (parentContainer as Element)?.classList.contains('visible') &&
            !disableMotion('disableIbmMotion')) {
            animations[random(0, animations.length - 1)]();
        }
    }, 2000);
}

function EyeBlinkMotion() {
    const classBase = 'ibm-rebus-eye';
    const className = `${classBase}--closed`;
    const items = document.querySelectorAll(`.${classBase}`);
    const index = random(0, items.length - 1);
    const item = items[index];

    if (!item) {
        return;
    }

    const delay = random(100, 500);
    const duration = random(100, 500);

    setTimeout(() => {
        item.classList.add(className);

        setTimeout(() => {
            item.classList.remove(className);
        }, duration);
    }, delay);
}

function BeeWingMotion() {
    const classBase = 'ibm-rebus-bee';
    const className = `${classBase}--shake`;
    const items = document.querySelectorAll(`.${classBase}`);
    const index = random(0, items.length - 1);
    const item = items[index];

    if (!item) {
        return;
    }
    const delay = random(100, 500);
    const count = random(5, 10);
    const duration = random(500, 1000);
    const wings = item.querySelectorAll(`.${classBase}__wing`);

    for (let i = 0, l = wings.length; i < l; i++) {
        (wings[i] as HTMLElement).style.animationDuration = (duration / 1000 / count) + 's';
        (wings[i] as HTMLElement).style.animationIterationCount = `${count}`;
    }

    setTimeout(() => {
        item.classList.add(className);

        setTimeout(() => {
            item.classList.remove(className);
        }, duration);
    }, delay);
}

function MMmmMotion () {
    const classBase = 'ibm-rebus-m';
    const className = `${classBase}__row--hide`;
    const items = document.querySelectorAll(`.${classBase}`);
    const index = random(0, items.length - 1);
    const item = items[index];

    if (!item) {
        return;
    }

    const delay = 75;
    const rows = item.querySelectorAll(`.${classBase}__row`);
    const duration = delay * rows.length * .75;

    for (let i = 0, l = rows.length; i < l; i++) {
        ((row, iteratedDelay) => {
            setTimeout(() => {
                row.classList.add(className);

                setTimeout(() => {
                    row.classList.remove(className);
                }, duration);
            }, iteratedDelay);
        })(rows[i], (delay * i) + delay);
    }
}

function random (start: number, end: number) {
    return Math.round(Math.random() * end) + start;
}