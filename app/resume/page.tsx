"use client";

import "./index.scss";

import App from "../_components/App";
import { useEffect } from "react";
import getDataId from "../_utils/getDataId";
import { Loading } from "@carbon/react";

export default function Resume() {

  // useEffect(() => {
  //   const id = getDataId() || '2024';
  //   location.href = `/resume/James Dow (${id}).pdf`; // redirect to resume
  // }, []);

  return (
    <App miniHeader={true}>
      <Loading active={true} withOverlay={true} />
    </App>
  );
}
