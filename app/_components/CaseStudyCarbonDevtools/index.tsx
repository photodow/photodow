"use client";

import "./index.scss";

import { Button, Link as CarbonLink, Tag } from "@carbon/react";
import NextLink from "next/link";

const stats = [
    { value: "928", label: "active users today" },
    { value: "Featured", label: "on Chrome Web Store" },
    { value: "v3.0.0", label: "current release" },
    { value: "Still maintained", label: "by the Carbon team today" },
];

const screenshots = [
    {
        src: "/case-studies/carbon-devtools/screenshot-2.png",
        alt: "Grid overlay panel toggling Carbon's 2x grid on top of a live page",
        title: "Align to grid",
        desc: "Lays Carbon's 2x and mini-unit grids directly over a live page to check layout and alignment at a glance.",
    },
    {
        src: "/case-studies/carbon-devtools/screenshot-4.png",
        alt: "Token inspector panel highlighting spacing on a live page",
        title: "Identify tokens",
        desc: "Switches between color, spacing, and typography to see exactly which Carbon tokens a page is using.",
    },
    {
        src: "/case-studies/carbon-devtools/screenshot-5.png",
        alt: "Token detail tooltip showing a component's typography spec",
        title: "Inspect on hover",
        desc: "Hovering an element surfaces its exact token, here a heading's IBM Plex Sans spec down to the line-height.",
    },
    {
        src: "/case-studies/carbon-devtools/screenshot-6.png",
        alt: "Component inventory panel listing 289 total, 16 unique Carbon components found on a page",
        title: "Find components",
        desc: "Scans the live DOM and returns a searchable inventory of every Carbon component in use, with counts.",
    },
    {
        src: "/case-studies/carbon-devtools/screenshot-3.png",
        alt: "Full extension panel with breakpoint resizing, component list, specs, and grid overlay controls",
        title: "Check the grid at every breakpoint",
        desc: "Resizes the live page across Carbon's sm, md, lg, xlg, and max breakpoints with the grid overlay on, to catch alignment issues before they ship.",
    },
];

