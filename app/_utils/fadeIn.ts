import urlParams from "./urlParams";

let interObserver: IntersectionObserver | null = null;
const visible = 'visible';
const className = 'jd-fade-in';

export function createFadeInObserver () {
    if (urlParams().has('disableScrollFade')) {
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
    const nodes = node.querySelectorAll(`.${className}`);

    nodes.forEach((node: Element) => {
        interObserver?.observe(node);
    });

    if (node.classList.contains(className)) {
        interObserver?.observe(node);
    }
}