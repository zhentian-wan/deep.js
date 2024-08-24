/**
 * Access private object defined in IIFE
 */
export function createBackdoor() {
    Object.defineProperty(Object.prototype, "_backdoor", {
        get() {
            return this;
        },
    });
 }


function run() {
    var o = (function () {
        var obj = {
          a: 1,
          b: 2,
        };
        return {
          get: function (k) {
            return obj[k];
          },
        };
     })();
     createBackdoor();
    o.get('_backdoor').a = "Hello World!"
    console.log(o.get('a'))
}

// How to prevent?
/**
 * 1. var obj = Object.freeze({
          a: 1,
          b: 2,
});

2. const o = Object.create(null); // deatch Object prototype
o.a = 1
o.b = 2
 */