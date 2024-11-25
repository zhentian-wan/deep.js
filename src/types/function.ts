import { ConcatString } from "./string";

/*
Example
type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]
*/
export type AppendArgument<
  Fn extends (...args: any[]) => void,
  A
> = Fn extends (...args: infer Args) => infer RT
  ? (...x: [...Args, A]) => RT
  : never;

export type ExpectValidArgs<
  FUNC extends (...args: any[]) => any,
  ARGS extends any[],
> = ARGS extends Parameters<FUNC> ? true : false;

/*
Example
// Edge cases
const noCharsOutput = join('-')()
const oneCharOutput = join('-')('a')
const noDelimiterOutput = join('')('a', 'b', 'c')

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c')
const hashOutput = join('#')('a', 'b', 'c')
const twoCharOutput = join('-')('a', 'b')
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')

type cases = [
  Expect<Equal<typeof noCharsOutput, ''>>,
  Expect<Equal<typeof oneCharOutput, 'a'>>,
  Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
  Expect<Equal<typeof twoCharOutput, 'a-b'>>,
  Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
  Expect<Equal<typeof hashOutput, 'a#b#c'>>,
  Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>,
]
*/
export declare function join<S extends string>(
  delimiter: S
): <Args extends string[]>(...parts: Args) => ConcatString<Args, S>;



/**
 * Explain to TS which function parameter has priority for generic inference
 * @param A to de-prioritize
 * @returns `A`
 * @example
 * ```ts
 * import {F} from 'ts-toolbelt'
 *
 * const fn0 = <A extends any>(a0: A, a1: F.NoInfer<A>): A => {
 *  return {} as unknown as A // just for the example
 * }
 *
 * const fn1 = <A extends any>(a0: F.NoInfer<A>, a1: A): A => {
 *  return {} as unknown as A // just for the example
 * }
 *
 * const fn2 = <A extends any>(a0: F.NoInfer<A>, a1: F.NoInfer<A>): A => {
 *  return {} as unknown as A // just for the example
 * }
 *
 * const test0 = fn0('b', 'a') // error: infer priority is `a0`
 * const test1 = fn1('b', 'a') // error: infer priority is `a1`
 * const test2 = fn2('b', 'a') // works: infer priority is `a0` | `a1`
 * ```
 * @see https://stackoverflow.com/questions/56687668
 */
export type NoInfer<A extends any> =
    [A][A extends any ? 0 : never]

/**
 * Utility for extracting the parameters from a function overload (for typed emits)
 * https://github.com/microsoft/TypeScript/issues/32164#issuecomment-1146737709
 */
export type OverloadParameters<T extends (...args: any[]) => any> = Parameters<
  OverloadUnion<T>
>

type OverloadProps<TOverload> = Pick<TOverload, keyof TOverload>

type OverloadUnionRecursive<
  TOverload,
  TPartialOverload = unknown,
> = TOverload extends (...args: infer TArgs) => infer TReturn
  ? TPartialOverload extends TOverload
    ? never
    :
        | OverloadUnionRecursive<
            TPartialOverload & TOverload,
            TPartialOverload &
              ((...args: TArgs) => TReturn) &
              OverloadProps<TOverload>
          >
        | ((...args: TArgs) => TReturn)
  : never

type OverloadUnion<TOverload extends (...args: any[]) => any> = Exclude<
  OverloadUnionRecursive<(() => never) & TOverload>,
  TOverload extends () => never ? never : () => never
>
