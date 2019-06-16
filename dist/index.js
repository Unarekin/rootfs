"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultfs = require("fs");
var path = require("path");
var fsUtils = require("./utils/index");
var functionsToHook = [
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
    // "copyFile",
    // "copyFileSync",
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
    // "rename",
    // "renameSync",
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
function root(dir, fs) {
    if (dir === void 0) { dir = "/"; }
    if (fs === void 0) { fs = defaultfs; }
    var abs = path.resolve(dir);
    var funcs = {
        rootPath: dir,
        rootPathAbsolute: abs
    };
    functionsToHook.forEach(function (funcName) {
        funcs[funcName] = function () {
            fsUtils.setPathArgument(dir, arguments);
            return defaultfs[funcName].apply(funcs, arguments);
        };
    });
    // copyFile, copyFileSync, rename, renameSync are special cases,
    // they have two path arguments. Shocking, I know!
    ["copyFile", "copyFileSync", "rename", "renameSync"]
        .forEach(function (funcName) {
        funcs[funcName] = function () {
            arguments[0] = fsUtils.resolvePath(dir, arguments[0]);
            arguments[1] = fsUtils.resolvePath(dir, arguments[1]);
            return fs[funcName].apply(funcs, arguments);
        };
    });
    return Object.assign({}, fs, funcs);
}
module.exports = root;
//# sourceMappingURL=index.js.map