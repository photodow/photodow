import "./index.scss";

import App from "../_components/App";
import AboutMe from "../_components/AboutMe";
import MyExperience from "../_components/MyExperience";
import MyWork from "../_components/MyWork";

export default function Home() {
  return (
    <App miniHeader={true}>
      <AboutMe />
      <MyExperience />
      {/* <MyWork /> */}
    </App>
  );
}