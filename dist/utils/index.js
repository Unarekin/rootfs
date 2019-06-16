"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
function ResolveError(dir, syscall, resolved) {
    Error.captureStackTrace(this, this.constructor.name);
    this.message = "no such file or directory, " + syscall + " '" + dir + "'";
    this.code = 'ENOENT';
    this.errno = -2;
    this.syscall = syscall;
    this.path = dir;
    this.actualPath = resolved;
    //this.stack = this.stack.split("\n").splice(1, 2);
    var newStack = this.stack.split("\n");
    newStack.splice(1, 3);
    newStack[0] = "Error: ENOENT: " + this.message;
    this.stack = newStack.join("\n");
}
require('util').inherits(ResolveError, Error);
function isChildOf(child, parent) {
    if (child === parent)
        return true;
    var parentTokens = parent.split('/').filter(function (i) { return i.length; });
    var childTokens = child.split('/').filter(function (i) { return i.length; });
    // console.log("Parent tokens: ", parentTokens);
    // console.log("Child tokens: ", childTokens);
    return parentTokens.every(function (t, i) {
        return childTokens[i] === t;
    });
    //return parentTokens.every((t, i) => child.split('/')[i] === t);
}
exports.isChildOf = isChildOf;
function resolvePath(root, dir) {
    var resolvedPath = path.join(path.resolve(root), dir);
    var resolvedRoot = path.resolve(root);
    if (!isChildOf(resolvedPath, resolvedRoot)) {
        // console.error("Attempted to load path: ", resolvedPath, resolvedRoot);
        // process.exit();
        throw new ResolveError(dir, "open", resolvedPath);
    }
    // let resErr = new ResolveError(dir, 'open');
    // console.error(resErr);
    // try {
    //   fs.readFileSync("/teest");
    // } catch (err) {
    //   console.error(err);
    // }
    return resolvedPath;
}
exports.resolvePath = resolvePath;
function setPathArgument(root, args) {
    if (typeof args[0] == 'string')
        args[0] = resolvePath(root, args[0]);
}
exports.setPathArgument = setPathArgument;
// function getResolvedPath(dir: string): string {
//   console.log("Resolving: ", dir);
//   return path.resolve(path.join(rootPath + dir));
// }
//# sourceMappingURL=index.js.map