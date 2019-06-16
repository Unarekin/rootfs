import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';

//let base = path.resolve('./test/files');
// console.log("Base: ", base);
const rootfs = require('../src')('./test/files');

describe.skip("Links/Symlinks", () => {
  it("#link", function(done) {

    if (os.platform() === 'win32') {
      this.skip();
    } else {
      rootfs.link("/files", "/files/link1", (err) => {
        if (err.code === "EACCES")
          this.skip()
        else
          done(err);
      });
    }
  });
  it("#linkSync", function() {
    if (os.platform() === "win32") {
      this.skip();
    } else {
      try {
        rootfs.linkSync("/files", "/files/link2");
      } catch (err) {
        if (err.code === "EACCES")
          this.skip();
        else
          throw err;
      }
    }
  });
  it("#symlink", function(done)  {
    if (os.platform() === "win32") {
      this.skip();
    } else {
      rootfs.symlink("/test.txt", "/symlink1", (err) => {
        if (err.code === "EACCES")
          this.skip();
        else
          done(err);
      });
    }
  });
  it("#symlinkSync", function() {
    if (os.platform() === "win32") {
      this.skip();
    } else {
      try {
        rootfs.symlinkSync("/test.txt", "symlink2");
      } catch (err) {
        if (err.code === "EACCES")
          this.skip();
        else
          throw err;
      }
    }
  });
});