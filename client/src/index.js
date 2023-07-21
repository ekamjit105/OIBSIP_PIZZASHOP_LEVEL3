import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import Testing from "./testing";


import {Provider} from "react-redux"
import store from "./store"

ReactDOM.render(
    <Provider store={store}>
   {/*<App />*/}
    <Testing/>
    </Provider>,
  document.getElementById("root")
);
