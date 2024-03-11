import "./index.scss";

import App from "../_components/App";
import AboutMe from "../_components/AboutMe";

import { Metadata } from 'next';
import { descriptionBase, roleDefault } from "../_utils/metadata";
import { HeaderSize } from "../_types/Header";

const title = `About James Dow`;
const description = `Learn a little about James Dow. ${roleDefault}.`;

export const metadata: Metadata = {
  title,
  description: `${description} ${descriptionBase}`,
  twitter: {
    title,
    description: `${description} ${descriptionBase}`
  },
  openGraph: {
    title,
    description: `${description} ${descriptionBase}`
  }
};

export default function About() {
  return (
    <App headerSize={HeaderSize.Small}>
      <AboutMe />
    </App>
  );
}
