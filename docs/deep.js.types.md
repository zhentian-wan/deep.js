<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md)

## types namespace

## Enumerations

|  Enumeration | Description |
|  --- | --- |
|  [Comparison](./deep.js.types.comparison.md) | \`\`\`<!-- -->typescript type cases = \[ Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->5, 5<!-- -->&gt;<!-- -->, Comparison.Equal<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->5, 6<!-- -->&gt;<!-- -->, Comparison.Lower<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->5, 8<!-- -->&gt;<!-- -->, Comparison.Lower<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->5, 0<!-- -->&gt;<!-- -->, Comparison.Greater<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->-5, 0<!-- -->&gt;<!-- -->, Comparison.Lower<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->0, 0<!-- -->&gt;<!-- -->, Comparison.Equal<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->0, -5<!-- -->&gt;<!-- -->, Comparison.Greater<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->5, -3<!-- -->&gt;<!-- -->, Comparison.Greater<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->5, -7<!-- -->&gt;<!-- -->, Comparison.Greater<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->-5, -7<!-- -->&gt;<!-- -->, Comparison.Greater<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->-5, -3<!-- -->&gt;<!-- -->, Comparison.Lower<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->-25, -30<!-- -->&gt;<!-- -->, Comparison.Greater<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->15, -23<!-- -->&gt;<!-- -->, Comparison.Greater<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->40, 37<!-- -->&gt;<!-- -->, Comparison.Greater<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->-36, 36<!-- -->&gt;<!-- -->, Comparison.Lower<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->27, 27<!-- -->&gt;<!-- -->, Comparison.Equal<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Comparator<!-- -->&lt;<!-- -->-38, -38<!-- -->&gt;<!-- -->, Comparison.Equal<!-- -->&gt;<!-- -->&gt;<!-- -->, \] \`\`\` |

## Functions

|  Function | Description |
|  --- | --- |
|  [defineStore(store)](./deep.js.types.definestore.md) |  |
|  [DynamicParamsCurrying(fn)](./deep.js.types.dynamicparamscurrying.md) |  |
|  [getProp(obj, path)](./deep.js.types.getprop.md) |  |
|  [join(delimiter)](./deep.js.types.join.md) |  |
|  [PromiseAll(values)](./deep.js.types.promiseall.md) |  |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [Absolute](./deep.js.types.absolute.md) |  |
|  [Alike](./deep.js.types.alike.md) |  |
|  [All](./deep.js.types.all.md) |  |
|  [And](./deep.js.types.and.md) | And<!-- -->&lt;<!-- -->T, U<!-- -->&gt; |
|  [AnyOf](./deep.js.types.anyof.md) |  |
|  [AppendArgument](./deep.js.types.appendargument.md) |  |
|  [AppendToObject](./deep.js.types.appendtoobject.md) |  |
|  [Assign](./deep.js.types.assign.md) | <p>Example // case1 type Case1Target = { }</p><p>type Case1Origin1 = { a: 'a' }</p><p>type Case1Origin2 = { b: 'b' }</p><p>type Case1Origin3 = { c: 'c' }</p><p>type Case1Answer = { a: 'a' b: 'b' c: 'c' }</p><p>// case2 type Case2Target = { a: \[1, 2, 3\] }</p><p>type Case2Origin1 = { a: { a1: 'a1' } }</p><p>type Case2Origin2 = { b: \[2, 3, 3\] }</p><p>type Case2Answer = { a: { a1: 'a1' } b: \[2, 3, 3\] }</p><p>// case3</p><p>type Case3Target = { a: 1 b: \['b'\] }</p><p>type Case3Origin1 = { a: 2 b: { b: 'b' } c: 'c1' }</p><p>type Case3Origin2 = { a: 3 c: 'c2' d: true }</p><p>type Case3Answer = { a: 3 b: { b: 'b' } c: 'c2' d: true }</p><p>// case 4 type Case4Target = { a: 1 b: \['b'\] }</p><p>type Case4Answer = { a: 1 b: \['b'\] }</p><p>type cases = \[ Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Assign<!-- -->&lt;<!-- -->Case1Target, \[Case1Origin1, Case1Origin2, Case1Origin3\]<!-- -->&gt;<!-- -->, Case1Answer<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Assign<!-- -->&lt;<!-- -->Case2Target, \[Case2Origin1, Case2Origin2\]<!-- -->&gt;<!-- -->, Case2Answer<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Assign<!-- -->&lt;<!-- -->Case3Target, \[Case3Origin1, Case3Origin2\]<!-- -->&gt;<!-- -->, Case3Answer<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Assign<!-- -->&lt;<!-- -->Case4Target, \['', 0\]<!-- -->&gt;<!-- -->, Case4Answer<!-- -->&gt;<!-- -->&gt;<!-- -->, \]</p> |
|  [BEM](./deep.js.types.bem.md) |  |
|  [BinaryToDecimal](./deep.js.types.binarytodecimal.md) |  |
|  [Brand](./deep.js.types.brand.md) |  |
|  [CamelCase](./deep.js.types.camelcase.md) |  |
|  [Camelize](./deep.js.types.camelize.md) |  |
|  [CamelizeWord](./deep.js.types.camelizeword.md) |  |
|  [CapitalizeNestObjectKeys](./deep.js.types.capitalizenestobjectkeys.md) | <p>Example type foo = { foo: string bars: \[{ foo: string }<!-- -->\] }</p><p>type Foo = { Foo: string Bars: \[{ Foo: string }<!-- -->\] } type cases = \[ Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Foo, CapitalizeNestObjectKeys<foo>&gt;<!-- -->&gt;<!-- -->, \]</p> |
|  [CapitalizeWords](./deep.js.types.capitalizewords.md) |  |
|  [Chunk](./deep.js.types.chunk.md) |  |
|  [ClassPublicKeys](./deep.js.types.classpublickeys.md) |  |
|  [Combinations](./deep.js.types.combinations.md) |  |
|  [Comparator](./deep.js.types.comparator.md) |  |
|  [ConcatString](./deep.js.types.concatstring.md) |  |
|  [ConstructTuple](./deep.js.types.constructtuple.md) |  |
|  [Debug](./deep.js.types.debug.md) |  |
|  [DeepMutable](./deep.js.types.deepmutable.md) |  |
|  [DeepPartial](./deep.js.types.deeppartial.md) |  |
|  [DeepPick](./deep.js.types.deeppick.md) |  |
|  [DeepReadonly](./deep.js.types.deepreadonly.md) |  |
|  [Diff](./deep.js.types.diff.md) |  |
|  [DiscrimatedUnionToObject](./deep.js.types.discrimateduniontoobject.md) |  |
|  [DropString](./deep.js.types.dropstring.md) |  |
|  [EndsWith](./deep.js.types.endswith.md) |  |
|  [Enum](./deep.js.types.enum.md) |  |
|  [EnumLike](./deep.js.types.enumlike.md) |  |
|  [Equal](./deep.js.types.equal.md) |  |
|  [Exclusive](./deep.js.types.exclusive.md) |  |
|  [Expect](./deep.js.types.expect.md) |  |
|  [ExpectExtends](./deep.js.types.expectextends.md) |  |
|  [ExpectFalse](./deep.js.types.expectfalse.md) |  |
|  [ExpectTrue](./deep.js.types.expecttrue.md) |  |
|  [ExpectValidArgs](./deep.js.types.expectvalidargs.md) |  |
|  [ExtractValuesOfTuple](./deep.js.types.extractvaluesoftuple.md) |  |
|  [FalsyValues](./deep.js.types.falsyvalues.md) |  |
|  [Fibonacci](./deep.js.types.fibonacci.md) |  |
|  [Fill](./deep.js.types.fill.md) |  |
|  [Filter](./deep.js.types.filter.md) |  |
|  [FilterOut](./deep.js.types.filterout.md) |  |
|  [FindIndex](./deep.js.types.findindex.md) |  |
|  [First](./deep.js.types.first.md) |  |
|  [Flatten](./deep.js.types.flatten.md) |  |
|  [GenNode](./deep.js.types.gennode.md) |  |
|  [Get](./deep.js.types.get.md) |  |
|  [GetLastUnion](./deep.js.types.getlastunion.md) |  |
|  [GetOptional](./deep.js.types.getoptional.md) |  |
|  [GetRequired](./deep.js.types.getrequired.md) |  |
|  [GetRes](./deep.js.types.getres.md) |  |
|  [GreaterThan](./deep.js.types.greaterthan.md) |  |
|  [Head](./deep.js.types.head.md) |  |
|  [If](./deep.js.types.if.md) |  |
|  [Includes](./deep.js.types.includes.md) |  |
|  [IndexOf](./deep.js.types.indexof.md) |  |
|  [InorderTraversal](./deep.js.types.inordertraversal.md) |  |
|  [Intersection](./deep.js.types.intersection.md) |  |
|  [IsAny](./deep.js.types.isany.md) |  |
|  [IsFalse](./deep.js.types.isfalse.md) |  |
|  [IsInteger](./deep.js.types.isinteger.md) |  |
|  [isNegative](./deep.js.types.isnegative.md) |  |
|  [IsNever](./deep.js.types.isnever.md) |  |
|  [IsNil](./deep.js.types.isnil.md) |  |
|  [IsPalindrome](./deep.js.types.ispalindrome.md) |  |
|  [IsRequiredKey](./deep.js.types.isrequiredkey.md) |  |
|  [IsTrue](./deep.js.types.istrue.md) |  |
|  [IsTuple](./deep.js.types.istuple.md) |  |
|  [Join](./deep.js.types.join.md) |  |
|  [KebabCase](./deep.js.types.kebabcase.md) |  |
|  [KeyStartsWith](./deep.js.types.keystartswith.md) |  |
|  [Last](./deep.js.types.last.md) |  |
|  [LastIndexOf](./deep.js.types.lastindexof.md) |  |
|  [Length](./deep.js.types.length.md) |  |
|  [LengthOfString](./deep.js.types.lengthofstring.md) |  |
|  [LookUp](./deep.js.types.lookup.md) |  |
|  [LowerLetterUnion](./deep.js.types.lowerletterunion.md) |  |
|  [MapTypes](./deep.js.types.maptypes.md) |  |
|  [Maybe](./deep.js.types.maybe.md) |  |
|  [Merge](./deep.js.types.merge.md) |  |
|  [MergeInsertions](./deep.js.types.mergeinsertions.md) |  |
|  [MergeObject](./deep.js.types.mergeobject.md) |  |
|  [MinusN](./deep.js.types.minusn.md) | Example Only when T &gt; N and T &amp; N are both positive value |
|  [MinusOne](./deep.js.types.minusone.md) |  |
|  [Multiply](./deep.js.types.multiply.md) |  |
|  [Mutable](./deep.js.types.mutable.md) |  |
|  [MutableKeys](./deep.js.types.mutablekeys.md) |  |
|  [Narrowable](./deep.js.types.narrowable.md) |  |
|  [NarrowRaw](./deep.js.types.narrowraw.md) |  |
|  [Negative](./deep.js.types.negative.md) |  |
|  [NeverByKeys](./deep.js.types.neverbykeys.md) |  |
|  [NoInfer](./deep.js.types.noinfer.md) | Explain to TS which function parameter has priority for generic inference |
|  [NonEmptyArray](./deep.js.types.nonemptyarray.md) |  |
|  [NotAny](./deep.js.types.notany.md) |  |
|  [NotEqual](./deep.js.types.notequal.md) |  |
|  [NotNil](./deep.js.types.notnil.md) |  |
|  [Nullable](./deep.js.types.nullable.md) |  |
|  [NumberRange](./deep.js.types.numberrange.md) |  |
|  [NumberToArray](./deep.js.types.numbertoarray.md) | Example type cases = \[ Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->BinaryToDecimal<!-- -->&lt;<!-- -->'10'<!-- -->&gt;<!-- -->, 2<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->BinaryToDecimal<!-- -->&lt;<!-- -->'0011'<!-- -->&gt;<!-- -->, 3<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->BinaryToDecimal<!-- -->&lt;<!-- -->'00000000'<!-- -->&gt;<!-- -->, 0<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->BinaryToDecimal<!-- -->&lt;<!-- -->'11111111'<!-- -->&gt;<!-- -->, 255<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->BinaryToDecimal<!-- -->&lt;<!-- -->'10101010'<!-- -->&gt;<!-- -->, 170<!-- -->&gt;<!-- -->&gt;<!-- -->, \] |
|  [NumberToString](./deep.js.types.numbertostring.md) |  |
|  [ObjectEntries](./deep.js.types.objectentries.md) |  |
|  [ObjectFromEntries](./deep.js.types.objectfromentries.md) |  |
|  [ObjectKeyPaths](./deep.js.types.objectkeypaths.md) |  |
|  [ObjectToUnion](./deep.js.types.objecttounion.md) |  |
|  [OmitByType](./deep.js.types.omitbytype.md) |  |
|  [OnPropChnagedMethods](./deep.js.types.onpropchnagedmethods.md) |  |
|  [OptionalKeys](./deep.js.types.optionalkeys.md) |  |
|  [ParseQueryString](./deep.js.types.parsequerystring.md) |  |
|  [PartialByKeys](./deep.js.types.partialbykeys.md) |  |
|  [PathKeys](./deep.js.types.pathkeys.md) |  |
|  [PathParams](./deep.js.types.pathparams.md) |  |
|  [PathParamsObj](./deep.js.types.pathparamsobj.md) |  |
|  [Permutation](./deep.js.types.permutation.md) |  |
|  [Permutations](./deep.js.types.permutations.md) |  |
|  [PickByType](./deep.js.types.pickbytype.md) |  |
|  [Placeholder](./deep.js.types.placeholder.md) |  |
|  [PlusOne](./deep.js.types.plusone.md) |  |
|  [Pop](./deep.js.types.pop.md) |  |
|  [Properties](./deep.js.types.properties.md) |  |
|  [PropPath](./deep.js.types.proppath.md) |  |
|  [PropType](./deep.js.types.proptype.md) |  |
|  [Push](./deep.js.types.push.md) |  |
|  [ReadonlyKeys](./deep.js.types.readonlykeys.md) |  |
|  [Replace](./deep.js.types.replace.md) |  |
|  [ReplaceAll](./deep.js.types.replaceall.md) |  |
|  [RequiredByKeys](./deep.js.types.requiredbykeys.md) |  |
|  [RequiredKeys](./deep.js.types.requiredkeys.md) |  |
|  [Reverse](./deep.js.types.reverse.md) |  |
|  [Shift](./deep.js.types.shift.md) |  |
|  [Slice](./deep.js.types.slice.md) |  |
|  [SnakeCase](./deep.js.types.snakecase.md) |  |
|  [Space](./deep.js.types.space.md) |  |
|  [Split](./deep.js.types.split.md) |  |
|  [StartsWith](./deep.js.types.startswith.md) |  |
|  [StringToUnion](./deep.js.types.stringtounion.md) |  |
|  [SubKeys](./deep.js.types.subkeys.md) |  |
|  [Subsequence](./deep.js.types.subsequence.md) |  |
|  [Sum](./deep.js.types.sum.md) |  |
|  [ToNumber](./deep.js.types.tonumber.md) |  |
|  [ToPrimitive](./deep.js.types.toprimitive.md) |  |
|  [ToUnion](./deep.js.types.tounion.md) | Example type cases = \[ Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2\], \[2, 3\], \[2, 2\]\]<!-- -->&gt;<!-- -->, 2<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2, 3\], \[2, 3, 4\], \[2, 2, 3\]\]<!-- -->&gt;<!-- -->, 2 \| 3<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2\], \[3, 4\], \[5, 6\]\]<!-- -->&gt;<!-- -->, never<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2, 3\], \[2, 3, 4\], 3\]<!-- -->&gt;<!-- -->, 3<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2, 3\], 2 \| 3 \| 4, 2 \| 3\]<!-- -->&gt;<!-- -->, 2 \| 3<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2, 3\], 2, 3\]<!-- -->&gt;<!-- -->, never<!-- -->&gt;<!-- -->&gt;<!-- -->, \] |
|  [Transpose](./deep.js.types.transpose.md) | type cases = \[ Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\]<!-- -->&gt;<!-- -->, \[\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1\]\]<!-- -->&gt;<!-- -->, \[\[1\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1, 2\]\]<!-- -->&gt;<!-- -->, \[\[1\], \[2\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1, 2\], \[3, 4\]\]<!-- -->&gt;<!-- -->, \[\[1, 3\], \[2, 4\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1, 2, 3\], \[4, 5, 6\]\]<!-- -->&gt;<!-- -->, \[\[1, 4\], \[2, 5\], \[3, 6\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1, 4\], \[2, 5\], \[3, 6\]\]<!-- -->&gt;<!-- -->, \[\[1, 2, 3\], \[4, 5, 6\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1, 2, 3\], \[4, 5, 6\], \[7, 8, 9\]\]<!-- -->&gt;<!-- -->, \[\[1, 4, 7\], \[2, 5, 8\], \[3, 6, 9\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, \] |
|  [Trim](./deep.js.types.trim.md) |  |
|  [TrimLeft](./deep.js.types.trimleft.md) |  |
|  [TrimRight](./deep.js.types.trimright.md) |  |
|  [Trunc](./deep.js.types.trunc.md) |  |
|  [Try](./deep.js.types.try.md) |  |
|  [TupleToNestedObject](./deep.js.types.tupletonestedobject.md) |  |
|  [TupleToObject](./deep.js.types.tupletoobject.md) |  |
|  [TupleToUnion](./deep.js.types.tupletounion.md) |  |
|  [TwoSum](./deep.js.types.twosum.md) |  |
|  [UnionReplace](./deep.js.types.unionreplace.md) | <p>Example type cases = \[ // string -<!-- -->&gt; null Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->UnionReplace<!-- -->&lt;<!-- -->number \| string, \[\[string, null\]\]<!-- -->&gt;<!-- -->, number \| null<!-- -->&gt;<!-- -->&gt;<!-- -->,</p><p>// Date -<!-- -->&gt; string; Function -<!-- -->&gt; undefined Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->UnionReplace<!-- -->&lt;<!-- -->Function \| Date \| object, \[\[Date, string\], \[Function, undefined\]\]<!-- -->&gt;<!-- -->, undefined \| string \| object<!-- -->&gt;<!-- -->&gt;<!-- -->, \]</p> |
|  [UnionToIntersection](./deep.js.types.uniontointersection.md) |  |
|  [UnionToIntersectionFn](./deep.js.types.uniontointersectionfn.md) |  |
|  [UnionToTuple](./deep.js.types.uniontotuple.md) |  |
|  [Unique](./deep.js.types.unique.md) |  |
|  [Unshift](./deep.js.types.unshift.md) |  |
|  [UpperLetterUnion](./deep.js.types.upperletterunion.md) |  |
|  [Valid](./deep.js.types.valid.md) |  |
|  [Without](./deep.js.types.without.md) |  |
|  [XOR](./deep.js.types.xor.md) |  |
|  [Zip](./deep.js.types.zip.md) |  |

