"use client";

import { Grid, Column } from "@carbon/react";
import "./index.scss";

export default function GridOverlay() {
    return (
        <div className="jd-gridoverlay">
            <div className="jd-gridoverlay__mini-unit" />
            <div className="jd-gridoverlay__2xgrid cds--grid">
                <div className="jd-gridoverlay__2xrow cds--row">
                    <CreateColumns />
                </div>
            </div>
        </div>
    );

    function CreateColumns() {
        const Cols = [];

        for (let i = 0; i < 16; i++) {
            Cols.push(
                <div
                    className="jd-gridoverlay__2xcol cds--col-sm-1 cds--col-md-1 cds--col-lg-1"
                    key={`2xgrid${i}`}
                >
                    <div className="jd-gridoverlay__2xcol__inner"></div>
                </div>,
            );
        }

        return Cols;
    }
}