export function CaseStudyCarbonDevtools() {
    return (
        <article className="jd-case-study" data-carbon-theme="white" id="case-study">
            <header className="jd-case-study__hero">
                <div className="cds--grid">
                    <div className="cds--row">
                        <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-6 cds--offset-lg-3 cds--col-lg-8">
                            <NextLink
                                href="/"
                                className="jd-case-study__back"
                            >
                                ← Back
                            </NextLink>
                            <Tag type="high-contrast">Case study</Tag>
                            <h1 className="jd-case-study__title">
                                Carbon Devtools
                            </h1>
                            <p className="jd-case-study__subtitle">
                                A browser extension that helps design and
                                engineering teams verify Carbon Design System
                                usage on any live page, without leaving the
                                browser.
                            </p>
                            <ul className="jd-case-study__stats">
                                {stats.map((stat) => (
                                    <li key={stat.label}>
                                        <span className="jd-case-study__stat-value">
                                            {stat.value}
                                        </span>
                                        <span className="jd-case-study__stat-label">
                                            {stat.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="jd-case-study__actions">
                                <Button
                                    href="https://chromewebstore.google.com/detail/carbon-devtools/oejjaglcafcolafkjecfkoojgnpfpgca"
                                    target="_blank"
                                    kind="primary"
                                >
                                    Install on Chrome
                                </Button>
                                <Button
                                    href="https://github.com/photodow/devtools"
                                    target="_blank"
                                    kind="tertiary"
                                >
                                    View code
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="jd-case-study__section">
                <div className="cds--grid">
                    <div className="cds--row">
                        <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-6 cds--offset-lg-3 cds--col-lg-8">
                            <h2 className="jd-case-study__section-title">
                                The problem
                            </h2>
                            <p>
                                A design system only delivers consistency if
                                people can actually verify it&apos;s being
                                followed. At IBM, designers, developers, and
                                QA building pages with the Carbon Design
                                System had no fast way to check whether a live
                                page was actually aligned to Carbon&apos;s
                                grid, using the right tokens, or built from
                                the right components. That verification lived
                                in people&apos;s heads, in Figma files, or in
                                slow manual QA passes, not in the browser,
                                where the page actually lives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="jd-case-study__section jd-case-study__section--alt">
                <div className="cds--grid">
                    <div className="cds--row">
                        <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-6 cds--offset-lg-3 cds--col-lg-8">
                            <h2 className="jd-case-study__section-title">
                                What I designed and built
                            </h2>
                            <p>
                                I designed and built Carbon Devtools end to
                                end: from the initial interaction design in
                                Figma, through a React-based browser extension
                                architecture, to publishing it, promoting it
                                internally, and iterating on it from real user
                                feedback. It overlays directly on any live
                                page as a panel next to the browser toolbar:
                            </p>
                        </div>
                    </div>
                    <div className="cds--row jd-case-study__gallery">
                        {screenshots.map((shot, i) => (
                            <div
                                key={shot.src}
                                className={`cds--col-sm-4 cds--col-md-3 cds--col-lg-4 jd-case-study__gallery-item${i % 2 === 0 ? " cds--offset-md-1 cds--offset-lg-3" : ""}`}
                            >
                                <img src={shot.src} alt={shot.alt} />
                                <h3>{shot.title}</h3>
                                <p>{shot.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="jd-case-study__section">
                <div className="cds--grid">
                    <div className="cds--row">
                        <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-6 cds--offset-lg-3 cds--col-lg-8">
                            <h2 className="jd-case-study__section-title">
                                Key tradeoffs
                            </h2>
                            <p>
                                The extension is itself built with Carbon
                                components, but it also has to analyze how
                                Carbon is being used on the page it&apos;s
                                inspecting, which meant that, at times, two
                                separate copies of the design system were
                                running on the same page simultaneously. That
                                created
                                real conflicts between styles and scripts that
                                had to be deliberately isolated and worked
                                around, which limited how deep the live-page
                                analysis could safely go.
                            </p>
                            <p>
                                Rather than scoping and building the full
                                toolset up front, I prototyped individual
                                features in isolation first, often as small
                                CodePen experiments, before porting a working
                                feature into the extension itself. That let me
                                validate an idea cheaply, ship one capability
                                at a time, get real feedback from the teams
                                using it, and let that feedback shape what got
                                built next, rather than betting a long
                                timeline on a fully speculative feature set.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="jd-case-study__section jd-case-study__section--alt">
                <div className="cds--grid">
                    <div className="cds--row">
                        <div className="cds--col-sm-4 cds--offset-md-1 cds--col-md-6 cds--offset-lg-3 cds--col-lg-8">
                            <h2 className="jd-case-study__section-title">
                                Shipped, and still running
                            </h2>
                            <p>
                                Carbon Devtools shipped as a Chrome and
                                Firefox extension and grew, through internal
                                advocacy, to roughly 1,000 active users within
                                its first year at IBM. What I&apos;m proudest
                                of isn&apos;t a metric from that first year.
                                It&apos;s that the tool didn&apos;t stop there.
                                After I moved on, a small team inside the
                                Carbon Design System org picked it up and
                                still maintains it: shipping updates,
                                resolving bugs, and publishing it under
                                Carbon&apos;s own official Chrome Web Store
                                listing, where it&apos;s <strong>Featured</strong>,
                                on version 3.0.0, with{" "}
                                <strong>928 active users</strong> today.
                                Outliving the person who built it and getting
                                adopted as real infrastructure is the outcome
                                I care about most.
                            </p>
                            <p>
                                <CarbonLink
                                    href="https://chromewebstore.google.com/detail/carbon-devtools/oejjaglcafcolafkjecfkoojgnpfpgca"
                                    target="_blank"
                                >
                                    See the current listing on the Chrome Web
                                    Store
                                </CarbonLink>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
