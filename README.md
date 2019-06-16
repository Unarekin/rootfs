# rootfs 1.0
[![][npm-badge]][npm-url] [![][issues-badge]][issues-url] [![][license-badge]][license-url]

Rooted file system with [Node's `fs` API](https://nodejs.org/api/fs.html).

- Node's `fs` API implemented.
- Allows for a 'root' folder to be specified, limiting file access to files/directories underneath the root.
- Translates paths provided to fall within root directory.

### Install
npm:
```shell
npm install --save rootfs
```
yarn:
```shell
yarn add rootfs
```

## Usage
```js
import * as rootfs from 'rootfs';
const fs = rootfs('/path/to/root/folder');
```
```js
const fs = require('rootfs')('/path/to/root/folder');
```

```js
fs.writeFileSync("/test.txt", "Writing!");
fs.readFileSync("/test.txt") // Writing!
```
## Known Issues
- This project is developed on a Windows host, using an Ubuntu 18.04 virtual machine.  As such, symbolic links (hard and soft) is pretty fiddly on the development environment.

  This functionality is implemented, but not well-tested.
- The watch function unit tests are buggy, and are currently disabled until this can be remedied.

## License
The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-url]: https://www.npmjs.com/package/rootfs
[npm-badge]: https://img.shields.io/npm/v/rootfs.svg
[issues-badge]: https://img.shields.io/github/issues/unarekin/rootfs.svg
[issues-url]: https://github.com/Unarekin/rootfs/issues
[license-badge]: https://img.shields.io/github/license/unarekin/rootfs.svg
[license-url]: https://opensource.org/licenses/MIT
[rootfs]: https://github.com/unarekin/rootfs