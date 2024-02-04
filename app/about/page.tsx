import "./index.scss";

import App from "../_components/App";
import AboutMe from "../_components/AboutMe";

export default function About() {
  return (
    <App miniHeader={true}>
      <AboutMe />
    </App>
  );
}
