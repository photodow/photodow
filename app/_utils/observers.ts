import { disableMotion } from "./disableMotion";
import { updateURL } from "./updateURL";

const visible = "visible";
const fadeInClass = "jd-fade-in";
const inViewClass = "jd-in-view";
const pageAttr = "data-page";
let interObserver: IntersectionObserver | null = null;
let registerIntersectObserver: Set<HTMLElement>;

export function initObservers() {
    if (registerIntersectObserver) {
        return;
    }

    if (disableMotion("disableScrollFade")) {
        document.body.classList.add("disable-scroll-fade");
        return;
    }

    const main = document.body;

    document.querySelector("html")?.classList.add("initialized");

    registerIntersectObserver = new Set();

    interObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            const target = entry.target as HTMLElement;
            const classList = target.classList;

            if (entry.isIntersecting) {
                if (target.hasAttribute(pageAttr)) {
                    inPageChange(target.getAttribute(pageAttr) as string);
                }
                classList.add(visible);
            } else {
                classList.remove(visible);
            }
        }
    });

    registerIntersectObservers(main);

    const mutObserver = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                const nodes = mutation.addedNodes;
                for (let i = 0, l = nodes.length; i < l; i++) {
                    const node = nodes[i];
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        registerIntersectObservers(node as HTMLElement);
                    }
                }
            }
        }
    });

    main &&
        mutObserver.observe(main, {
            childList: true,
            subtree: true,
        });
}

function registerIntersectObservers(node: HTMLElement) {
    if (registerIntersectObserver.has(node)) {
        return;
    }

    if (
        node.classList.contains(fadeInClass) ||
        node.classList.contains(inViewClass) ||
        node.hasAttribute(pageAttr)
    ) {
        interObserver?.observe(node);
        registerIntersectObserver.add(node);
    }

    // registering children of node
    const children = node.querySelectorAll(
        `.${fadeInClass}, .${inViewClass}, [${pageAttr}]`,
    );

    for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i] as HTMLElement;

        if (!registerIntersectObserver.has(child)) {
            interObserver?.observe(child);
            registerIntersectObserver.add(child);
        }
    }
}

function inPageChange(id: string) {
    const url = new URL(location.toString());
    url.hash = id === "home" ? "" : `#${id}`;
    updateURL(url);
}
