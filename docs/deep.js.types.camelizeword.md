<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [CamelizeWord](./deep.js.types.camelizeword.md)

## types.CamelizeWord type

<b>Signature:</b>

```typescript
export declare type CamelizeWord<S> = S extends `${infer F}_${infer RT}` ? `${F}${CamelizeWord<Capitalize<RT>>}` : S;
```
