import { assert, expect, should } from 'chai';
import * as path from 'path';
import * as fs from 'fs';

import * as os from 'os';

//let base = path.resolve('./test/files');
// console.log("Base: ", base);
const rootfs = require('../src')('./test/files');

describe("Watch", () => {
  it("#watch", (done) => {
    rootfs.writeFileSync("/watch1.txt", "");
    let watchTriggered: boolean = false;

    let watcher = rootfs.watch("/watch1.txt", (event: string, filename: string) => {
      assert.equal(event, 'change');
      assert.equal(filename, 'watch1.txt');

      let text = rootfs.readFileSync("/watch1.txt");
      assert.equal(text, "watch!");

      watchTriggered = true;

      watcher.close();
      done();
    });

    rootfs.appendFileSync("/watch1.txt", "watch!");

    setTimeout(() => {
      if (!watchTriggered) {
        if (watcher)
          watcher.close();
        done(new Error("Watch not triggered."));
      }
    }, 1000);
  });
  it("#watchFile", (done) => {
    rootfs.writeFileSync("/watch2.txt", "");
    let watchTriggered: boolean = false;
    let watcher = rootfs.watchFile("/watch2.txt", (current: fs.Stats, previous: fs.Stats) => {
      assert.isOk(current);
      assert.isOk(previous);


      let text = rootfs.readFileSync("/watch2.txt");
      assert.equal(text, "watch!");

      watchTriggered = true;
      watcher.removeAllListeners();
      watcher.stop();
      watcher = null;
      done();
    });

    rootfs.appendFileSync("/watch2.txt", "watch!");
    setTimeout(() => {
      if (!watchTriggered) {
        done(new Error("Watch not triggered."));
        watcher.removeAllListeners();
        watcher.stop();
        watcher = null;
      }
    }, 1000);
  });
  it("#unwatchFile", () => {
    fs.unwatchFile("/watch1.txt");
  });

  after('Cleanup', () => {
    fs.unwatchFile("/watch1.txt");
    fs.unwatchFile("/watch2.txt");
  })
});
