# lazyload

[![GitHub release](https://img.shields.io/github/release/NeuShimmer/lazyload.svg?style=flat-square)](https://github.com/NeuShimmer/lazyload/releases)
[![license](https://img.shields.io/github/license/NeuShimmer/lazyload.svg?style=flat-square)](https://github.com/NeuShimmer/lazyload/blob/master/LICENSE)
[![license](https://img.shields.io/npm/dt/shimmer-lazyload.svg?style=flat-square)](https://www.npmjs.com/package/shimmer-lazyload)

## Install

```shell
npm i shimmer-lazyload
// or
yarn add shimmer-lazyload
```

Or you can use `script` tag:

```html
<script src="https://unpkg.com/shimmer-lazyload@^4.0/dist/lazyload.min.js"></script>
```

## Usage

### Simple example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>lazyload</title>
  </head>
  <body>
    <script src="https://unpkg.com/shimmer-lazyload@^4.0/dist/lazyload.min.js"></script>

    <!-- A lot of content -->
    <!-- A lot of content -->

    <img
      id="img"
      data-src="real/image/src.jpg"
      src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">

    <script>
      var lzld = lazyload();
      lzld(document.getElementById(img));
    </script>
  </body>
</html>
```

### API

**var lzld = lazyload([opts])**

`opts` is an object with these defaults:

```js
{
  'offset': 200,
  'src': 'data-src',
  'container': false,
  'loader': null,
  'replaceGetAttribute': false
}
```

`opts.container` is the referencing container, it's the viewport, defaults to `document.body`

`opts.offset` is a length in pixels used to compute when an element will
soon be visible. So that you load it just before it becomes visible.

`opts.src` is the attribute name storing the real src of the element to load, or it can also be a `function`, so that you can have your custom `src` computing algorithm.
You can use it to [lazyload High DPI/retina images](examples/hidpi.html).

`opts.loader` is the `function` that you can custom the load behaviour, for example, load it into "background-image". see [examples/custom-loader.html](examples/custom-loader.html).

`opts.replaceGetAttribute` replace the default getAttribute or not.

Then, add the elements to lazyload:

```javascript
lzld(document.getElementById('image'));
lzld(document.querySelectorAll('img'));
```

## Developing

Launch the dev server:

```shell
npm run dev
// or
yarn dev
```

## Building

We provide a pre-built version of `lazyload` in `dist/lazyload.min.js`.

You can build your own:

```shell
npm run build
// or
yarn build
```

You get the build in `dist/lazyload.min.js`.

## Licence

(The MIT Licence)

Copyright (c) Vincent Voyer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
