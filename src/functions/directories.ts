import * as fs from 'fs';
import * as path from 'path';
import * as fsUtils from '../utils/index';

let rootPath = "/";


let hookedFuncs: any = {};
let funcNames: string[] = [
  "mkdir",
  "mkdirSync",
  "mkdtemp",
  "mkdtempSync",
  "readdir",
  "readdirSync",
  "realpath",
  "realpathSync",
  "rmdir",
  "rmdirSync"
];


funcNames.forEach((funcName: string): void => {
  hookedFuncs[funcName] = function(): void {
    fsUtils.setPathArgument(rootPath, arguments);
    return fs[funcName].apply(null, arguments);
  }
});


module.exports = function(root: string): Object {
  rootPath = root;

  //console.log("Root: ", rootPath);
  //rootPath = path.resolve(root);
  rootPath = root;
  return hookedFuncs;

}