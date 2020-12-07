import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const rootEl = document.getElementById("root");

let render = () => {
  ReactDOM.render(<App />, rootEl);
};

if (module.hot) {
  module.hot.accept('./App', () => {
    render(<App />, rootEl);
  });
}

render() 