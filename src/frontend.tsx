/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import $ from "jquery";
import _ from "lodash";
import Dropzone from "dropzone";
import noUiSlider from "nouislider";
import DataTable from "datatables.net";
import { Calendar } from "vanilla-calendar-pro";
import { BrowserRouter } from "react-router-dom";
window.$ = $;
window.jQuery = $;
window._ = _;
window.Dropzone = Dropzone;
window.noUiSlider = noUiSlider;
window.DataTable = DataTable;
window.VanillaCalendarPro = Calendar;

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
import("preline").then(() => {
  (import.meta.hot.data.root ??= createRoot(elem)).render(app);
});
