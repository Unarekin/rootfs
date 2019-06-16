import * as path from 'path';
import * as fs from 'fs';

function ResolveError(dir: string, syscall: string) {
  Error.captureStackTrace(this, this.constructor.name);

  this.message = `no such file or directory, ${syscall} '${dir}'`;
  this.code = 'ENOENT';
  this.errno = -2;
  this.syscall = syscall;
  this.path = dir;

  //this.stack = this.stack.split("\n").splice(1, 2);

  let newStack = this.stack.split("\n");
  newStack.splice(1, 3);
  newStack[0] = `Error: ENOENT: ${this.message}`;
  this.stack = newStack.join("\n");
  
}
require('util').inherits(ResolveError, Error);


export function isChildOf(child, parent)  {
  if (child === parent) return true;

  const parentTokens = parent.split('/').filter(i => i.length);
  const childTokens = child.split('/').filter(i => i.length);
  
  // console.log("Parent tokens: ", parentTokens);
  // console.log("Child tokens: ", childTokens);
  

  return parentTokens.every((t, i) => {
    return childTokens[i] === t;
  });

  //return parentTokens.every((t, i) => child.split('/')[i] === t);
}

export function resolvePath(root: string, dir: string): string {
  let resolvedPath = path.join(path.resolve(root), dir);
  if (!isChildOf(resolvedPath, root))
    throw new ResolveError(dir, "open");

  // let resErr = new ResolveError(dir, 'open');
  // console.error(resErr);
  // try {
  //   fs.readFileSync("/teest");
  // } catch (err) {
  //   console.error(err);
  // }

  return resolvedPath;
}

export function setPathArgument(root: string, args: any): void {
  if (typeof args[0] == 'string')
    args[0] = resolvePath(root, args[0]);
}


// function getResolvedPath(dir: string): string {
//   console.log("Resolving: ", dir);
//   return path.resolve(path.join(rootPath + dir));
// }