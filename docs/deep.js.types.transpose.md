<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [deep.js](./deep.js.md) &gt; [types](./deep.js.types.md) &gt; [Transpose](./deep.js.types.transpose.md)

## types.Transpose type

type cases = \[ Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\]<!-- -->&gt;<!-- -->, \[\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1\]\]<!-- -->&gt;<!-- -->, \[\[1\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1, 2\]\]<!-- -->&gt;<!-- -->, \[\[1\], \[2\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1, 2\], \[3, 4\]\]<!-- -->&gt;<!-- -->, \[\[1, 3\], \[2, 4\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1, 2, 3\], \[4, 5, 6\]\]<!-- -->&gt;<!-- -->, \[\[1, 4\], \[2, 5\], \[3, 6\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1, 4\], \[2, 5\], \[3, 6\]\]<!-- -->&gt;<!-- -->, \[\[1, 2, 3\], \[4, 5, 6\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, Expect<!-- -->&lt;<!-- -->Equal<!-- -->&lt;<!-- -->Transpose<!-- -->&lt;<!-- -->\[\[1, 2, 3\], \[4, 5, 6\], \[7, 8, 9\]\]<!-- -->&gt;<!-- -->, \[\[1, 4, 7\], \[2, 5, 8\], \[3, 6, 9\]\]<!-- -->&gt;<!-- -->&gt;<!-- -->, \]

<b>Signature:</b>

```typescript
export declare type Transpose<M extends number[][], R = M['length'] extends 0 ? [] : M[0]> = {
    [X in keyof R]: {
        [Y in keyof M]: X extends keyof M[Y] ? M[Y][X] : never;
    };
};
```