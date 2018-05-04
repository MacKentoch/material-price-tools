# Material Price Tool

## contents

- react 16.3+
- redux 4+
- [Material UI Next](https://material-ui-next.com/)
- react-router v4
- react-router-redux 5+
- react-hot-loader v4+
- flow (*code types gives better code and also intellisence in your editor if you hgave the plugin*)
- prettier (*a standard nowadays*)
- eslint (*a standard nowadays*)
- webpack 4.x
- workbox-webpack-plugin (*not used here since it would need app to be served through **https** to avoid errors in the console when service worker tries to install*)
- [loadable-components](https://github.com/smooth-code/loadable-components)
- [react-snap](https://github.com/stereobooster/react-snap)

## Usage

### Prerequis

Ensure having [`NodeJS 8`](https://nodejs.org/en/) installed and [`yarn 1.6+`](https://yarnpkg.com/lang/en/) (*npm should do the job but I better use yarn*).

I use [`VSCode`](https://code.visualstudio.com/) as the code editor but any editor with flow js, babel, prettier, eslint-plugin (etc...) would be extremely better to enjoy the intellisence (*like your were doing some C# or Java...*) and the coding experience (*not important to launch application*).

### Install

```bash
npm install
```

or

```bash
yarn install
```

### analyse production bundle weight

```bash
npm run analyze
```

### start dev server with hot reload

```bash
npm run start
```

### mini node-express server

Start dev. bundled application:

```bash
npm run serve-dev
```

Start prod. bundled application:

```bash
npm run serve-prod
```

## License

 The MIT License (MIT)

 Copyright (c) 2018 Erwan DATIN

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
