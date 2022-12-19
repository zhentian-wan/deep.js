<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [IndexOf](./deep.js.types.indexof.md)

## types.IndexOf type

<b>Signature:</b>

```typescript
export declare type IndexOf<T extends any[], U, ACC extends unknown[] = []> = T extends [infer F, ...infer RT] ? Equal<F, U> extends true ? ACC["length"] : IndexOf<RT, U, [...ACC, unknown]> : -1;
```