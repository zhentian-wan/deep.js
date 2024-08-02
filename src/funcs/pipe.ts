/**
* Example
  const stringToDateAndTime = pipe(Date.parse)
  .pipe(n => new Date())
  .pipe(d => d.toISOString())
  .pipe(s => s.split("T"))
  .pipe(a => ({date: a[0], time: a[1]}))

const result = stringToDateAndTime("Jan 1, 2024")
console.log(result) 
Output: {
  "date": "2024-08-02",
  "time": "06:26:59.607Z"
}
*/
export function pipe<A, B>(fn: (a: A) => B) {
  function run(a: A) {
    return fn(a)
  }

  run.pipe = <C, >(fn2: (b:  B) => C) => pipe((a: A) => fn2(fn(a)))

  return run;
}
