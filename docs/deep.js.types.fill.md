<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [Fill](./deep.js.types.fill.md)

## types.Fill type

<b>Signature:</b>

```typescript
export declare type Fill<T extends unknown[], N, Start extends number = 0, End extends number = T["length"], P extends number = 0> = Start extends End ? T : T extends [infer F, ...infer RT] ? P extends Start ? [N, ...Fill<RT, N, PlusOne<Start>, End, PlusOne<P>>] : [F, ...Fill<RT, N, Start, End, PlusOne<P>>] : [];
```