<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [Pop](./deep.js.types.pop.md)

## types.Pop type

<b>Signature:</b>

```typescript
export declare type Pop<T extends any[]> = T extends [...infer RT, infer _] ? RT : [];
```