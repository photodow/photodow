"use client";

import "./index.scss";

import Header from "../../_components/Header";
import Slant from "../../_components/Slant";
import { CarbonTheme } from "../../_types/carbon";
import { HeaderSize } from "../../_types/Header";
import { useCallback, useEffect, useState } from "react";
import urlParams from "../../_utils/urlParams";

interface Comp {
    headerSize?: HeaderSize;
    theme?: CarbonTheme;
    children?: React.ReactNode;
}

export function DefaultTemplate({
    headerSize,
    theme = CarbonTheme.g90,
    children,
}: Comp) {
    return (
        <>
            <Header size={headerSize} />
            <main className="jd-main" data-carbon-theme={theme}>
                {children}
            </main>
            <Slant Type="footer" />
        </>
    );
}
