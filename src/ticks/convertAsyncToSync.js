var fetch = () =>
    new Promise((res) => {
      setTimeout(() => res({ user: 'zhen' }), 1150)
    })
  globalThis.fetch = fetch
  
  function getUser() {
    return fetch()
  }
  
  function m1() {
    // do something
    return getUser()
  }
  
  function m2() {
    // do something
    return m1()
  }
  
  function m3() {
    // do something
    return m2()
  }
  
  function main() {
    const user = m3()
    console.log('user', user.data)
  }
  
  function run(func) {
    const caches = []
    let i = 0
  
    const originalFetch = globalThis.fetch
    fetch = function (...args) {
      if (caches[i]) {
        return caches[i]
      }
      const result = {
        status: 'pending',
        data: null,
        err: null,
      }
      caches[i++] = result
  
      const promise = originalFetch(...args)
        .then((data) => {
          result.status = 'fulfilled'
          result.data = data
        })
        .catch((err) => {
          result.status = 'rejected'
          result.err = err
        })
  
      throw promise
    }
  
    try {
      func()
    } catch (err) {
      if (err instanceof Promise) {
        const rerun = () => {
          i = 0
          func()
        }
        err.then(rerun, rerun)
      }
    }
  }
  
  run(main)