import React from "react";
import ReactDOM, { Root } from "react-dom/client";
import App, { AppProps } from "./App.tsx";
import "./index.css";

let root: Root | null = null;

//@ts-ignore ignore
window.mountElement = (el) => {
  root = ReactDOM.createRoot(el);
};
//@ts-ignore ignore
window.renderApp = (props: AppProps) => {
  root!.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  );
};
