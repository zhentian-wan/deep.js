<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [ToPrimitive](./deep.js.types.toprimitive.md)

## types.ToPrimitive type

<b>Signature:</b>

```typescript
export declare type ToPrimitive<T extends Record<PropertyKey, any>> = {
    [Key in keyof T]: T[Key] extends any[] ? ArrayToPrimitive<T[Key]> : T[Key] extends object ? ObjectToPrimitive<T[Key]> : ValueToPrimitive<T[Key]>;
};
```
