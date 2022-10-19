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
export type MinusOne<T extends number, ARR extends unknown[] = []> = any extends never ? never: [...ARR, 1]['length'] extends T ? ARR['length'] : MinusOne<T, [...ARR, 1]>
