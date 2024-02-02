import "./index.scss";

import App from "../_components/App";

export default function Resume() {

  return (
    <App miniHeader={true}>
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col" style={{height: '1000px'}}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </App>
  );
}
