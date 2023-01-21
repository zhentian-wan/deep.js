const context = []

function cleanup(observer) {
  for (const dep of observer.dependencies) {
    dep.delete(observer)
  }
}

function subscribe(observer, subscriptions) {
  subscriptions.add(observer)
  observer.dependencies.add(subscriptions)
}

function createSignal<T = any>(value: T) {
  const subscriptions = new Set()
  const read = () => {
    const observer = context[context.length - 1]
    if (observer) subscribe(observer, subscriptions)
    return value
  };
  const write = (newValue: any) => {
    value = newValue
    for (const observer of [...subscriptions]) {
      observer.execute()
    }
  };

  return [read, write];
}

function createEffect(fn: () => void) {
  const effect = {
    execute() {
      cleanup(effect)
      context.push(effect)
      fn()
      context.pop()
    },
    dependencies: new Set()
  }
  context.push({execute: fn})
  effect.execute()
}

const [count, setCount] = createSignal(0);
const [count2, setCount2] = createSignal(2);
const [show, setShow] = createSignal(true);

createEffect(() => {
  if (show()) console.log(count())
  else console.log(count2())
})


setShow(false)
setCount(10)

