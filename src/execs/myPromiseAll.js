Promise.myAll = function (promises) {
  let res, rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  let i = 0;
  let result = [];
  for (const promise of promises) {
    const index = i;
    i++;
    Promise.resolve(promise).then((data) => {
      result[index] = data;
      i--;
      if (i === 0) {
        res(result);
      }
    }, rej);
  }
  if (i === 0) {
    return res([]);
  }
  return p;
};

const res = Promise.myAll([1, Promise.resolve(2), Promise.resolve(3), 4]);
res
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
