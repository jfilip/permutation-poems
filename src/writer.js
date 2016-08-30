var Typewriter = require("../node_modules/typewriter.js/src/typewriter");

class Writer {
  constructor(args) {
    this.lines = args.lines || [];
    this.lineLength = null;
  }

  static clearLines(delay=0) {
    return new Promise(
      resolve => setTimeout(function() {
        Array.prototype.forEach.call(
          document.querySelectorAll(".column"),
          l => document.body.removeChild(l)
        );
        resolve();
      }, delay)
    );
  }

  writeLines() {
    var self = this;
    return this.lines.reduce(function(sequence, line, lineNum) {
      return sequence.then(
        () => self.createContainer(self.getCurrentColumn(), lineNum)
      ).then(
        () => self.typeWriteLine(line, lineNum)
      );
    }, Promise.resolve());
  }

  getCurrentColumn() {
    let columns = document.querySelectorAll(".column");
    if (columns.length === 0) {
      return this.newColumn();
    }

    let currentColumn = columns[columns.length - 1];
    if (this.isColumnMaxHeight(currentColumn)) {
      if (!this.canPageSupportNewColumn(currentColumn)) {
        Array.prototype.forEach.call(
          document.querySelectorAll(".column"),
          l => document.body.removeChild(l)
        );
      }
      return this.newColumn();
    }

    return currentColumn;
  }

  isColumnMaxHeight(column) {
    return column.clientHeight + this.poemLineHeight() >= window.innerHeight;
  }

  poemLineHeight() {
    return document.querySelector(".poem-line:not(.writing)").clientHeight;
  }

  canPageSupportNewColumn(column) {
    let bounds = column.getBoundingClientRect();
    return bounds.right + bounds.width < document.body.scrollWidth;
  }

  newColumn() {
    let d = document.createElement("div");
    d.className = "column";
    d.style.width = this.getLineLength();
    document.body.appendChild(d);
    return d;
  }

  getLineLength() {
    return (this.lineLength || this.determineLineLength()) + "px";
  }

  determineLineLength() {
    if (this.lines.length === 0) {
      return null;
    }
    let d = document.createElement("div");
    d.className = "poem-line";
    d.style.display = "hidden";
    d.style.position = "absolute";
    d.style.height = d.style.left = "-1000px";
    d.textContent = this.lines[0];
    document.body.appendChild(d);
    this.lineLength = Math.floor(d.clientWidth) + 1;
    document.body.removeChild(d);
    return this.lineLength;
  }

  createContainer(column, lineNum) {
    let d = document.createElement("div");
    d.id = this.lineId(lineNum);
    d.className = "poem-line writing";
    column.appendChild(d);
  }

  typeWriteLine(line, lineNum) {
    var self = this;
    let tw = new Typewriter(this.lineId(lineNum, true), { text: line, interval: 15 });
    return new Promise(resolve => tw.type(() => {
      document.querySelector(self.lineId(lineNum, true)).className = "poem-line";
      resolve();
    }));
  }

  lineId(lineNum, selector=false) {
    return (selector ? "#" : "") + "line-" + (lineNum + 1);
  }
}

export { Writer };
