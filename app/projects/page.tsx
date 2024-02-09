"use client";

import "./index.scss";

import App from "../_components/App";
import MyWork from "../_components/MyWork";

export default function Work() {
  return (
    <App miniHeader={true}>
      <MyWork />
    </App>
  );
}
