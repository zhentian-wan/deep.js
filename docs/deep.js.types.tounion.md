<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [ToUnion](./deep.js.types.tounion.md)

## types.ToUnion type

Example type cases = \[ Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2\], \[2, 3\], \[2, 2\]\]<!-- -->&gt;<!-- -->, 2<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2, 3\], \[2, 3, 4\], \[2, 2, 3\]\]<!-- -->&gt;<!-- -->, 2 \| 3<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2\], \[3, 4\], \[5, 6\]\]<!-- -->&gt;<!-- -->, never<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2, 3\], \[2, 3, 4\], 3\]<!-- -->&gt;<!-- -->, 3<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2, 3\], 2 \| 3 \| 4, 2 \| 3\]<!-- -->&gt;<!-- -->, 2 \| 3<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Intersection<!-- -->&lt;<!-- -->\[\[1, 2, 3\], 2, 3\]<!-- -->&gt;<!-- -->, never<!-- -->&gt;<!-- -->&gt;<!-- -->, \]

<b>Signature:</b>

```typescript
export declare type ToUnion<T> = T extends any[] ? T[number] : T;
```