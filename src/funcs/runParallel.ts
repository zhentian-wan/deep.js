/**
 * Runs iterator function in parallel.
 * @template T - The type of items in the data source
 * @param {number} maxConcurrency - The maximum concurrency.
 * @param {Array<T>} source - The data source
 * @param {(item: T) => Promise<void>} iteratorFn - The iteratorFn
 * @returns {Promise<void[]>} - A Promise array containing all iteration results.
 */
export async function runParallel(maxConcurrency, source, iteratorFn) {
    /**@type {Promise<void>[]} */
    const ret = []
    /**@type {Promise<void>[]} */
    const executing = []
    for (const item of source) {
      const p = Promise.resolve().then(() => iteratorFn(item))
      ret.push(p)
  
      if (maxConcurrency <= source.length) {
        const e = p.then(() => {
          executing.splice(executing.indexOf(e), 1)
        })
        executing.push(e)
        if (executing.length >= maxConcurrency) {
          await Promise.race(executing)
        }
      }
    }
    return Promise.all(ret)
  }