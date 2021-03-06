class PoemData {
  static get DATA_FILE() {
    return (window.location.pathname || "/") + "data.json";
  }

  static load() {
    var self = this;
    return new Promise(function(resolve, reject) {
      fetch(self.DATA_FILE).then(
        data => data.json()
      ).then(
        json => resolve(json)
      ).catch(
        error => reject("Error fetching " + self.DATA_FILE)
      );
    });
  }
}

export { PoemData };
