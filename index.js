var splitter = /[,\s]+/i
var MAT_2D = 'matrix('
var MAT_3D = 'matrix3d('

module.exports = function parseMatrix3d(str, out) {
    var start = MAT_3D.length
    var is2d = false
    if (str.charAt(6) === '(') {
        start = MAT_2D.length
        is2d = true
    }

    //get components as floats
    var numbers = str.substring(start, str.length-1).split(splitter)
    for (var i=0; i<numbers.length; i++) 
        numbers[i] = parseFloat(numbers[i], 10)
    

    //if 2D matrix, copy into mat4
    if (numbers.length<16) 
        return toMat4(out, numbers)

    //if no out is specified, we can use the split() array
    if (!out)
        return numbers

    //otherwise we will copy values over
    for (i=0; i<16; i++) 
        out[i] = numbers[i]
    return out
}

function toMat4(out, a) {
    if (!out)
        out = new Array(16)

    out[0] = a[0]
    out[1] = a[1]
    out[2] = 0
    out[3] = 0
    out[4] = a[2]
    out[5] = a[3]
    out[6] = 0
    out[7] = 0
    out[8] = 0
    out[9] = 0
    out[10] = 1
    out[11] = 0
    out[12] = a[4]
    out[13] = a[5]
    out[14] = 0
    out[15] = 1
    return out
}