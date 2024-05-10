"use client";

import { useEffect } from "react";
import redirectIfR from "../_utils/redirectIfR";

export default function Codepen() {
    useEffect(() => {
        redirectIfR("li");
    }, []);

    return null;
}
