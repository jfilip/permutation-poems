"use strict";

var itertools = require("itertools");

class Permutations {
  constructor(args) {
    this.line = args.line || "";
  }

  genPermutations() {
    let permutations = itertools.permutationsSync(this.tokens(), this.tokens().length);
    return permutations.map(p => p.reverse().join(" ")).reverse();
  }

  tokens() {
    return this.line.split(" ");
  }
}

export { Permutations };
