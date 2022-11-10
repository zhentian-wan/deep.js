/*
Example
type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]
*/
export type AppendArgument<Fn extends (...args: any[]) => void, A> = Fn extends (...args: infer Args) => infer RT 
  ? (...x: [...Args, A]) => RT
  : never; 
