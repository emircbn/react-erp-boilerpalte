import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

let render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

if (module.hot) {
  module.hot.accept("./App", () => {
    render(<App />, document.getElementById("root"));
  });
}

render();
