import "./index.scss";

import App from "../_components/App";
import MyWork from "../_components/MyWork";

import { Metadata } from 'next';
import { descriptionBase, roleDefault } from "../_utils/metadata";

const title = `James Dow's Projects`;
const description = `Check out some of the ${roleDefault} projects James Dow has been working on. ${roleDefault}.`;

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

export default function Projects() {
  return (
    <App miniHeader={true}>
      <MyWork />
    </App>
  );
}
