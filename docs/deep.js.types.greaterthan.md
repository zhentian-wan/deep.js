<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [GreaterThan](./deep.js.types.greaterthan.md)

## types.GreaterThan type

<b>Signature:</b>

```typescript
export declare type GreaterThan<T extends number, U extends number, ACC extends unknown[] = []> = T extends ACC['length'] ? false : U extends ACC['length'] ? true : GreaterThan<T, U, [...ACC, unknown]>;
```
