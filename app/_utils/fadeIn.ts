let interObserver: IntersectionObserver | null = null;
const visible = 'visible';
const className = 'jd-fade-in';
const interOptions = {
    // rootMargin: '20% 0% 20% 0%'
    threshold: .5
}

export function createFadeInObserver () {
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
    }, interOptions);

    const mutObserver = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node: Node) => {
                    handleFadeIn(node as Element);
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