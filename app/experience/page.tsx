"use client";

import "./index.scss";

import App from "../_components/App";
import MyExperience from "../_components/MyExperience";

export default function Experience() {
  return (
    <App miniHeader={true}>
      <MyExperience />
    </App>
  );
}
