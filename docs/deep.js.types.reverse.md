<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [Reverse](./deep.js.types.reverse.md)

## types.Reverse type

<b>Signature:</b>

```typescript
export declare type Reverse<T> = T extends [...infer H, infer T] ? [T, ...Reverse<H>] : [];
```
