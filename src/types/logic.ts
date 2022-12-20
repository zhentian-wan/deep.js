/**
* And<T, U>
*/
export type And<B1 extends boolean, B2 extends boolean> = B1 extends true ? (B2 extends true ? true : false) : false;

/*
Example
type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>
*/
export type If<C extends boolean, T, F> = C extends true ? T : F;


