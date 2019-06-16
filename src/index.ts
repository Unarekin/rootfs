import * as path from 'path';

function root(dir, fs = require('fs')) {
  let abs = path.resolve(dir);
  
  // console.log("Creation: ", abs);
  let funcs = require("./functions")(abs);
  funcs.rootPath = dir;
  funcs.rootPathAbsolute = abs;

  // console.log(funcs.rootPath);
  // console.log(funcs.rootPathAbsolute);



  return Object.assign({}, fs, funcs);
}


//export { root as default };
module.exports = root;