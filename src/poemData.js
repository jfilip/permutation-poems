"use strict";

class PoemData {
  static load() {
    return fetch("/data.json");
  };
}

export { PoemData };
