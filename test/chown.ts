import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';

//let base = path.resolve('./test/files');
// console.log("Base: ", base);
const rootfs = require('../src')('./test/files');

describe("Chown/Chmod", () => {
  it("#chmod", (done) => {
    rootfs.chmod("/chmod.txt", 6, done);
  });
  it("#chmodSync", () => {
    rootfs.chmodSync("/chmod.txt", 6);
  });
  it("#chown", (done) => {
    let uid: number = process.getuid();
    let gid: number = process.getgid();
    rootfs.chown("/chmod.txt", uid, gid, done);
  });
  it("#chownSync", () => {
    let uid: number = process.getuid();
    let gid: number = process.getgid();
    rootfs.chownSync("/chmod.txt", uid, gid);
  });
  it("#fchmod", (done) => {
    let fd = rootfs.openSync("/chmod.txt");
    assert.isOk(fd, "Unable to open chmod.txt");
    rootfs.fchmod(fd, 6, (err) => {
      done(err);
      rootfs.closeSync(fd);
    });
  });
  it("#fchmodSync", () => {
    let fd = rootfs.openSync("/chmod.txt");
    assert.isOk(fd, "Unable to open chmod.txt");
    rootfs.fchmodSync(fd, 6);
    rootfs.closeSync(fd);
  });
  it("#fchown", (done) => {
    let uid: number = process.getuid();
    let gid: number = process.getgid();
    let fd = rootfs.openSync("/chmod.txt");

    rootfs.fchown(fd, uid, gid, (err) => {
      done(err);
      rootfs.closeSync(fd);
    });
  });
  it("#fchownSync", () => {
    let uid: number = process.getuid();
    let gid: number = process.getgid();
    let fd = rootfs.openSync("/chmod.txt");
    rootfs.fchownSync(fd, uid, gid);
    rootfs.closeSync(fd);
  });
  it("#lchown", (done) => {
    let uid: number = process.getuid();
    let gid: number = process.getgid();
    rootfs.lchown("/chmod.txt", uid, gid, done);
  })
  it("#lchownSync", () => {
    let uid: number = process.getuid();
    let gid: number = process.getgid();
    rootfs.lchownSync("/chmod.txt", uid, gid);
  });
});