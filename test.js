var parse = require('./')
var mat4 = require('gl-mat4')
var test = require('tape')

test('handles comma differences', function(t) {
    var a = parse('matrix(1,0,  0, 1,0,0)', [])
    var b = parse('matrix(1,0,0,1,0,0 )', [])
    t.deepEqual(a, b)
    t.end()
})

test('should parse css string', function(t) {
    var m = mat4.identity([])
    mat4.translate(m, m, [25, 15, 50])

    var str = 'matrix3d('+ m.join(', ') +')'

    var input = []
    var ret = parse(str, input)
    t.equal(ret, input, 'input matches output')
    t.deepEqual(ret, m, 'equals matrix3d')

    ret = parse(str)
    t.deepEqual(ret, m, 'creates new 16-len array')

    var str2d = 'matrix(0,0.5,1,0.25,0,1)'
    input = []
    ret = parse(str2d, input)
    t.equal(ret, input, 'input for 2d matches output')
    t.deepEqual(ret, [ 0, 0.5, 0, 0, 1, 0.25, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1 ], 'makes mat4 from mat2d')

    ret = parse(str2d)
    t.deepEqual(ret, [ 0, 0.5, 0, 0, 1, 0.25, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1 ], 'makes mat4 from mat2d w/ no output')
    t.end()
})