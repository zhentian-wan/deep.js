/**
 * Example Slice
 type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]
 */
type SliceLeft<Arr extends readonly any[], Start, isNegStart, PrevArr extends readonly any[] = []> = 
  (isNegStart extends true ? Arr['length'] : PrevArr['length']) extends Start ? Arr
  : Arr extends [infer TFirst, ...infer TRest] ? SliceLeft<TRest, Start, isNegStart, [...PrevArr, TFirst]>
  : [];
type SliceLeftIgnoreSign<Arr extends readonly any[], Start extends number> = 
  `${Start}` extends `-${infer PosStart extends number}` ? SliceLeft<Arr, PosStart, true> : SliceLeft<Arr, Start, false>;


type SliceRight<Arr extends readonly any[], End extends number, isNegEnd, PrevArr extends readonly any[] = []> = 
  (isNegEnd extends true ? PrevArr['length'] : Arr['length']) extends End ? Arr
  : Arr extends [...infer TRest, infer TLast] ? SliceRight<TRest, End, isNegEnd, [TLast, ...PrevArr]>
  : [];
type SliceRightIgnoreSign<Arr extends readonly any[], End extends number> = 
  `${End}` extends `-${infer PosEnd extends number}` ? SliceRight<Arr, PosEnd, true> : SliceRight<Arr, End, false>;


export type Slice<Arr extends readonly any[], Start extends number = 0, End extends number = Arr['length']> = 
  `${Start}` extends `-${string}` ? SliceRightIgnoreSign<SliceLeftIgnoreSign<Arr, Start>, End>
  : SliceLeftIgnoreSign<SliceRightIgnoreSign<Arr, End>, Start>