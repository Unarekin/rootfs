import * as fs from 'fs';
import * as path from 'path';
import * as fsUtils from '../utils/index';

let rootPath = "/";


let hookedFuncs: any = {};
let funcNames: string[] = [
  "readFile",
  "readFileSync",
  "readlink",
  "readlinkSync",
  "createReadStream",
  "open",
  "openSync",
  "readdir",
  "readdirSync",
  "realpath",
  "realpathSync"
];


funcNames.forEach((funcName: string): void => {
  hookedFuncs[funcName] = function(): void {
    fsUtils.setPathArgument(rootPath, arguments);
    return fs[funcName].apply(null, arguments);
  }
});

// function readFile(): void {
//   fsUtils.setPathArgument(rootPath, arguments);
//   return fs.readFile.apply(this, arguments); 
// }

// function readFileSync(): string | Buffer {
//   fsUtils.setPathArgument(rootPath, arguments);
//   return fs.readFileSync.apply(this, arguments);
// }

// function readlink(): void {
//   fsUtils.setPathArgument(rootPath, arguments);
//   return fs.readlink.apply(this, arguments);
// }

// function readlinkSync(): string | Buffer {
//   fsUtils.setPathArgument(rootPath, arguments);
//   return fs.readlinkSync.apply(this, arguments);
// }

// function createReadStream(): fs.ReadStream {
//   fsUtils.setPathArgument(rootPath, arguments);
//   return fs.createReadStream.apply(this, arguments);
// }


// function open(): void {
//   fsUtils.setPathArgument(rootPath, arguments);
//   return fs.open.apply(this, arguments);
// }

// function openSync(): number {
//   fsUtils.setPathArgument(rootPath, arguments);
//   return fs.openSync.apply(this, arguments);
// }


// function readdir(): void {
//   fsUtils.setPathArgument(rootPath, arguments);

// }


module.exports = function(root: string): Object {
  rootPath = root;

  //console.log("Root: ", rootPath);
  //rootPath = path.resolve(root);
  rootPath = root;
  return hookedFuncs;

}