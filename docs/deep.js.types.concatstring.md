<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [ConcatString](./deep.js.types.concatstring.md)

## types.ConcatString type

<b>Signature:</b>

```typescript
export declare type ConcatString<T extends unknown[], U extends string, ACC extends string = ""> = T extends [infer F extends string, ...infer RT] ? ACC extends "" ? ConcatString<RT, U, `${F}`> : ConcatString<RT, U, `${ACC}${U}${F}`> : ACC;
```
