/* Object */

export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer InferredArrayMember>
    ? DeepPartialArray<InferredArrayMember>
    : T extends object
      ? DeepPartialObject<T>
        : T | undefined;
interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}
type DeepPartialObject<T> = {
  [Key in keyof T]?: DeepPartial<T[Key]>
}

/*
Example: 
interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]
*/
export type PickByType<T extends object, U> = {
  [Key in keyof T as T[Key] extends U ? Key: never]: T[Key]
}
