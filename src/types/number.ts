/*
Example
type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]
*/
export type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer S}`
  ? S
  : `${T}`;

/*
Example
type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
]
*/
export type MinusOne<T extends number, ARR extends unknown[] = []> = any extends never ? never: [...ARR, 1]['length'] extends T ? ARR['length'] : MinusOne<T, [...ARR, 1]>;
/**
 * Example
 * Only when T > N
 * and T & N are both positive value
 */
export type MinusN<T extends number, N extends number, NACC extends unknown[] = []> = [...NACC]['length'] extends N 
    ? T
    : MinusN<MinusOne<T>, N, [...NACC, unknown]>;
export type PlusOne<T extends number, C extends unknown[] = []> = C['length'] extends T
  ? [...C, unknown]['length']
  : PlusOne<T, [...C, unknown]>;
/*
Only positive number
Example
type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]
*/
export type GreaterThan<T extends number, U extends number, ACC extends unknown[] = []> = 
  T extends ACC['length']
    ? false
    : U extends ACC['length']
      ? true
      : GreaterThan<T, U, [...ACC, unknown]>;

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
type Result1 = | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Result2 = | 0 | 1 | 2
type Result3 =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
  | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60
  | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70
  | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80
  | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90
  | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100
  | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110
  | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120
  | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130
  | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140
type cases = [
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>,
]
*/
export type NumberRange<L extends number | C['length'], H extends number, ACC = never, C extends unknown[] = []> = 
  C['length'] extends H
    ? ACC | H
    : C['length'] extends L
      ? NumberRange<[...C, unknown]['length'], H, L | ACC, [...C, unknown]>        // keep increasing L and C until C['length'] === H
      : NumberRange<L, H, ACC, [...C, unknown]>;                                   // keep increasing C until C['length'] === L


/*
Example
type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]
*/
export type Trunc<N extends number | string> = `${N}` extends `${infer NUM}.${infer _}`
  ? `${NUM}`
  : `${N}`;
