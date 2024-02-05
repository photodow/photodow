import "./page.scss";

import App from "./_components/App";
import AboutMe from "./_components/AboutMe";
import MyWork from "./_components/MyExperience";
import MyExperience from "./_components/MyWork";

export default function Home() {
  return (
    <App>
      <AboutMe />
      <MyExperience />
      <MyWork />
    </App>
  );
}