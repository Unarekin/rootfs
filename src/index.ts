import * as defaultfs from 'fs';
import * as path from 'path';
import * as fsUtils from './utils/index';


const functionsToHook = [
  "access",
  "accessSync",
  "appendFile",
  "appendFileSync",
  "chmod",
  "chmodSync",
  "chown",
  "chownSync",
  "close",
  "closeSync",
  "copyFile",
  "copyFileSync",
  "createReadStream",
  "createWriteStream",
  "exists",
  "existsSync",
  "fchmod",
  "fchmodSync",
  "fchown",
  "fchownSync",
  "fdatasync",
  "fdatasyncSync",
  "fstat",
  "fstatSync",
  "fsync",
  "fsyncSync",
  "ftruncate",
  "ftruncateSync",
  "futimes",
  "futimesSync",
  "lchown",
  "lchownSync",
  "link",
  "linkSync",
  "lstat",
  "lstatSync",
  "mkdir",
  "mkdirSync",
  "mkdtemp",
  "mkdtempSync",
  "open",
  "openSync",
  "read",
  "readFile",
  "readFileSync",
  "readSync",
  "readdir",
  "readdir",
  "readdirSync",
  "readdirSync",
  "readlink",
  "readlinkSync",
  "realpath",
  "realpathSync",
  "rename",
  "renameSync",
  "rmdir",
  "rmdirSync",
  "stat",
  "statSync",
  "symlink",
  "symlinkSync",
  "truncate",
  "truncateSync",
  "unlink",
  "unlinkSync",
  "unwatchFile",
  "utimes",
  "utimesSync",
  "watch",
  "watchFile",
  "write",
  "writeFile",
  "writeFileSync",
  "writeSync"
];


function root(dir="/", fs = defaultfs) {
  let abs = path.resolve(dir);

  let funcs: any = {};
  funcs.rootPath = dir;
  funcs.rootPathAbsolute = abs;


  functionsToHook.forEach((funcName: string): void => {
    funcs[funcName] = function() {
      fsUtils.setPathArgument(dir, arguments);
      return defaultfs[funcName].apply(funcs, arguments);
    }
  });


  return Object.assign({}, fs, funcs);
}


module.exports = root;