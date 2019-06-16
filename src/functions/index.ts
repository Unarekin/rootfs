import * as fs from 'fs';
import * as path from 'path';

/**
  Handles reading in function specifications
 */

module.exports = (root: string): Object => {
  let funcs: any = {};
  // console.log("Functions: ", root);
  fs.readdirSync(__dirname)
  .forEach((file) => {
    if (file !== path.basename(__filename)) {
      let temp = require(path.join(__dirname, file))(root);
      
      funcs = Object.assign(funcs, temp);
    }
  });

  return funcs;
};