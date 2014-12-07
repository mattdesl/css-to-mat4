# css-to-mat4

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Converts a matrix string like `matrix(1, 0, 0, 1, 0, 0)` or `matrix3d(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0)` into a 4x4 matrix (flat array).

```js
var style = require('dom-css')
var parse = require('css-to-mat4')
var getPrefix = require('prefix-style')

var prefix = getPrefix('transform')

if (prefix) { //transforms supported
    //apply some transforms with a complex CSS string
    style(div, 'transform', 'translateX(20px) rotateX(14deg)')

    //get computed style, which will be a flat matrix or matrix3d string
    var str = window.getComputedStyle(div)[prefix]

    //parse as a 4x4 matrix
    var mat = parse([], str)
    
    //do something with your matrix
}
```

## Usage

[![NPM](https://nodei.co/npm/css-to-mat4.png)](https://nodei.co/npm/css-to-mat4/)

#### `toMat4(out, str)`

Converts the `"matrix()"` or `"matrix3d()" string into a 16-float array representing a 4x4 matrix. 2D matrices will be stored in the upper left of a 4x4 identity matrix.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/css-to-mat4/blob/master/LICENSE.md) for details.
