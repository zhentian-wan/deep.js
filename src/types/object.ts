/* Object */

export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer InferredArrayMember>
    ? DeepPartialArray<InferredArrayMember>
    : T extends object
      ? DeepPartialObject<T>
        : T | undefined;
interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}
type DeepPartialObject<T> = {
  [Key in keyof T]?: DeepPartial<T[Key]>
}

/*
Example:
export type Obj = {
  a: "a";
  a2: "a2";
  a3: "a3";
  b: "b";
  b1: "b1";
  b2: "b2";
  12: "12";
};
type KeyStartsWithA = KeyStartsWith<Obj, `a${string}`>; // "a" | "a2" | "a3"
type KeyStartsWithNumber = KeyStartsWith<Obj, number>; // "12"
type KeyStartsWithNumber2 = KeyStartsWith<[123, 321], number>; // 123 | 321
type errorCase = KeyStartsWith<123, number>; // never
*/
export type KeyStartsWith<
  Obj extends Record<PropertyKey, any>,
  Matcher extends string | number | symbol,
  _ExtractedKey extends keyof Obj = Extract<keyof Obj, Matcher>
> = {
  [K in _ExtractedKey]: Obj[K];
}[_ExtractedKey];

/*
Example
interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}
type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]
*/
export type PartialByKeys<T, K extends keyof T = keyof T> = MergeObject<
  Omit<T, K> & {
  [P in keyof T as P extends K ? P : never]?: T[P];
}>;

export type MergeObject<T> = { [P in keyof T]: T[P] };

/*
Example: 
interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]
*/
export type PickByType<T extends object, U> = {
  [Key in keyof T as T[Key] extends U ? Key: never]: T[Key]
}

/*
Example:
interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<Equal<OmitByType<Model, string>, { count: number; isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<OmitByType<Model, number>, { name: string; isReadonly: boolean; isEnable: boolean }>>,
]
*/
export type OmitByType<T extends object, U> = {
  [Key in keyof T as T[Key] extends U ? never: Key]: T[Key]
}

/*
Example
interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
]
*/
export type RequiredByKeys<T, K extends keyof T = keyof T> = MergeObject<
  Omit<T, K> & {
    [Key in keyof T as Key extends K ? Key: never]-?: T[Key]
  }
>
  
/*
Example
interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]
*/
export type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K]
}

/*
Example
interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]
*/
export type ObjectEntries<T extends object> = {
  [Key in keyof T]-?: Key extends keyof T ? [Key, T[Key] extends undefined ? undefined: Required<T>[Key]]: never
}[keyof T]

