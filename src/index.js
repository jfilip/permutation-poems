"use strict";

require('es6-promise').polyfill();

import { fetch } from "../node_modules/whatwg-fetch/fetch";
import { load } from "./poem_data";

window.addEventListener("load", function() {
  load();
});
