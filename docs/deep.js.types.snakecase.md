<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [SnakeCase](./deep.js.types.snakecase.md)

## types.SnakeCase type

<b>Signature:</b>

```typescript
export declare type SnakeCase<T, ACC extends string = ''> = T extends `${infer F}${infer REST}` ? Uppercase<F> extends F ? SnakeCase<REST, `${ACC}_${Lowercase<F>}`> : SnakeCase<REST, `${ACC}${F}`> : ACC;
```
