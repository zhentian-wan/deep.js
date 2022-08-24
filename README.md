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
