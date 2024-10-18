Function.apply.myCall = function (ctx, ...args) {
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
  const fn = this;
  const key = Sybmol("fn");
  // we don't want user can see [Sybmol("key")] in Function prototype
  // that's why we use Object.defineProperty to make it non-enumerable
  Object.defineProperty(ctx, key, {
    enumarable: false,
    value: fn,
  });
  const r = ctx[key](...args);
  return r;
};

function method(a, b) {
  console.log("args:", a, b);
  console.log("this:", this);
}

method.myCall(1, 2, 3); // this: [Number: 1]
method.myCall(null, 2, 3); // this: [global]
method.myCall(undefined, 2, 3); // this: [global]
method.myCall({}, 2, 3); // this: {}
