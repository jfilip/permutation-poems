"use strict";

var Typewriter = require("../node_modules/typewriter.js/src/typewriter");

class Writer {
  constructor(args) {
    this.lines = args.lines || [];
  }

  static clearLines() {
    return new Promise(
      resolve => setTimeout(function() {
        Array.prototype.forEach.call(
          document.querySelectorAll(".poem-line"),
          l => document.body.removeChild(l)
        );
        resolve();
      }, 8000)
    );
  }

  writeLines() {
    var self = this;
    return this.lines.reduce(function(sequence, line, lineNum) {
      return sequence.then(
        () => self.createContainer(lineNum)
      ).then(
        () => self.typeWriteLine(line, lineNum)
      );
    }, Promise.resolve());
  }

  createContainer(lineNum) {
    let d = document.createElement("div");
    d.id = this.lineId(lineNum);
    d.className = "poem-line";
    document.body.insertBefore(d, this.placeholder());
  }

  placeholder() {
    return document.querySelector("#placeholder");
  }

  typeWriteLine(line, lineNum) {
    let tw = new Typewriter(this.lineId(lineNum, true), { text: line, interval: 20 });
    this.placeholder().scrollIntoView()
    return new Promise(resolve => tw.type(() => resolve()));
  }

  lineId(lineNum, selector=false) {
    return (selector ? "#" : "") + "line-" + (lineNum + 1);
  }
}

export { Writer };
