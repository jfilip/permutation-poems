"use strict";

var Typewriter = require("../node_modules/typewriter.js/src/typewriter");

class Writer {
  constructor(lines) {
    this.lines = lines;
  }

  static clearLines() {
    Array.prototype.forEach.call(
      document.querySelectorAll(".poem-line"),
      (l) => document.body.removeChild(l)
    );
  }

  writeLine(lineNum=0) {
    if(lineNum === this.lines.length - 1) {
      return;
    }
    this.createContainer(lineNum);
    this.typeWriteLine(this.currentLine(lineNum), lineNum);
  }

  createContainer(lineNum) {
    let d = document.createElement("div");
    d.id = this.lineId(lineNum);
    d.className = "poem-line";
    d.innerHTML = "";
    document.body.insertBefore(d, this.placeholder());
  }

  placeholder() {
    return document.querySelector("#placeholder");
  }

  typeWriteLine(line, lineNum) {
    let tw = new Typewriter(this.lineId(lineNum, true), { text: line, interval: 5 });
    var self = this;
    setTimeout(() => self.placeholder().scrollIntoView(), 5);
    tw.type(() => this.writeLine(++lineNum));
  }

  lineId(lineNum, selector=false) {
    return (selector ? "#" : "") + "line-" + (lineNum + 1);
  }

  currentLine(lineNum) {
    return this.lines[lineNum];
  }
}

export { Writer };
