"use strict";

var load = function() {
  fetch("/data.json").then(
    (r) => r.json()
  ).then(
    (j) => console.log(j)
  ).catch(
    (e) => console.error("Error fetching data.json", e)
  );
};

export { load };
