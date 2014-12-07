var style = require('dom-css')
var cssStr = require('matrix-to-css')

var test = require('tape').test
var toMat4 = require('./')
var prefix = require('prefix-style')

function getTransform(div) {
    return window.getComputedStyle(div)[prefix('transform')]
}

test('handles comma differences', function(t) {
    var a = toMat4([], 'matrix(1,0,  0, 1,0,0)')
    var b = toMat4([], 'matrix(1,0,0,1,0,0 )')
    t.deepEqual(a, b)
    t.end()
})

test("handles 2d matrix", function(t) {        
    var div = document.body.appendChild(document.createElement('div'))

    style(div, {
        transform: 'rotateZ(40deg) translateX(12px) translateY(50px) scaleX(0.5)'
    })

    var result1 = toMat4([], getTransform(div))

    style(div, 'transform', '') //clear current first
    style(div, 'transform', cssStr(result1))

    var result2 = toMat4([], getTransform(div))
    t.deepEqual(result1, result2, 'matrix() handled correctly')
    document.body.removeChild(div)

    t.end()
})

test("handles 3d matrix", function(t) {        
    var div = document.body.appendChild(document.createElement('div'))

    style(div, {
        transform: 'rotateZ(20deg) rotateX(35deg) translateZ(100px) translateX(202px) translateY(50px) scaleX(0.5)'
    })

    var result1 = toMat4([], getTransform(div))

    style(div, 'transform', '') //clear current first
    style(div, 'transform', cssStr(result1))

    var result2 = toMat4([], getTransform(div))
    t.deepEqual(result1, result2, 'matrix3d() handled correctly')

    document.body.removeChild(div)
    t.end()
})