const add = new Proxy({
    _store: 0
}, {
    get: function(target, key, receiver) {
        if (key === Symbol.toPrimitive) {
            // return a function that returns the value of the _store property
            return () => target._store;
        }
        target._store += +key
        return receiver
    }
});

const res1 = add[1][2][3] + 4; // 10
const res2 = add[10][20][30] + 40; // 100
const res3 = add[100][200][300] + 400; // 1000