<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [isNegative](./deep.js.types.isnegative.md)

## types.isNegative type

<b>Signature:</b>

```typescript
export declare type isNegative<T extends number> = NumberToString<T> extends `-${number}` ? true : false;
```
