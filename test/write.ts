import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';

//let base = path.resolve('./test/files');
// console.log("Base: ", base);

describe("File writing", () => {
  const rootfs = require('../src')('./test/files');
  it("#appendFile", (done) => {
    rootfs.appendFile("/test.txt", "woot", (err) => {
      fs.truncateSync("./test/files/test.txt", 4);
      done(err);
    });
  });
  it("#appendFileSync", () => {
    try {
      rootfs.appendFileSync("/test.txt", "woot");
    } catch (err) {
      throw err;
    } finally {
      fs.truncateSync("./test/files/test.txt", 4);
    }
  })
  it("#createWriteStream", () => {
    let stream = rootfs.createWriteStream("/write.txt");
    assert.isOk(stream);
    stream.write("test");
    stream.close();
  });

  it("#truncate", (done) => {
    rootfs.truncate("/write.txt", done);
  });
  it("#truncateSync", () => {
    rootfs.truncateSync("/write.txt");
  });
  it("#unlink", (done) => {
    rootfs.writeFileSync("/write.txt", "test");
    rootfs.unlink("/write.txt", done);
  });

  it("#unlinkSync", () => {
    rootfs.writeFileSync("/write.txt", "test");
    rootfs.unlinkSync("/write.txt");
  });
  it("#write", (done) => {
    let fd = rootfs.openSync("/write3.txt", 'w');
    rootfs.write(fd, Buffer.from("test 2"), (err) => {
      if (!err)
        rootfs.closeSync(fd);
      done(err);
    });
  });
  it("#writeFile", (done) => {
    rootfs.writeFile("/write.txt", "test 2", done);
  });
  it("#writeFileSync", () => {
    rootfs.writeFileSync("/write.txt", "test 2");
  });
  it("#writeSync", () => {
    let fd = rootfs.openSync("/write2.txt", 'w');
    rootfs.writeSync(fd, Buffer.from("test 2"));
    rootfs.closeSync(fd);
  });

  it("#ftruncate", (done) => {
    let fd = rootfs.openSync("/write1.txt", 'w');
    assert.isOk(fd, "Unable to open file to truncate.");
    rootfs.ftruncate(fd, 0, (err) => {
      if (err) {
        done(err);
      } else {
        let text = rootfs.readFileSync("/write1.txt");
        assert.isOk(text);
        assert.equal(text, "");

        rootfs.closeSync(fd);

        done();
      }
    });
  });

  it("#ftruncateSync", () => {
    let fd = rootfs.openSync("/write2.txt", 'w');
    assert.isOk(fd, "Unable to open file to truncate.");
    rootfs.ftruncateSync(fd, 0);
    let text = rootfs.readFileSync("/write2.txt");
    assert.isOk(text);
    assert.equal(text, "");

    rootfs.closeSync(fd);
  });

  after("cleanup", () => {
    let files: string[] = [
      "write.txt",
      "write1.txt",
      "write2.txt",
      "write3.txt",
      "link1",
      "link2",
      "symlink1",
      "symlink2"
    ];
    files.forEach((file) => {
      cleanFileIfExists("./test/files/" + file);
    });
  });
});

function cleanFileIfExists(dir): void {
  try {
    return fs.unlinkSync(dir);
  } catch (err) {
    if (err.code != 'ENOENT')
      throw err;
  }
}

  // "createWriteStream",
  // "link",
  // "linkSync",
  // "symlink",
  // "symlinkSync",
  // "truncate",
  // "truncateSync",
  // "unlink",
  // "unlinkSync",
  // "write",
  // "writeFile",
  // "writeFileSync",
  // "writeSync"