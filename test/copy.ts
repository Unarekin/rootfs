import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';

//let base = path.resolve('./test/files');
// console.log("Base: ", base);
const rootfs = require('../src')('./test/files');

describe("Copy/Rename", () => {
  it("#copyFile", (done) => {
    rootfs.copyFile("/copy.txt", "/copy1.txt", (err) => {
      if (err) {
        done(err);
      } else {
        let stat = rootfs.statSync("/copy1.txt", "Unable to access copy2.txt");
        assert.isOk(stat);
        done();
      }
    });
  });
  it("#copyFileSync", () => {
    rootfs.copyFileSync("/copy.txt", "copy2.txt");
    let stat = rootfs.statSync("/copy2.txt", "Unable to acces copy3.txt");
  });
  it("#rename", (done) => {
    rootfs.copyFileSync("/rename.txt", "rename2.txt");
    rootfs.rename("/rename2.txt", "renamed1.txt", (err) => {
      if (err) {
        done(err);
      } else {
        let stat = rootfs.statSync("/renamed1.txt");
        assert.isOk(stat, "Unable to access /renamed1.txt");
        done();
      }
    });
  });
  it("#renameSync", () => {
    rootfs.copyFileSync("/rename.txt", "/rename3.txt");
    rootfs.renameSync("/rename3.txt", "renamed2.txt");
    let stat = rootfs.statSync("/renamed2.txt");
    assert.isOk(stat, "Unable to access /renamed2.txt");
  });

  after("Cleanup", () => {
    ["copy1.txt", "copy2.txt", "renamed1.txt", "renamed2.txt"]
    .forEach((dir: string): void => {
      removeFileIfExtant(`/${dir}`);
    });
  });
});


function removeFileIfExtant(dir: string): void {
  try {
    rootfs.unlinkSync(dir);
  } catch (err) {
    if (err.code != "ENOENT")
      throw err;
  }
}