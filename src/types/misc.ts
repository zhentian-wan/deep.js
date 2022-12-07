import type { Equal, NumberToArray } from "./utils";
import type { Split } from "./string";
import type { Reverse, Join } from "./array";
/*
Example:
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
]
*/
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
export type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [...InorderTraversal<T["left"]>, T["val"], ...InorderTraversal<T["right"]>]
  : [];

/*
Example:
type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]
*/
export type Fibonacci<
  T extends number,
  C extends unknown[] = [],
  U1 extends unknown[] = [],
  U2 extends unknown[] = [unknown]
> = T extends C["length"]
  ? U1["length"]
  : Fibonacci<T, [unknown, ...C], U2, [...U1, ...U2]>;

/*
Example
declare function format<S extends string>(template: S, args: Record<Placeholder<S>, unknown>): string
let text = format('Name: {name}, Age: {age}', {name: 'Homer', age: 42})
*/
export type Placeholder<T extends string> =
  T extends `${string}{${infer P}}${infer REST}`
    ? P | Placeholder<REST>
    : never;

/*
Example
declare function makeWatchedObject<T>(obj: T): T & OnPropChnagedMethods<T>;
let homer = makeWatchedObject({
  firstName: "Homer",
  age: 33,
  location: "Springfield"
})
*/
export type OnPropChnagedMethods<T> = {
  [Key in keyof T & string as `${Key}Changed`]: (
    cb: (newValue: T[Key]) => void
  ) => void;
};

/*
Example

*/
export type IsPalindrome<T extends string | number> = Equal<
  `${T}`,
  Join<Reverse<Split<`${T}`, "">>, "">
>;

/**
 * Example
 * type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
]
 */

type RecursiveAdd<Current extends number, T extends number[], Target extends number> = T extends [infer F, ...infer RT extends number[]]
  ? [...NumberToArray<F>, ...NumberToArray<Current>]['length'] extends Target
    ? true
    : RecursiveAdd<Current, RT, Target>
  : false;

export type TwoSum<T extends number[], U extends number> = T extends [infer F extends number, ...infer RT extends number[]]
  ? RecursiveAdd<F, RT, U> extends false
    ? TwoSum<RT, U>
    : true
  : false;

/**
 * Example
 * type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]
 */
export type UnionReplace<T, U extends [any, any][]> = U extends [infer F, ...infer RT extends [any, any][]]
? F extends [infer ToBeReplaced, infer Replacer]
  ? UnionReplace<Exclude<T, ToBeReplaced> | Replacer, RT>
  : UnionReplace<T, RT>
: T
