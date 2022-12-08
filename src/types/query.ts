/**
 * Example
 type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3']; k2: 'v2' }>>,
]
 */
type ToKeyValPair<T extends string> = T extends `${infer K extends string}=${infer V}` ? {[Key in K]: V}: {[Key in T]: true};
type MapToKeyValPair<T extends string[]> = T extends [infer F extends string, ...infer RT extends string[]] ? [ToKeyValPair<F>, ...MapToKeyValPair<RT>]: [];
type SplitQuery<T extends string> = T extends `${infer Q}&${infer RT}` ? [Q, ...SplitQuery<RT>]: [T];
type MergeObject<T> = {
  [P in keyof T]: T[P]
} 
type Grouping<U, ACC extends Record<PropertyKey, unknown>= {}> = U extends object[] 
  ? U extends [infer F, ...infer RT] 
    ? Grouping<RT, MergeObject<({
      [Key in keyof ACC as Key extends keyof F ? never: Key]: ACC[Key]
    } & {
      [Key in keyof F]: Key extends keyof ACC 
        ? ACC[Key] extends any[] 
          ? [...ACC[Key], F[Key]]
          : Equal<F[Key], ACC[Key]> extends true ? F[Key]: [ACC[Key], F[Key]]
        : F[Key]
    })>>
    : ACC
  :ACC
export type ParseQueryString<T extends string> = T extends '' ? {}: Grouping<MapToKeyValPair<SplitQuery<T>>>
