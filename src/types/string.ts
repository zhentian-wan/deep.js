/*
Example:
type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,
]
*/
export type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true: false;

/*
Example:
type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>,
]
*/
export type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true: false;

/*
Example:
StringToUnion<"ABC"> = "" | "A" | "B" | "C"
*/
export type StringToUnion<S extends string> = S extends `${infer A}${infer B}` ? A | StringToUnion<B>: '';
export type Combinations<T extends string, U = T> = U extends T
  ? U | `${U}${Combinations<Exclude<T, U>>}`
  : never;
/*
Example:
type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>
]
*/
export type Permutations<S extends string> = Combinations<StringToUnion<S>>;
