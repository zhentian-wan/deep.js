<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [UnionToTuple](./deep.js.types.uniontotuple.md)

## types.UnionToTuple type

<b>Signature:</b>

```typescript
export declare type UnionToTuple<U, Last = GetLastUnion<U>> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, Last>>, Last];
```
