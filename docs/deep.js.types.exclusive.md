<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [Exclusive](./deep.js.types.exclusive.md)

## types.Exclusive type

<b>Signature:</b>

```typescript
export declare type Exclusive<T extends Record<PropertyKey, unknown>, U extends Record<PropertyKey, unknown>> = (T & {
    [k in Exclude<keyof U, keyof T>]?: never;
}) | (U & {
    [k in Exclude<keyof T, keyof U>]?: never;
});
```
