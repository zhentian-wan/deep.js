import { PlusOne } from "./number";
import type { Equal, FalsyValues } from "./utils";

/*
Example
type cases = [
  Expect<Equal<All<[1, 1, 1], 1>, true>>,
  Expect<Equal<All<[1, 1, 2], 1>, false>>,
  Expect<Equal<All<["1", "1", "1"], "1">, true>>,
  Expect<Equal<All<["1", "1", "1"], 1>, false>>,
  Expect<Equal<All<[number, number, number], number>, true>>,
  Expect<Equal<All<[number, number, string], number>, false>>,
  Expect<Equal<All<[null, null, null], null>, true>>,
  Expect<Equal<All<[[1], [1], [1]], [1]>, true>>,
  Expect<Equal<All<[{}, {}, {}], {}>, true>>,
];
*/
export type All<T extends any[], U extends any = T[0]> = T extends [infer H, ...infer RT]
  ? Equal<H, U> extends true 
    ? All<RT, U>
    : false
  : true;

/*
Example
type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]
*/
export type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer RT]
  ? F extends FalsyValues
    ? AnyOf<RT>
    : true
  : false;

/*
Example
type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>,
]
*/
export type ConstructTuple<
  L extends number,
  ACC extends unknown[] = []
> = L extends 0
  ? []
  : ACC["length"] extends L
  ? ACC
  : ConstructTuple<L, [...ACC, unknown]>;

/*
Example
type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]
*/
export type Chunk<
  T extends any[],
  U extends number,
  ACC extends any[] = []
> = ACC["length"] extends U
  ? [ACC, ...Chunk<T, U>]
  : T extends [infer F, ...infer RT]
  ? Chunk<RT, U, [...ACC, F]>
  : ACC["length"] extends 0
  ? []
  : [ACC];

/*
Example
const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<Equal<
  Enum<typeof OperatingSystem>,
  {
    readonly MacOS: 'macOS'
    readonly Windows: 'Windows'
    readonly Linux: 'Linux'
  }
  >>,
  Expect<Equal<
  Enum<typeof OperatingSystem, true>,
  {
    readonly MacOS: 0
    readonly Windows: 1
    readonly Linux: 2
  }
  >>,
  Expect<Equal<
  Enum<typeof Command>,
  {
    readonly Echo: 'echo'
    readonly Grep: 'grep'
    readonly Sed: 'sed'
    readonly Awk: 'awk'
    readonly Cut: 'cut'
    readonly Uniq: 'uniq'
    readonly Head: 'head'
    readonly Tail: 'tail'
    readonly Xargs: 'xargs'
    readonly Shift: 'shift'
  }
  >>,
  Expect<Equal<
  Enum<typeof Command, true>,
  {
    readonly Echo: 0
    readonly Grep: 1
    readonly Sed: 2
    readonly Awk: 3
    readonly Cut: 4
    readonly Uniq: 5
    readonly Head: 6
    readonly Tail: 7
    readonly Xargs: 8
    readonly Shift: 9
  }
  >>,
]
*/
export type Enum<T extends readonly string[], N extends boolean = false> = {
  readonly [Key in T[number] as `${Capitalize<Key>}`]: N extends false
    ? Key
    : FindIndex<T, Key>;
};

export type FindIndex<
  T extends readonly any[],
  K,
  ACC extends unknown[] = []
> = T extends readonly [infer F, ...infer RT]
  ? K extends F
    ? ACC["length"]
    : FindIndex<RT, K, [...ACC, unknown]>
  : -1;

/*
Example
type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]
*/
export type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  P extends number = 0 // set a pointer, init with 0
> = Start extends End // Stop when Start = End
  ? T
  : T extends [infer F, ...infer RT]
  ? P extends Start
    ? [N, ...Fill<RT, N, PlusOne<Start>, End, PlusOne<P>>] // Replace the value when Pointer = Start, increasing value by 1
    : [F, ...Fill<RT, N, Start, End, PlusOne<P>>] // No need to replace F, increase P
  : [];

/*
Example
type Falsy = false | 0 | '' | null | undefined

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>
]
*/
export type Filter<T extends any[], U, ACC extends any[] = []> = T extends [infer F, ...infer RT]
  ? F extends U
    ? Filter<RT, U, [...ACC, F]>
    : Filter<RT, U, ACC>
  : ACC;

/*
Example
type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]
*/
export type FilterOut<T extends any[], U, ACC extends any[] = []> = T extends [
  infer F,
  ...infer REST
]
  ? [F] extends [U]
    ? FilterOut<REST, U, ACC>
    : FilterOut<REST, U, [...ACC, F]>
  : ACC;

/*
Example
type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]
*/
export type Flatten<T> = T extends []
  ? []
  : T extends [infer H, ...infer T]
  ? [...Flatten<H>, ...Flatten<T>]
  : [T];

/*
Example
type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]
*/
export type First<T extends any[]> = T extends [infer First, ...infer _]
  ? First
  : never;

