<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [Replace](./deep.js.types.replace.md)

## types.Replace type

<b>Signature:</b>

```typescript
export declare type Replace<S extends string, From extends string, To extends string> = From extends "" ? S : S extends `${infer A}${From}${infer B}` ? `${A}${To}${B}` : S;
```
