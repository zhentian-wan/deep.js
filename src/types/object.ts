/* Object */

/*
Example
type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  isMotherRussia: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'isMotherRussia', false | undefined>, testExpect3>>,
]
*/
export type AppendToObject<T extends Record<PropertyKey, any>, U extends string | number | symbol, V extends any> = MergeObject<T & {
  [Key in U]: V  
}>

/*
Example
type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}
*/
export type DeepReadonly<T extends Record<PropertyKey, any>> = T extends (...args: any[]) => any
  ? T
  : {
    readonly [Key in keyof T]: DeepReadonly<T[Key]>
  };

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
Example
interface Test1 {
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly meta: {
    readonly author: string
  }
}
type Test2 = {
  readonly a: () => 1
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 's'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}
interface DeepMutableTest1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type DeepMutableTest2 = {
  a: () => 1
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 's'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type cases = [
  Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
  Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>,
]

type errors = [
  // @ts-expect-error
  DeepMutable<'string'>,
  // @ts-expect-error
  DeepMutable<0>,
]
*/
export type DeepMutable<T extends Record<PropertyKey,any>> = T extends (...args: any[]) => any 
  ? T 
  : {
      - readonly [K in keyof T] : DeepMutable<T[K]>
    };

/*
Example
type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]
*/
export type Diff<T, S> = {
  [K in Exclude<(keyof T | keyof S), (keyof T & keyof S)>]: (T & S)[K]
};

/*
Example
type Data = {
  foo: {
    bar: {
      value: 'foobar'
      count: 6
    }
    included: true
  }
  'foo.baz': false
  hello: 'world'
}
type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar'; count: 6 }>>,
  Expect<Equal<Get<Data, 'foo.baz'>, false>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>,
]
*/
export type Get<T extends Record<PropertyKey, any>, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${infer P}.${infer U}`
    ? Get<T[P], U>
    : never;

/*
Example
type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]
*/
export type GetRequired<T extends Record<PropertyKey, any>> = {
  [Key in keyof T as T[Key] extends Required<T>[Key] ? Key: never]: T[Key]
};

/*
Example
type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
]
*/
export type GetOptional<T extends Record<PropertyKey, any>> = {
  [Key in keyof T as T[Key] extends Required<T>[Key] ? never: Key]: T[Key]
};

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
interface Cat {
  kind: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  kind: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  // Expect<Equal<LookUp<Animal, 'dog'>, Dog>>, // K = 'type'
  // Expect<Equal<LookUp<Animal, 'cat'>, Cat>>, // K = 'type'
  Expect<Equal<LookUp<Animal, 'dog', 'kind'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat', 'kind'>, Cat>>,
  Expect<Equal<LookUp<Animal, {kind: 'dog'}>, Dog>>,
  Expect<Equal<LookUp<Animal, {kind: 'cat'}>, Cat>>,
]
*/
type LookUpKey<U extends {[Key in K]: string}, T extends string, K extends string = 'type'> = U extends {[Key in K]: T} ? U : never;
type LookUpLike<U extends Record<PropertyKey, any>, T extends Record<PropertyKey, any>> = U extends T ? U : never;

export type LookUp<
  U extends Record<PropertyKey, any>, 
  T extends Record<PropertyKey, any> | string, 
  K extends string = 'type'
> = T extends Record<PropertyKey, any> 
      ? LookUpLike<U, T>
      : T extends string
        ? LookUpKey<U, T, K>
        : never;

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
Example
type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]
*/
export type Merge<F extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>> = {
  [Key in keyof (F & S)]: Key extends keyof S ? S[Key] : Key extends keyof F ? F[Key]: never
};

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
type cases = [
  Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>, { stringToArray: [] }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>, { stringToNumber: number }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }>, { stringToNumber: number; skipParsingMe: boolean }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>; mapTo: string[] }>, { fields: string[] }>>,
  Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>, { name: string }>>,
  Expect<Equal<MapTypes<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }>, { name: boolean; date: string }>>,
]
*/  
export type MapTypes<T extends Record<PropertyKey, any>, R extends Record<'mapFrom' | 'mapTo', any>> = {
  [K in keyof T]: T[K] extends R['mapFrom']
    ? R extends {mapFrom: T[K]}
      ? R['mapTo']
      : never
    : T[K]
};
  
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
}[keyof T];

/*
Example
type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>, 'b' | 'c' | 'd'>>,
  Expect<Equal<OptionalKeys<{}>, never>>,
]
*/
export type OptionalKeys<T extends Record<PropertyKey, any>> = keyof {
  [Key in keyof T as T[Key] extends Required<T>[Key] ? never: Key]: any
};

/*
Example
type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<RequiredKeys<{}>, never>>,
]
*/
export type RequiredKeys<T extends Record<PropertyKey, any>> = keyof {
  [Key in keyof T as T[Key] extends Required<T>[Key] ? Key: never]: any
}
