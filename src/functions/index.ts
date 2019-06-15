import * as fs from 'fs';
import * as path from 'path';

/**
  Handles reading in function specifications
 */

let funcs: any = {};
fs.readdirSync(__dirname)
.forEach((file) => {
  if (file !== path.basename(__filename)) {
    let temp = require(path.join(__dirname, file));
    console.log(temp);
  }
});

module.exports = funcs;