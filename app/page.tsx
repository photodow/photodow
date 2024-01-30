import "./page.scss";

import About from "./components/About";
import App from "./components/App";

export default function Home() {
  return (
    <App>
      <About />
    </App>
  );
}