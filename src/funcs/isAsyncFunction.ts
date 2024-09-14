export const isAsyncFunction = (fn: Function) => 
    fn[Symbol.toStringTag] === 'AsyncFunction';

// isAsyncFunction(() => {}) // false
// isAsyncFunction(() => Promise.resolve()) // false
// isAsyncFunction(async () => {}) // true