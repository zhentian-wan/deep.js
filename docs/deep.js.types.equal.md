<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [Equal](./deep.js.types.equal.md)

## types.Equal type

<b>Signature:</b>

```typescript
export declare type Equal<T, U> = (<P>(x: P) => P extends T ? 1 : 2) extends <P>(x: P) => P extends U ? 1 : 2 ? true : false;
```