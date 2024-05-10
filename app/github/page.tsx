"use client";

import { useEffect } from "react";
import redirectIfR from "../_utils/redirectIfR";

export default function Github() {
    useEffect(() => {
        redirectIfR("gh");
    }, []);

    return null;
}
