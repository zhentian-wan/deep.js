/**
 * Example
 type cases = [
  Expect<Equal<CartesianProduct<1 | 2, 'a' | 'b'>, [2, 'a'] | [1, 'a'] | [2, 'b'] | [1, 'b']>>,
  Expect<Equal<CartesianProduct<1 | 2 | 3, 'a' | 'b' | 'c' >, [2, 'a'] | [1, 'a'] | [3, 'a'] | [2, 'b'] | [1, 'b'] | [3, 'b'] | [2, 'c'] | [1, 'c'] | [3, 'c']>>,
  Expect<Equal<CartesianProduct<1 | 2, 'a' | never>, [2, 'a'] | [1, 'a'] >>,
  Expect<Equal<CartesianProduct<'a', Function | string>, ['a', Function] | ['a', string]>>,
]
*/
export type CartesianProduct<T, U> = T extends infer T1
  ? U extends infer U1
    ? [T1, U1] | CartesianProduct<Exclude<T, T1>, Exclude<U, U1>>
    : never
  : never;

/*
Example
Equal<UnionToIntersectionFn<'a' | 'b' | 'c'>, (() => "a") & (() => "b") & (() => "c")>
*/
export type UnionToIntersectionFn<U> = (U extends any ? (arg: () => U) => void : never) extends (arg: infer I) => void ? I : never;

/*
Example
Equal<GetLastUnion<'a' | 'b' | 'c'>, 'c'>
*/
export type GetLastUnion<U> = UnionToIntersectionFn<U> extends () => infer I ? I : never;

/*
Example
type cases = [
  Expect<Equal<UnionToTuple<'a' | 'b'>['length'], 2>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>>, 'a' | 'b'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a'>>, 'a'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>>, 'f' | 'd' | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>>, 'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'>>,
]
*/
// 参考：https://github.com/type-challenges/type-challenges/issues/10191
// 3. 联合类型转换为元组
export type UnionToTuple<U, Last = GetLastUnion<U>> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, Last>>, Last];

/*
Example
type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]
*/
export type TupleToUnion<T extends any[]> = T extends [infer F, ...infer RT] ? F | TupleToUnion<RT> : never;

export type UnionOfObjects<T extends object> = {
  [K in keyof T]: {
    type: K;
  } & T[K];
}[keyof T];