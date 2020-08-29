import { log } from "./logger";
log("hello parcel");

// import $ from 'jquery'
import "./style.css";

import("jquery").then(($) => {
  $(document.body).append("<h1>Hello Parcel</h1>");
});
// HMR API
if (module.hot) {
  module.hot.accept(() => {
    console.log("HMR～");
  });
}
