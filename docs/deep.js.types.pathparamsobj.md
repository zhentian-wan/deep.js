<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [PathParamsObj](./deep.js.types.pathparamsobj.md)

## types.PathParamsObj type

<b>Signature:</b>

```typescript
export declare type PathParamsObj<S extends string> = S extends `/${string}/:${infer Param}/${infer REST}` ? MergeObject<{
    [Key in Param]: string;
} & PathParamsObj<`/${REST}`>> : S extends `${string}/:${infer Param}` ? {
    [Key in Param]: string;
} : never;
```
