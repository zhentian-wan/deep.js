class MemoizeMap {
  constructor() {
    this._map = new Map();
    this._weakMap = new WeakMap();
  }

  _isObject(v) {
    return typeof v === "object" && v !== null;
  }

  set(key, value) {
    if (this._isObject(key)) {
      this._weakMap.set(key, value);
    } else {
      this._map.set(key, value);
    }
  }

  get(key) {
    if (this._isObject(key)) {
      return this._weakMap.get(key);
    } else {
      return this._map.get(key);
    }
  }

  has(key) {
    if (this._isObject(key)) {
      return this._weakMap.has(key);
    } else {
      return this._map.has(key);
    }
  }
}

function memoize(func, resolver) {
  function memoized(...args) {
    const key = resolver ? resolver(...args) : args[0];
    const cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  }
  memoized.cache = new MemoizeMap();
  return memoized;
}

var object = { a: 1, b: 2 };
var other = { c: 3, d: 4 };

var values = memoize((obj) => Object.values(obj));
console.log(values(object)); // [ 1, 2 ]

console.log(values(other)); // [ 3, 4 ]

object.a = 2;
console.log(values(object)); // [ 1, 2 ]

values.cache.set(object, ["a", "b"]);
console.log(values(object)); // [ 'a', 'b' ]
