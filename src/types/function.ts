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
