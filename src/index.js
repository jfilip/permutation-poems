"use strict";

require("es6-promise").polyfill();

import { fetch } from "../node_modules/whatwg-fetch/fetch";
import { PoemData } from "./poemData";
import { Permutations } from "./permutations";
import { Writer } from "./writer";

window.addEventListener("load", function() {
  PoemData.load().then(
    (r) => r.json()
  ).then(
    (j) => console.log(j)
  ).catch(
    (e) => console.error("Error fetching data.json", e)
  );

  let p = new Permutations("NO POET'S DON'T OWN WORDS");
  let w = new Writer(p.genPermutations());
  w.writeLine();
  Writer.clearLines();
});

