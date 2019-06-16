import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';

//let base = path.resolve('./test/files');
// console.log("Base: ", base);
const rootfs = require('../src')('./test/files');

describe("Watch", () => {
  // Do not tests these functions, they are deprecated
  // it.skip("#exists", (done) => {});
  // it.skip("#existsSync", () => {});
  it("#access", (done) => {
    rootfs.access("/test.txt", done);
  });
  it("#accessSync", () => {
    rootfs.accessSync("/test.txt");
  });
});
