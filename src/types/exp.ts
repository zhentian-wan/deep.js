/*
Example
const store = defineStore({
  id: '',
  state: () => ({
    num: 0,
    str: '',
  }),
  getters: {
    stringifiedNum() {
      // @ts-expect-error
      this.num += 1

      return this.num.toString()
    },
    parsedNum() {
      return parseInt(this.stringifiedNum)
    },
  },
  actions: {
    init() {
      this.reset()
      this.increment()
    },
    increment(step = 1) {
      this.num += step
    },
    reset() {
      this.num = 0

      // @ts-expect-error
      this.parsedNum = 0

      return true
    },
    setNum(value: number) {
      this.num = value
    },
  },
})

// @ts-expect-error
store.nopeStateProp
// @ts-expect-error
store.nopeGetter
// @ts-expect-error
store.stringifiedNum()
store.init()
// @ts-expect-error
store.init(0)
store.increment()
store.increment(2)
// @ts-expect-error
store.setNum()
// @ts-expect-error
store.setNum('3')
store.setNum(3)
const r = store.reset()

type _tests = [
  Expect<Equal<typeof store.num, number>>,
  Expect<Equal<typeof store.str, string>>,
  Expect<Equal<typeof store.stringifiedNum, string>>,
  Expect<Equal<typeof store.parsedNum, number>>,
  Expect<Equal<typeof r, true>>,
]
*/
export type GetRes<T> = T extends (...args: any[]) => infer R ? R : never
export declare function defineStore<State, Getters, Actions, _Getters = {
  readonly [P in keyof Getters]: GetRes<Getters[P]>
}>(store: {
  id: string,
  state: (this: void) => State,
  getters?: Getters & ThisType<_Getters & Readonly<State>>
  actions?: Actions & ThisType<State & _Getters & Actions>
}): State & _Getters & Actions;
