"use strict";

require("es6-promise").polyfill();

import { fetch } from "../node_modules/whatwg-fetch/fetch";
import { PoemData } from "./poemData";
import { Permutations } from "./permutations";
import { Writer } from "./writer";

window.addEventListener("load", function() {
  PoemData.load().then(
    data => data.poems.reduce(
      function(sequence, poem) {
        let w;
        return sequence.then(
          () => {
            let p = new Permutations({ line: poem });
            w = new Writer({ lines: p.genPermutations() });
            return w.writeLines();
          }
        ).then(
          () => w.clearAll()
        );
      }, Promise.resolve())
  ).catch(
    e => console.error(e)
  );
});

