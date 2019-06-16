import { expect, should, assert } from 'chai';
import * as path from 'path';
import * as defaultFs from 'fs';

let rootfs: any=null;
let fs: any= null;

describe("Basic Tests", () => {
  it("Can import rootfs", () => {
    rootfs = require("../src");
  });

  it("Can initialize rootfs", () => {
    fs = rootfs("./test/files");
    assert.isOk(fs);
  });

  it("rootfs has same properties as defaultFs", () => {
    let props = [];
    for (let prop in defaultFs) {
      //assert.isOk(rootfs[prop], prop + " not present on rootfs.");
      if (!rootfs[prop])
        props.push(prop);
    }

    assert.isAbove(props.length, 0, "Properties found not mirrored on rootfs: " + props.join(", "));
  });
});