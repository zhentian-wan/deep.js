<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [And](./deep.js.types.and.md)

## types.And type

And<!-- -->&lt;<!-- -->T, U<!-- -->&gt;

<b>Signature:</b>

```typescript
export declare type And<B1 extends boolean, B2 extends boolean> = B1 extends true ? (B2 extends true ? true : false) : false;
```
