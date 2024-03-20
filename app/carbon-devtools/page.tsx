"use client";

import { useEffect } from "react";
import redirectIfR from "../_utils/redirectIfR";

export default function CarbonDevtools() {
  useEffect(() => {
    redirectIfR('cdtc');
  }, []);

  return null;
}
