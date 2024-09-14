export const isAsyncFunction = (fn: Function) => 
    fn[Symbol.toStringTag] === 'AsyncFunction';

// isAsyncFunction(() => {}) // false
// isAsyncFunction(() => Promise.resolve()) // false
// isAsyncFunction(async () => {}) // true

export const isPromiseLike = <T>(value: PromiseLike<T>) => value !== null && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function'