import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';

//let base = path.resolve('./test/files');
// console.log("Base: ", base);

describe.skip("Links/Symlinks", () => {
  const rootfs = require('../src')('./test/files');
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
  it("#readlink", (done) => {
    rootfs.readlink("/files", (err, link) => {
      assert.isNotOk(err, (err ? err.message : ''));
      assert.isOk(link);
      done();
    });
  });
  it("#readlinkSync", () => {
    let link = rootfs.readlinkSync("/files");
    assert.isOk(link);
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