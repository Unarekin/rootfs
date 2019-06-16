import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';

//let base = path.resolve('./test/files');
// console.log("Base: ", base);
const rootfs = require('../src')('./test/files');

describe("Stat", () => {
  it("#fstat", (done) => {
    rootfs.open("/test.txt", 'r', (err, fd) => {
      if (err) {
        done(err);
      } else {
        rootfs.fstat(fd, false, (err, stat) => {
          if (err) {
            done(err);
          } else {
            assert.isOk(stat);
            done();
          }
          rootfs.closeSync(fd);
        });
      }
    });
  });

  it("#fstatSync", () => {
    let fd = rootfs.openSync("/test.txt", 'r');
    let stat = rootfs.fstatSync(fd);
    assert.isOk(stat);

    rootfs.closeSync(fd);
  });
  it("#lstat", (done) => {
    rootfs.lstat("/test.txt", (err, stat) => {
      if (err) {
        done(err);
      } else {
        assert.isOk(stat);
        done();
      }
    });
  });
  it("#lstatSync", () => {
    let stat = rootfs.lstatSync("/test.txt");
    assert.isOk(stat);
  });
  it("#stat", (done) => {
    rootfs.stat("/test.txt", (err, stat) => {
      if (err) {
        done(err);
      } else {
        assert.isOk(stat);
        done();
      }
    });
  });
  it("#statSync", () => {
    let stat = rootfs.statSync("/test.txt");
    assert.isOk(stat);
  });
});


  // "fstat",
  // "fstatSync",
  // "lstat",
  // "lstatSync",
  // "stat",
  // "statSync",