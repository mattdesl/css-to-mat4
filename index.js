var splitter = /[,\s]+/i

module.exports = function parseMatrix3d(out, str) {
    var start = 'matrix3d('
    var is2d = false
    if (str.charAt(6) === '(') {
        start = 'matrix('
        is2d = true
    }

    //get components as floats
    var ret = str.substring(start.length, str.length-1).split(splitter)
    for (var i=0; i<ret.length; i++)
        ret[i] = parseFloat(ret[i], 10)
    if (is2d) 
        return toMat4(out, ret)
    else 
        return ret
}

function toMat4(out, a) {
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