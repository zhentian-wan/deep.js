<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [PlusOne](./deep.js.types.plusone.md)

## types.PlusOne type

<b>Signature:</b>

```typescript
export declare type PlusOne<T extends number, C extends unknown[] = []> = C['length'] extends T ? [...C, unknown]['length'] : PlusOne<T, [...C, unknown]>;
```