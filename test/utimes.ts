import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';

const rootfs = require('../src')('./test/files');

describe("Utimes", () => {
  before("Setup", () => {
    // Should reset atime, mtime
    rootfs.writeFileSync("/utimes.txt", "");
  });

  it("#utimes", (done) => {
    let stat = rootfs.statSync("/utimes.txt");
    assert.isOk(stat, "Unable to stat /utimes.txt");
    assert.notDeepEqual(stat.atime, new Date("5/7/1984 12:00 am"), "atime is already 5/7/1984 12:00 am");
    assert.notDeepEqual(stat.mtime, new Date("5/7/1984 12:00 am"), "mtime is already 5/7/1984 12:00 am");

    rootfs.utimes("/utimes.txt", new Date("5/7/1984 12:00 am"), new Date("5/7/1984 12:00 am"), (err) => {
      if (err) {
        done(err);
      } else {
        let stat = rootfs.statSync("/utimes.txt");
        assert.isOk(stat, "Unable to stat /utimes.txt");
        assert.deepEqual(stat.atime, new Date("5/7/1984 12:00 am"), `atime does not match.  Expected 5/7/1984 12:00 am, got ${stat.atime}`);
        assert.deepEqual(stat.mtime, new Date("5/7/1984 12:00 am"), `mtime does not match.  Expected 5/7/1984 12:00 am, got ${stat.mtime}`); 
        done();
      }
    });
  });
  it("#utimesSync", () => {
    let stat = rootfs.statSync("/utimes.txt");
    assert.isOk(stat, "Unable to stat /utimes.txt");
    assert.notDeepEqual(stat.atime, new Date("9/8/2017 12:00 pm"), "atime is already 9/8/2017 12:00 pm");
    assert.notDeepEqual(stat.mtime, new Date("9/8/2017 12:00 pm"), "mtime is already 9/8/2017 12:00 pm");

    rootfs.utimesSync("/utimes.txt", new Date("9/8/2017 12:00 pm"), new Date("9/8/2017 12:00 pm"));
    stat = rootfs.statSync("/utimes.txt");
    assert.isOk(stat, "Unable to stat /utimes.txt");
    assert.deepEqual(stat.atime, new Date("9/8/2017 12:00 pm"), `atime does not match.  Expected 9/8/2017 12:00 pm, got ${stat.atime}`);
    assert.deepEqual(stat.mtime, new Date("9/8/2017 12:00 pm"), `mtime does not match.  Expected 9/8/2017 12:00 pm, got ${stat.mtime}`);
  });
  it("futimes", (done) => {
    let fd = rootfs.openSync("/utimes.txt");
    assert.isOk(fd, "Unable to open /utimes.txt");
    rootfs.futimes(fd, new Date("1/7/2019 12:00 am"), new Date("1/7/2019 12:00 am"), (err) => {
      if (err) {
        done(err);
      } else {
        let stat = rootfs.fstatSync(fd);
        assert.isOk(stat, "Unable to stat /utimes.txt");
        assert.deepEqual(stat.atime, new Date("1/7/2019 12:00 am"), `atime does not match.  Expected 1/7/2019 12:00 am, got ${stat.atime}`);
        assert.deepEqual(stat.mtime, new Date("1/7/2019 12:00 am"), `mtime does not match.  Expected 1/7/2019 12:00 am, got ${stat.mtime}`);
        done();
      }
      rootfs.closeSync(fd);
    });
  });
  it("futimesSync", () => {
    let fd = rootfs.openSync("/utimes.txt");
    assert.isOk(fd, "Unable to open /utimes.txt");
    rootfs.futimesSync(fd, new Date("2/5/2019 12:00 pm"), new Date("2/5/2019 12:00 pm"));
    let stat = rootfs.fstatSync(fd);
    assert.isOk(stat);
    assert.deepEqual(stat.atime, new Date("2/5/2019 12:00 pm"), `atime does not match.  Expected 2/5/2019 12:00 pm, got ${stat.atime}`);
    assert.deepEqual(stat.mtime, new Date("2/5/2019 12:00 pm"), `mntime does not match.  Expected 2/5/2019 12:00 pm, got ${stat.mtime}`);

    rootfs.closeSync(fd);
  });

  after("Cleanup", () => {
    rootfs.utimesSync("/utimes.txt", Date.now(), Date.now());
  })
});
