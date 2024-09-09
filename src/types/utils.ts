import { MergeObject } from "./object";
import type { CamelizeWord } from "./string";

export type BanType<T, E> = T extends E ? never : T;
export type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;
export type DistributivePick<T, K extends PropertyKey> = T extends any
  ? Pick<T, K>
  : never;
export type AnyPropertyKey = keyof any;
declare const brand: unique symbol;
export type Brand<K, T> = T & {[brand]: K}
export type Valid<T> = Brand<T, "Valid">;
export declare type Try<A1, A2, Catch = never> = A1 extends A2 ? A1 : Catch;
export declare type Narrowable = string | number | bigint | boolean;
export declare type NarrowRaw<A> = (A extends [] ? [] : never) | (A extends Narrowable ? A : never) | ({
    [K in keyof A]: A[K] extends (...args: any[]) => void ? A[K] : NarrowRaw<A[K]>;
});
export type Debug<T> = { [K in keyof T]: T[K] };
export type EnumLike = {
  [k: string]: string | number;
  [nu: number]: string;
};
export type Expect<T extends true> = T;
export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE
  ? true
  : false;

export type FalsyValues =
  | ""
  | []
  | Record<PropertyKey, never>
  | 0
  | false
  | undefined
  | null;
export type Space = " " | "\n" | "\t";
export type Result<TResult, TError extends {message: string} = Error> =
  | {
      success: true;
      data: TResult;
    }
  | {
      success: false;
      error: TError;
    };

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
      [Key in keyof T as Key extends string
        ? `${CamelizeWord<Key>}`
        : never]: T[Key] extends object ? Camelize<T[Key]> : T[Key];
    };

/*
Example: DiscrimatedUnionToObject
type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about" }
  | { route: "/admin" }
  | { route: "/admin/users" };
type tests = [
  Expect<
    Equal<
      DiscrimatedUnionToObject<Route, "route">,
      {
        "/": {
          search: {
            page: string;
            perPage: string;
          };
        };
        "/about": unknown;
        "/admin": unknown;
        "/admin/users": unknown;
      }
    >
  >
];
*/
export type DiscrimatedUnionToObject<
  T extends Record<PropertyKey, any>,
  U extends keyof T
> = {
  [P in T as P[U]]: [Exclude<keyof P, U>] extends [never]
    ? unknown
    : {
        [Key in Exclude<keyof P, U>]: P[Key];
      };
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
type ValueToPrimitive<T> = T extends string
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

/**
 * Example
 * type cases = [
 * Expect<Equal<BinaryToDecimal<'10'>, 2>>,
 * Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
 * Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
 * Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
 * Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
 * ]
 * @public
 */
export type NumberToArray<
  T extends number,
  R extends 1[] = []
> = R["length"] extends T ? R : NumberToArray<T, [...R, 1]>;

type GetTwice<T extends unknown[]> = [...T, ...T];

export type BinaryToDecimal<
  S extends string,
  Result extends unknown[] = []
> = S extends `${infer First extends number}${infer RT}`
  ? BinaryToDecimal<RT, [...GetTwice<Result>, ...NumberToArray<First>]>
  : Result["length"];

/**
 * Example
 * type cases = [
 * Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
 * Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
 * Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
 * Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
 * Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
 * Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>,
 *]
 *
 *
 * @public
 */
export type ToUnion<T> = T extends any[] ? T[number] : T;
export type Intersection<T> = T extends [infer F, ...infer RT]
  ? ToUnion<F> & Intersection<RT>
  : unknown;

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
type tests = [
  Expect<Equal<Identity<1>, 1>>,
  Expect<Equal<Identity<"1">, "1">>,
  Expect<Equal<Identity<true>, true>>,
  Expect<Equal<Identity<false>, false>>,
  Expect<Equal<Identity<null>, null>>
];
function fn<T>(inputs: Identity<T>) {}
fn([{name: 'apple', price: 1}])
*/
declare type Identity<A> = Try<A, [], NarrowRaw<A>>;

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
export type NotAny<T> = true extends IsAny<T> ? false : true;
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
let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<IsInteger<1>, 1>>,
  Expect<Equal<IsInteger<1.1>, never>>,
  Expect<Equal<IsInteger<1.0>, 1>>,
  Expect<Equal<IsInteger<typeof x>, never>>,
  Expect<Equal<IsInteger<typeof y>, 1>>,
]
*/
export type IsInteger<T> = `${T & number}` extends `${number}.${number}`
  ? never
  : number extends T
  ? never
  : T;

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
export type ExpectTrue<T extends true> = T;
export type ExpectFalse<T extends false> = T;
export type IsTrue<T extends true> = T;
export type IsFalse<T extends false> = T;
export type isNegative<T extends number> =
  NumberToString<T> extends `-${number}` ? true : false;
