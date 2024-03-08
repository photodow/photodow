import { disableMotion } from "./disableMotion";

let interObserver: IntersectionObserver | null = null;
const visible = 'visible';
const fadeInClass = 'jd-fade-in';
const inViewClass = 'jd-in-view';

export function createFadeInObserver () {
    if (disableMotion('disableScrollFade')) {
        document.body.classList.add('disable-scroll-fade');
        return;
    }

    const main = document.querySelector('.jd-main');

    interObserver = new IntersectionObserver(entries => {
        for (const entry of entries) {
            const classList = entry.target.classList;
            if (entry.isIntersecting) {
                classList.add(visible);
            } else {
                classList.remove(visible);
            }
        }
    });

    const mutObserver = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node: Node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        handleFadeIn(node as Element);
                    }
                });
            }
        }
    });

    main && mutObserver.observe(main, {
        childList: true,
        subtree: true,
    });
}

function handleFadeIn (node: Element) {
    const nodes = node.querySelectorAll(`.${fadeInClass}, .${inViewClass}`);

    nodes.forEach((node: Element) => {
        interObserver?.observe(node);
    });

    if (node.classList.contains(fadeInClass) || node.classList.contains(inViewClass)) {
        interObserver?.observe(node);
    }
}