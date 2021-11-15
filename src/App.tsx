import { StrictMode } from "react";
import { render } from "react-dom";
// eslint-disable-next-line import/named
import {Wizard} from "./wizard/components/Wizard";


const App = () => {
  return (
      <div>
        <Wizard />
      </div>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
