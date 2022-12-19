<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [DeepReadonly](./deep.js.types.deepreadonly.md)

## types.DeepReadonly type

<b>Signature:</b>

```typescript
export declare type DeepReadonly<T extends Record<PropertyKey, any>> = T extends (...args: any[]) => any ? T : {
    readonly [Key in keyof T]: DeepReadonly<T[Key]>;
};
```