export type NumberToString<T extends number> = `${T}`;
export type NotNil<T> = T extends object ? true: false;
export type IsNil<T> = T extends object ? false: true;
/*
Example: IsUnion
type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]
*/
export type IsUnion<T> = NotEqual<[T] & T,(T extends T ? [T] : never) & T>;

/*
Example: ObjectToUnion
interface Attributes {
  id: string;
  email: string;
  username: string;
}
type tests = [
  Expect<
    Equal<
      ExclusiveAttributes,
      | {
          id: string;
        }
      | {
          email: string;
        }
      | {
          username: string;
        }
    >
  >
];
*/
export type ObjectToUnion<T> = {
  [Key in keyof T]: Record<Key, T[Key]>;
}[keyof T];

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

export type NeverByKeys<T, K extends keyof T = keyof T> = MergeObject<Omit<T, K> & {
  [Key in keyof T as Key extends K ? Key : never]?: never;
}>;

export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

/*
Example
type tests = [
  Expect<Equal<Maybe<string>, string | null | undefined>>,
  Expect<Equal<Maybe<number>, number | null | undefined>>,
  Expect<Equal<Maybe<boolean>, boolean | null | undefined>>,
  Expect<Equal<Maybe<null>, null | undefined>>
];
*/
export type Maybe<T extends object> =
  | T
  | null
  | undefined;

export type MergeInsertions<T> = T extends object
  ? { [K in keyof T]: MergeInsertions<T[K]> }
  : T;

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

export type OverloadedReturnType<T> =
  T extends { (...args: any[]) : infer R; (...args: any[]) : infer R; (...args: any[]) : infer R ; (...args: any[]) : infer R } ? R  :
  T extends { (...args: any[]) : infer R; (...args: any[]) : infer R; (...args: any[]) : infer R } ? R  :
  T extends { (...args: any[]) : infer R; (...args: any[]) : infer R } ? R  :
  T extends (...args: any[]) => infer R ? R : any

export type OverloadedParameters<T> =
  T extends { (...args: infer A1) : any; (...args: infer A2) : any; (...args: infer A3) : any ; (...args: infer A4) : any } ? A1|A2|A3|A4  :
  T extends { (...args: infer A1) : any; (...args: infer A2) : any; (...args: infer A3) : any } ? A1|A2|A3 :
  T extends { (...args: infer A1) : any; (...args: infer A2) : any } ? A1|A2  :
  T extends (...args: infer A) => any ? A : any

/*
Example:
type Icon = "home" | "settings" | "about";
type ButtonVariant = "primary" | "secondary" | "tertiary";
type LooseIcon = LooseAutocomplete<Icon>;
type LooseButtonVariant = LooseAutocomplete<ButtonVariant>;

export const icons: LooseIcon[] = [
  "home",
  "settings",
  "any-other-string",
  // I should get autocomplete if I add a new item here!
];

export const buttonVariants: LooseButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "any-other-string",
  // I should get autocomplete if I add a new item here!
];
*/
export type LooseAutocomplete<T> = T | (string & {});

/**
 * Example
 * type Example1 = WidenLiteral<"abc"> // string
   type Example2 = WidenLiteral<true> // boolean
   type Example3 = WidenLiteral<"abc" | 35> // string | number

   // If it's not a literal, return as it is
   type Example4 = WidenLiteral<{name: "abc"}> //{name: "abc"}
 */
export type WidenLiteral<T> = T extends string | number | boolean ? ReturnType<T["valueOf"]> : T;
