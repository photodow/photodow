"use client";

import "./index.scss";

import { useEffect } from "react";
import { getSiteData } from "../_utils/firebase";

export default function Resume() {
  useEffect(() => {
    getSiteData().then(d => {
      location.href = '/resume/' + d.main.resume;
    });
  }, []);

  return (<p>Loading...</p>);
}