// check array or tuple has at least one element
export type hasElement<T extends any[]> = '0' extends keyof T
  ? true
  : false;


/*
Example
const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]
*/
export type Length<T extends readonly any[]> = T["length"];

/*
Example
type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]
*/
export type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;

/*
Example
type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]
*/
export type LastIndexOf<T extends any[], U> = T extends [...infer RT, infer L]
  ? Equal<L, U> extends true
    ? RT["length"]
    : LastIndexOf<RT, U>
  : -1;

/*
Example
type cases = [
  Expect<Equal<Head<[3, 2, 1]>, 3>>,
  Expect<Equal<Head<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<Head<[]>, never>>,
  Expect<Equal<Head<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  Head<'notArray'>,
  // @ts-expect-error
  Head<{ 0: 'arrayLike' }>,
]
*/
export type Head<T extends any[]> = T extends [infer HEAD, ...infer _]
  ? HEAD
  : never;

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
export type Shift<T extends any[]> = T extends [infer _, ...infer REST]
  ? REST
  : [];

/*
Example
type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
]
*/
export type Join<
  T extends any[],
  U extends string | number,
  ACC extends string = ""
> = T extends [infer A extends string, ...infer RT extends string[]]
  ? RT["length"] extends 0
    ? `${ACC}${A}`
    : Join<RT, U, `${ACC}${A}${U}`>
  : ACC;


/*
Example: NonEmptyArray
export const makeEnum = (values: NonEmptyArray<string>) => {};

makeEnum(["a"]);
makeEnum(["a", "b", "c"]);

// @ts-expect-error
makeEnum([]);
*/
export type NonEmptyArray<T> = [T, ...Array<T>];

export type NestedNumber = number | NestedNumber[];

/*
Example
type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]
*/
export type Includes<T extends readonly any[], U> = T extends [
  infer F,
  ...infer RT
]
  ? Equal<F, U> extends true
    ? true
    : Includes<RT, U>
  : false;

/**
Example
type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
]
*/
export type CheckRepeatedTuple<T extends unknown[]> = T extends [infer Check, ...infer REST] ? Includes<REST, Check> : false;

/*
Example
type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]
*/
export type IndexOf<
  T extends any[],
  U,
  ACC extends unknown[] = []
> = T extends [infer F, ...infer RT]
  ? Equal<F, U> extends true
    ? ACC["length"]
    : IndexOf<RT, U, [...ACC, unknown]>
  : -1;

/*
Example
type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]
*/
export type Push<T extends any[], U> = [...T, U];

/*
Example
type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
]
*/
export type Pop<T extends any[]> = T extends [...infer RT, infer _] ? RT : [];

/*
Example:
type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]
*/
export type Permutation<T, U = T> = [T] extends [never]
  ? []
  : U extends any
  ? [U, ...Permutation<Exclude<T, U>>]
  : [];

/*
Example
type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]
*/
export type Reverse<T> = T extends [...infer H, infer T]
  ? [T, ...Reverse<H>]
  : [];

/*
Example
type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]
*/
export type Unshift<T extends any[], U> = [U, ...T];

/*
Example
type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]
*/
export type Subsequence<T extends any[]> = T extends [infer F, ...infer RT]
  ? Subsequence<RT> | [F, ...Subsequence<RT>]
  : [];

/*
Example
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const
type x= TupleToObject<typeof tuple>
type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1,2], {}]>
*/
export type TupleToObject<T extends ReadonlyArray<string | number>> = {
  [Key in T[number]]: Key;
};

/**
 type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>, [[1, 4, 7], [2, 5, 8], [3, 6, 9]]>>,
]
 */
export type Transpose<M extends number[][],R = M['length'] extends 0?[]:M[0]> = {
  [X in keyof R]:{
    [Y in keyof M]:X extends keyof M[Y]?M[Y][X]:never
  }
}

/*
Example
type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]
*/
export type TupleToNestedObject<T extends any[], U> = T extends [
  infer A extends string,
  ...infer REST
]
  ? { [Key in A]: TupleToNestedObject<REST, U> }
  : U;

/*
Example
type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]
*/
export type Unique<T extends any[], ACC extends any[] = []> = T extends [
  infer F,
  ...infer RT
]
  ? IndexOf<ACC, F> extends -1
    ? Unique<RT, [...ACC, F]>
    : Unique<RT, ACC>
  : ACC;

/*
Example
type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]
*/
export type Without<T extends any[], U extends any[] | any> = T extends [
  infer F,
  ...infer RT
]
  ? U extends any[] // U is array like
    ? F extends U[number] // F in U array
      ? Without<RT, U> // exlcude F
      : [F, ...Without<RT, U>] // include F
    : F extends U // U is not an array like
    ? Without<RT, U> // exlcude F
    : [F, ...Without<RT, U>] // include F
  : [];

/*
Example
type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]
*/
export type Zip<T, U> = T extends [infer F1, ...infer R1]
  ? U extends [infer F2, ...infer R2]
    ? [[F1, F2], ...Zip<R1, R2>]
    : []
  : [];
