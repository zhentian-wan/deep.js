import type {CamelizeWord} from './string';

export type FalsyValues =
  | ""
  | []
  | Record<PropertyKey, never>
  | 0
  | false
  | undefined
  | null;
export type Space = " " | "\n" | "\t";

/*
Example
type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]
*/
export type Camelize<T> = T extends any[] 
  ? T extends [infer F, ...infer RT]
    ? [Camelize<F>, ...Camelize<RT>]
    : []
  : {
    [Key in keyof T as Key extends string ? `${CamelizeWord<Key>}`: never]: T[Key] extends object ? Camelize<T[Key]> : T[Key]                 
  };

/*
Example
type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]
*/
export type KebabCase<S extends string> =
  S extends `${infer First}${infer REST}`
    ? REST extends Uncapitalize<REST>
      ? `${Lowercase<First>}${KebabCase<REST>}`
      : `${Lowercase<First>}-${KebabCase<REST>}`
    : S;

/*
Example
type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]
*/
type ToCamelCase<
  S extends string,
  ACC extends string = ""
> = S extends `${infer F}${infer REST}`
  ? F extends "_"
    ? ToCamelCase<Capitalize<REST>, `${ACC}`>
    : ToCamelCase<REST, `${ACC}${F}`>
  : ACC;
export type CamelCase<S extends string> = ToCamelCase<Lowercase<S>>; // conver all chars to lower case first

/*
Example:
StringToUnion<"ABC"> = "" | "A" | "B" | "C"
*/
export type StringToUnion<S extends string> = S extends `${infer A}${infer B}`
  ? A | StringToUnion<B>
  : "";
export type LowerLetterUnion = StringToUnion<"abcdefghijklmnopqrstuvwxyz">;
export type UpperLetterUnion = Uppercase<LowerLetterUnion>;
export type Equal<T, U> = (<P>(x: P) => P extends T ? 1 : 2) extends <P>(
  x: P
) => P extends U ? 1 : 2
  ? true
  : false;
/*
Example:    
type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]    
*/
export type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = M["length"] extends 0
  ? `${B}__${E[number]}`
  : E["length"] extends 0
  ? `${B}--${M[number]}`
  : `${B}__${E[number]}--${M[number]}`;

/*
 Example
 type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  },
  hobbies: ['swim', 'sing']
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]
*/
type ArrayToPrimitive<T extends any[], ACC extends any[] = []> = T extends [
  infer F,
  ...infer RT
]
  ? [ValueToPrimitive<F>, ...ArrayToPrimitive<RT>]
  : ACC;
type ObjectToPrimitive<T extends Record<PropertyKey, any>> = {
  [Key in keyof T]: T[Key] extends Record<PropertyKey, any>
    ? ObjectToPrimitive<T[Key]>
    : ValueToPrimitive<T[Key]>;
};
type ValueToPrimitive<T extends any> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends undefined
  ? undefined
  : T extends null
  ? null
  : never;
export type ToPrimitive<T extends Record<PropertyKey, any>> = {
  [Key in keyof T]: T[Key] extends any[]
    ? ArrayToPrimitive<T[Key]>
    : T[Key] extends object
    ? ObjectToPrimitive<T[Key]>
    : ValueToPrimitive<T[Key]>;
};

/*
Example
type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]
*/
export type UnionToIntersection<U> = (
  U extends any ? (x: U) => any : never
) extends (x: infer R) => any
  ? R
  : never;

/*
Example
ExtractValuesOfTuple<['a', 'b']>, 'a' | 'b'>
*/
export type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number];

/*
Example
type cases = [
  Expect<Equal<PathParams<"/profile">, never>>,
  Expect<Equal<PathParams<"/profile/:userId">, "userId">>,
  Expect<
    Equal<PathParams<"/profile/:userId/posts/:postId">, "userId" | "postId">
  >,
] 
*/
export type PathParams<S extends string> =
  S extends `/${string}/:${infer Param}/${infer REST}`
    ? Param | PathParams<`/${REST}`>
    : S extends `${string}/:${infer Param}`
    ? Param
    : never;

/*
Example
type cases = [
  Expect<Equal<IsAny<any>, true>>,
  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]
*/
export type IsAny<T> = Equal<any, T>;

/*
Example:
type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]
*/
export type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
  ? any[] extends T
    ? false
    : true
  : false;

/*
Example
type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]
*/
export type IsNever<T> = [T] extends [never] ? true : false;

/*
Example
type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
  Expect<Equal<ToNumber<'18@7_$%'>, never>>,
]
*/
export type ToNumber<
  S extends string,
  ACC extends unknown[] = []
> = S extends `${number}`
  ? S extends `${ACC["length"]}`
    ? ACC["length"]
    : ToNumber<S, [...ACC, unknown]>
  : never;

/*
 Example
 type t = Nullable<{a: number, b: string}> // {a: number | null, b: string | null}
 */
export type Nullable<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T]: T[K] | null;
};

/*
Example
type t = XOR<true, false> // true
type t1 = XOR<true, true> // false
*/
export type XOR<N extends boolean, M extends boolean> = [N, M] extends [
  true,
  true
]
  ? false
  : [N, M] extends [false, false]
  ? false
  : true;
