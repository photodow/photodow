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
    const [editableContent, setEditableContent] = useState<boolean>(false);

    const setToEditContent = useCallback(
        () => setEditableContent(urlParams().has("edit")),
        [],
    );

    useEffect(() => {
        setToEditContent();
    }, [setToEditContent]);

    return (
        <>
            <Header size={headerSize} contentEditable={editableContent} />
            <main
                className="jd-main"
                contentEditable={editableContent}
                data-carbon-theme={theme}
            >
                {children}
            </main>
            <Slant Type="footer" />
        </>
    );
}
