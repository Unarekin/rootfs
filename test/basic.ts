import { expect, should, assert } from 'chai';
import * as path from 'path';
import * as defaultFs from 'fs';


describe("Basic Tests", () => {
  let rootfs: any=null;
  let fs: any= null;
  it("Can import rootfs", () => {
    rootfs = require("../src");
  });

  it("Can initialize rootfs", () => {
    fs = rootfs("./test/files");
    assert.isOk(fs);
  });

  it("rootfs has same properties as default fs", () => {
    // let props = [];
    // for (let prop in defaultFs) {
    //   //assert.isOk(rootfs[prop], prop + " not present on rootfs.");
    //   if (!rootfs[prop])
    //     props.push(prop);
    // }

    // assert.isAbove(props.length, 0, "Properties found not mirrored on rootfs: " + props.join(", "));
    let props = Object.keys(defaultFs).filter((prop: string) => Object.keys(rootfs).includes(prop));
    assert.equal(props.length, 0, "Properties not found mirrored on rootfs: " + props.join(", "));
  });

  it("Has rootPath", () => {
    assert.isOk(fs.rootPath);
  });

  it ("Has rootPathAbsolute", () => {
    assert.isOk(fs.rootPathAbsolute);
  });
});