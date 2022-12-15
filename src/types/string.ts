import type { Equal, Space, UpperLetterUnion, StringToUnion } from "./utils";

/*
Example
type cases = [
  Expect<Equal<CamelizeWord<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelizeWord<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelizeWord<'foo_bar_baz'>, 'fooBarBaz'>>,
]
*/
export type CamelizeWord<S> = S extends `${infer F}_${infer RT}`
  ? `${F}${CamelizeWord<Capitalize<RT>>}`
  : S;

export type ConcatString<
  T extends unknown[],
  U extends string,
  ACC extends string = ""
> = T extends [infer F extends string, ...infer RT]
  ? ACC extends ""
    ? ConcatString<RT, U, `${F}`>
    : ConcatString<RT, U, `${ACC}${U}${F}`>
  : ACC;

/*
Example
type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]
*/
export type DropString<S, R extends string> = R extends ""
  ? S
  : S extends `${infer F}${infer RT}`
  ? F extends StringToUnion<R>
    ? DropString<RT, R>
    : `${F}${DropString<RT, R>}`
  : S;

/*
Example
type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 
  'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]
*/
export type CapitalizeWords<
  S extends string,
  Prev extends string = "",
  ACC extends string = ""
> = S extends `${infer First}${infer REST}`
  ? Uppercase<Prev> extends UpperLetterUnion // only symbols and space cannnot be uppercased
    ? CapitalizeWords<REST, First, `${ACC}${First}`> // prev is char, the follow char not need to be uppercased
    : CapitalizeWords<REST, First, `${ACC}${Uppercase<First>}`> // pre is symbol, current char should be uppercased
  : ACC;

/*
Example
type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]
*/
export type LengthOfString<
  S extends string,
  ACC extends unknown[] = []
> = S extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer REST}`
  ? LengthOfString<
      REST,
      [
        ...ACC,
        unknown,
        unknown,
        unknown,
        unknown,
        unknown,
        unknown,
        unknown,
        unknown,
        unknown,
        unknown
      ]
    >
  : S extends `${string}${infer REST}`
  ? LengthOfString<REST, [...ACC, unknown]>
  : ACC["length"];

/*
Example:
type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,
]
*/
export type StartsWith<
  T extends string,
  U extends string
> = T extends `${U}${string}` ? true : false;

/*
Example:
type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>,
]
*/
export type EndsWith<
  T extends string,
  U extends string
> = T extends `${string}${U}` ? true : false;

export type Combinations<T extends string, U = T> = U extends T
  ? U | `${U}${Combinations<Exclude<T, U>>}`
  : never;

/*
Example:
type cases = [
  Expect<Equal<Permutations<''>, ''>>,
  Expect<Equal<Permutations<'A'>, '' | 'A'>>,
  Expect<Equal<Permutations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<Permutations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>
]
*/
export type Permutations<S extends string> = Combinations<StringToUnion<S>>;

/*
Example
type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]
*/
export type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer A}${From}${infer B}`
  ? `${A}${To}${B}`
  : S;

/*
Example
type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]
*/
export type Trim<S extends string> = S extends `${Space}${infer Word}`
  ? Trim<Word>
  : S extends `${infer Word}${Space}`
  ? Trim<Word>
  : S;

/*
Example
type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]
*/
export type TrimLeft<S extends string> = S extends `${Space}${infer RT}`
  ? TrimLeft<RT>
  : S;

/*
Example
type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]
*/
export type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer A}${From}${infer B}`
  ? `${A}${To}${ReplaceAll<B, From, To>}`
  : S;

/*
Example
type cases = [
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ''>, ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']>>,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>,
]
*/
export type Split<S extends string, SEP extends string> = Equal<
  S,
  string
> extends true
  ? S[]
  : S extends `${infer P}${SEP}${infer RT}`
  ? [P, ...Split<RT, SEP>]
  : S extends ""
  ? SEP extends ""
    ? []
    : [S]
  : [S];

/*
Example SnakeCase
type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<Equal<SnakeCase<'getElementById' | 'getElementByClassNames'>, 'get_element_by_id' | 'get_element_by_class_names'>>,
]
*/
export type SnakeCase<T, ACC extends string = ''> = T extends `${infer F}${infer REST}`
  ? Uppercase<F> extends F
    ? SnakeCase<REST, `${ACC}_${Lowercase<F>}`>
    : SnakeCase<REST,`${ACC}${F}`>
  : ACC;

/*
Example
type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str  '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>,
]
*/
export type TrimRight<S extends string> = S extends `${infer Left}${Space}`
  ? TrimRight<Left>
  : S;
