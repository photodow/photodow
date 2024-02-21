import "./index.scss";

import ResumeRedirect from "../_components/ResumeRedirect";

import { Metadata } from 'next';
import { descriptionBase, roleDefault } from "../_utils/metadata";

const title = `James Dow's Resume`;
const description = `Download and review James Dow's Resume. ${roleDefault}.`;

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

export default function Resume() {
  return <ResumeRedirect />;
}
