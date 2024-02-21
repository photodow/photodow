import "./index.scss";

import ResumeRedirect from "../_components/ResumeRedirect";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `Download James Dow's Resume`,
}

export default function Resume() {
  return <ResumeRedirect />;
}
