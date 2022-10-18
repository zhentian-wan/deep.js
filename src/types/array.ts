/*
Example
type cases = [
  // @ts-expect-error
  Shift<unknown>,
  Expect<Equal<Shift<[]>, []>>,
  Expect<Equal<Shift<[1]>, []>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
]
*/
export type Shift<T extends any[], ACC = T> = T extends [infer REMOVED, ...(infer REST)] ? REST: [];


/*
Example
type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]
*/
export type TupleToNestedObject<T extends any[], U> = T extends [infer A extends string, ...(infer REST)]
  ? {[Key in A]: TupleToNestedObject<REST, U>}
  : U;


/*
Example
type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]
*/
export type Reverse<T> = T extends [...infer H, infer T] ? [T, ...Reverse<H>] : [];

