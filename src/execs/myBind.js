Function.prototype.myBind = function (ctx, ...args) {
  const fn = this;
  return function (...subArgs) {
    console.log(new.target);
    const allArgs = [...args, ...subArgs];
    if (new.target) {
      return new fn(...allArgs);
    } else {
      return fn.apply(ctx, allArgs);
    }
  };
};

function fn(a, b, c, d) {
  console.log("fn called");
  console.log("args", a, b, c, d);
  console.log("this", this);
  return 123;
}

const myFn = fn.myBind("ctx", 1, 2);
const newFn = fn.bind("ctx", 1, 2);
console.log(myFn(3, 4));
console.log(newFn(3, 4));
console.log(new myFn(3, 4));
console.log(new newFn(3, 4));
