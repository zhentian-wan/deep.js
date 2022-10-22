/*
Example
type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
]
*/
export type MinusOne<T extends number, ARR extends unknown[] = []> = any extends never ? never: [...ARR, 1]['length'] extends T ? ARR['length'] : MinusOne<T, [...ARR, 1]>;

/*
Only positive number
Example
type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]
*/
export type GreaterThan<T extends number, U extends number, ACC extends unknown[] = []> = 
  T extends ACC['length']
    ? false
    : U extends ACC['length']
      ? true
      : GreaterThan<T, U, [...ACC, unknown]>;
