type DigitMap = {
    '0': [],
    '1': [1],
    '2': [1, 1],
    '3': [1, 1, 1],
    '4': [1, 1, 1, 1],
    '5': [1, 1, 1, 1, 1],
    '6': [1, 1, 1, 1, 1, 1],
    '7': [1, 1, 1, 1, 1, 1, 1],
    '8': [1, 1, 1, 1, 1, 1, 1, 1],
    '9': [1, 1, 1, 1, 1, 1, 1, 1, 1],
  }
  type Zero = [];
  type One = [1];
  type Carry = Zero | One;
  type Ten = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  type Digit = keyof DigitMap;
  
  type MinusTen<S extends 1[]> =
    S extends [...Ten, ...infer R] ? `${R['length']}` & Digit : never;
  
  type DigitSum<
    A extends Digit,
    B extends Digit,
    C extends Carry = Zero,
    S extends 1[] = [...DigitMap[A], ...DigitMap[B], ...C]
  > =
    `${S['length']}` extends Digit
      ? [Zero, `${S['length']}`]
      : [One, MinusTen<S>];
  
  type SumStr<
    A extends Digit[],
    B extends Digit[],
    R extends [Carry, Digit]
  > =
    R extends [infer C extends Carry, infer N extends Digit]
      ? `${SumArr<A, B, C>}${N}`
      : never
  
  type SumArr<
    A extends Digit[],
    B extends Digit[],
    C extends Carry = Zero
  > =
    [A, B] extends [
      [infer DA extends Digit, ...infer RA extends Digit[]],
      [infer DB extends Digit, ...infer RB extends Digit[]]
    ]
      ? SumStr<RA, RB, DigitSum<DA, DB, C>>
      : A extends [infer D extends Digit, ...infer R extends Digit[]]
        ? SumStr<R, Zero, DigitSum<D, '0', C>>
        : B extends Zero
          ? C extends Zero ? '' : '1'
          : SumArr<B, Zero, C>;
  
  type DigitArr<S extends string> = S extends `${infer F}${infer R}` ? [...DigitArr<R>, F] : Zero;
  
export type Sum<
    A extends string | number | bigint,
    B extends string | number | bigint
  > = SumArr<DigitArr<`${A}`>, DigitArr<`${B}`>>;

/**
 * test cases
type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]
 */