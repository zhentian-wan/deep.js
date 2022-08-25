# deep.js
A light weight Javascript/Typescript library for nested object operations

## Typescript library setup

1. run `npx gitignore node` to create `.gitignore`

2. run `yarn init -y` to create `package.json`

3. Edit `package.json` to tell what is the entry file & types information

    3.1 Entry file: `"main": "dist/index.js",`
    
    3.2 Types: `"types": "dist/index.d.ts",`

4. Add "scripts":

```json
  "scripts": {
    "build": "tsc",
    "dev": "yarn build --watch --preserveWatchOutput",
    "lint": "eslint src --ext js,ts",
    "test": "jest"
  }
```

5. Pin the `Node.js` & `yarn` versions using [volta](https://volta.sh/)

```bash
volta pin node yarn
```

6. Init typescript: `yarn tsc --init`
Modify `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    "target": "ES2018",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "rootDir": "src",                                  /* Specify the root folder within your source files. */
    "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    "outDir": "dist",                                   /* Specify an output folder for all emitted files. */
    "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return */
  },
  "include": ["src"]
}
```
7 .ESlint setup: `yarn eslint --init`

Select:

* `To check syntax and find problems`

* `None of these`

* `None of these`

* `Typescript`

* `Node`

* `JSON`

* `Yes`

* `yarn`

`.eslintc.json` file:

```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "overrides": [
        {
            "files": ["tests/**/*.ts"],
            "env": {"jest": true, "node": true}
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "project": "tsconfig.eslint.json"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "prefer-const": "error",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unused-params": "off"
    }
}

```

8. Create a file `tsconfig.eslint.json` for jest:

```json
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "types": ["jest"]
    },
    "include": ["src", "tests"]
}
```

9. Add `jest`

`yarn add -D jest @types/jest @babel/preset-env @babel/preset-typescript`

Add folder `tests` under root dir.

Inside `tests` folder, create `tsconfig.json` file:

```json
{
    "extends": "../tsconfig.json",
    "references": [
        {
            "name": "deep.js",
            "path": ".."
        }
    ],
    "compilerOptions": {
        "types": ["jest"],
        "rootDir": "..",
        "noEmit": true
    },
    "include": ["."]
}
```

Create `.babelrc` file under root folder:

```json
{
    "presets": [
        ["@babel/preset-env", {"targets": {"node": 10}}],
        "@babel/preset-typescript"
    ]
}
```

You might need to restart ESLint server in VSCode:

`CMD + Shift + P` -> "Restart ESLint server".

10. Document

`yarn add -D @microsoft/api-extractor @microsoft/api-documenter`

11. API-extractor

`yarn api-extractor init`

Modify `api-extractor.json`:

```json diff
  "mainEntryPointFilePath": "<projectFolder>/dist/index.d.ts",
  "untrimmedFilePath": "<projectFolder>/dist/<unscopedPackageName>-private.d.ts",
  "betaTrimmedFilePath": "<projectFolder>/dist/<unscopedPackageName>-beta.d.ts",
  "publicTrimmedFilePath": "<projectFolder>/dist/<unscopedPackageName>.d.ts"
```

Run `mkdir etc` to create a `etc` folder

Run `yarn api-extractor run --local`

If @jsdoc has marked `@beta`, that will be include into `beta.d.ts`

If @jsdoc has marked `@interal`, that will be include into `private.d.ts`
