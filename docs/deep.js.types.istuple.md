<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [IsTuple](./deep.js.types.istuple.md)

## types.IsTuple type

<b>Signature:</b>

```typescript
export declare type IsTuple<T> = [T] extends [never] ? false : T extends readonly any[] ? any[] extends T ? false : true : false;
```