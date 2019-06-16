import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';

const ignoreProperties: string[] = [
  "ReadStream",
  "WriteStream",
  "FileReadStream",
  "FileWriteStream",
  "Dirent",
  "Stats"
];

//let base = path.resolve('./test/files');
// console.log("Base: ", base);
const rootfs = require('../src')('./test/files');

describe("Coverage", () => {
  it("Implements all functions from default fs module", () => {
    let funcs = require("../src/functions")("./test/files");
    
    let fsFuncs: string[] = [];

    let nonExistent: string[] = [];

    for (let prop in fs) {
      if (!ignoreProperties.includes(prop) && typeof fs[prop] === 'function' && !funcs[prop]) {
        nonExistent.push(prop);
      }
    }

    assert.equal(nonExistent.length, 0, "The following functions are unimplemented: \n" + nonExistent.join(", ") + "\n");
  });
});
