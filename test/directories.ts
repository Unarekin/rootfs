import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';
import * as rimraf from 'rimraf';

//let base = path.resolve('./test/files');
// console.log("Base: ", base);

describe("Directories", () => {
  const rootfs = require('../src')('./test/files');
  let temp1: string = "";
  let temp2: string = "";

  before("Setup", () => {
    try {
      fs.mkdirSync("./test/files/temp");
    } catch (err) {
      if (err.code !== 'EEXIST')
        throw err;
    }
  });

  it("#mkdir", (done) => {
    rootfs.mkdir("/test1", (err, folder) => {
      done(err);
    });
  });
  it("#mkdirSync", () => {
    rootfs.mkdirSync("/test2");
  });
  it("#mkdtemp", (done) => {
    rootfs.mkdtemp("/temp/", (err, folder) => {
      done(err);
    })
  });
  it("#mkdtempSync", () => {
    rootfs.mkdtempSync("/temp/");
  });

  it("#readdir", (done) => {
    rootfs.readdir("/", (err, files) => {
      assert.isNotOk(err, (err ? err.message : ''));
      assert.isOk(files, "Unable to retrieve list of files.");
      let expectedFiles = fs.readdirSync("./test/files/");
      // assert.equal(files.length, 2, `Expected to find one file.  Instead, found ${files.length}.`);
      assert.deepEqual(files, expectedFiles, `File list contains unexpected entries: ${files.join(", ")}.`);

      done();
    });
  });

  it("#readdir - withFileTypes", (done) => {
    rootfs.readdir("/", { withFileTypes: true }, (err, files) => {
      assert.isOk(files, "Unable to retrieve list of files.");
      let expectedFiles = fs.readdirSync("./test/files/");
      for (let i=0;i<expectedFiles.length;i++) {
        assert.property(files[i], "name", "Dirent did not have 'name' property.");
        assert.equal(files[i].name, expectedFiles[i]);
      }
      done();
    });
  });

  it("#readdirSync", () => {
    let files = rootfs.readdirSync("/");
    assert.isOk(files, "Unable to retrieve list of files.");
    // assert.equal(files.length, 2, `Expected to find one file.  Found ${files.length}`);
    let expectedFiles = fs.readdirSync("./test/files/");
    assert.deepEqual(files, expectedFiles, `File list contains unexpected entries: ${files.join(", ")}.`);
  });

  it("#readdirSync - withFileTypes", () => {
    let files = rootfs.readdirSync("/", {withFileTypes: true});
    assert.isOk(files, "Unable to retrieve list of files.");
    let expectedFiles = fs.readdirSync("./test/files/");
    for (let i=0;i<expectedFiles.length;i++) {
      assert.property(files[i], "name", "Dirent did not have 'name' property.");
      assert.equal(files[i].name, expectedFiles[i]);
    }
  });


  it("#realpath", (done) => {
    rootfs.realpath("/", (err, resolved) => {
      assert.isNotOk(err, (err ? err.message : err));
      assert.isOk(resolved);
      let expPath = path.resolve(path.join(path.dirname(__filename), "files"));
      assert.equal(resolved, expPath, `Expected realpath to resolve to ${expPath}, instead got ${resolved}.`);
      done();
    });
  });

  it("#realpathSync", () => {
    let resolved = rootfs.realpathSync("/");
    assert.isOk(resolved);

    let expPath = path.resolve(path.join(path.dirname(__filename), "files"));
    assert.equal(resolved, expPath, `Expected realpath to resolve to ${expPath}, instead got ${resolved}`);
  });

  it("#rmdir", (done) => {
    rootfs.rmdir("/test1", done);
  });
  it("#rmdirSync", () => {
    rootfs.rmdirSync("/test2");
  });

  after("Cleanup", (done) => {
    let tempDirs: string[] = ['test1', 'test2', 'temp'];
    let promises: any[] = [];

    tempDirs.forEach((dir) => {
      promises.push(removeDir(dir));
    });

    Promise.all(promises)
    .then(() => done())
    .catch(done)
    ;
  });
});

function removeDir(dir: string): Promise<any> {
  return new Promise((resolve, reject) => {
    rimraf(path.join("./test/files", dir), (err) => {
      if (err)
        reject(err);
      else
        resolve();
    });
  });
}