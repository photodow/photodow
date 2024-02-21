import "./index.scss";

import App from "../_components/App";
import MyWork from "../_components/MyWork";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `James Dow's Projects`,
}

export default function Projects() {
  return (
    <App miniHeader={true}>
      <MyWork />
    </App>
  );
}
