const obj = {
  a: 1,
  b: 2,
  c: {
    d: 1,
    e: 2,
  },
};

function isObject(val) {
  return val !== null && typeof val === "object";
}

function observeDefineProperty(obj) {
  for (let key in obj) {
    let v = obj[key];
    if (isObject(v)) {
      observe(v);
    }
    Object.defineProperty(obj, key, {
      get() {
        console.log(key, "read", v);
        return v;
      },
      set(val) {
        if (val !== v) {
          console.log(key, "set", val);
          v = val;
        }
      },
    });
  }
}

function observe(obj) {
  const proxy = new Proxy(obj, {
    get(target, key) {
      const val = Reflect.get(target, key);
      console.log(key, "get", val);
      if (isObject(val)) {
        return observe(val);
      }
      return val;
    },
    set(target, key, newVal) {
      const oldVal = target[key];
      if (isObject(oldVal)) {
        observe(oldVal);
      }
      console.log(key, "set", newVal);
      return Reflect.set(target, key, newVal);
    },
    deleteProperty(target, key) {
      console.log(key, "delete");
      return Reflect.deleteProperty(target, key);
    },
  });
  return proxy;
}

const pobj = observe(obj);
pobj.a;
pobj.a = 3;
pobj.c.d;
pobj.c.d = 3;

delete pobj.b;

pobj.f = 123;
