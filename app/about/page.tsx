import "./index.scss";

import App from "../_components/App";
import AboutMe from "../_components/AboutMe";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `About James Dow`,
}

export default function About() {
  return (
    <App miniHeader={true}>
      <AboutMe />
    </App>
  );
}
