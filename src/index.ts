
function root(dir, fs = require('fs')) {
  let funcs = require("./functions");
  return Object.assign({}, funcs, fs);
}


//export { root as default };
module.exports = root;