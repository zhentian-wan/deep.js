<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [All](./deep.js.types.all.md)

## types.All type

<b>Signature:</b>

```typescript
export declare type All<T extends any[], U extends any = T[0]> = T extends [infer H, ...infer RT] ? Equal<H, U> extends true ? All<RT, U> : false : true;
```
