import { assert, expect, should } from 'chai';
import * as path from 'path';

//let base = path.resolve('./test/files');
// console.log("Base: ", base);
const rootfs = require('../src')('./test/files');

describe("File reading", () => {


  it("#readFile", (done) => {
    rootfs.readFile("/test.txt", (err, data) => {
      if (err)
        return done(err);
      
        assert.equal(data.toString(), "test", `Expected test.txt to contain 'test', instead contained '{data.toString()}'.`);
        done();
    });
  });

  it("#readFileSync", () => {
    let data = rootfs.readFileSync("/test.txt");
    assert.isOk(data);
    let str = data.toString();
    assert.equal(str, 'test', `Expected test.txt to contain 'test', instead contained '{str}'.`);
  });

  it("Throws error if attempting to read file outside of root dir", () => {
    assert.throws(() => {
      rootfs.readFileSync("../test");
    }, /.*/g);
  });


  it("#createReadStream", (done) => {
    let stream = rootfs.createReadStream("/test.txt");
    let text = "";
    stream.on('data', (data) => {
      assert.isOk(data, "Empty stream.");
      let str = data.toString();
      text += str;
    });

    stream.on('error', done);
    stream.on('close', () => {
      assert.equal(text, "test", `Expected test.txt to contain 'test', instead contained ${text}.`);
      done();
    });
  });

  it("#open", (done) => {
    rootfs.open("/test.txt", (err, fd) => {
      assert.isNotOk(err, (err ? err.message : ''));
      assert.isOk(fd, "Unable to get file descriptor.");

      done();
    });
  });

  it("#openSync", () => {
    let fd = rootfs.openSync("/test.txt");
    assert.isOk(fd, "Unable to get file descriptor.");
  });

  // Unfortunately, symbolic links on a Windows host are kind of tricky.
  // These tests will need to wait.
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
});