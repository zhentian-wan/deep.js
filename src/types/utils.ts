export type Space = ' ' | '\n\t';
export type Equal<T, U> = 
  (<P>(x: P) => P extends T ? 1: 2) extends 
  (<P>(x: P) => P extends U ? 1: 2) 
    ? true
    : false;
/*
Example:    
type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]    
*/
export type BEM<B extends string, E extends string[], M extends string[]> = M['length'] extends 0 
  ? `${B}__${E[number]}` 
  : E['length'] extends 0
    ? `${B}--${M[number]}`
    : `${B}__${E[number]}--${M[number]}`;
    
/*
 Example
 type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  },
  hobbies: ['swim', 'sing']
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]
*/
type ArrayToPrimitive<T extends any[], ACC extends any[] = []> = T extends [infer F, ...infer RT] 
  ? [ValueToPrimitive<F>, ...ArrayToPrimitive<RT>] 
  : ACC;
type ObjectToPrimitive<T extends Record<PropertyKey, any>> = {
  [Key in keyof T]: T[Key] extends Record<PropertyKey, any> 
                      ? ObjectToPrimitive<T[Key]> 
                      : ValueToPrimitive<T[Key]>
}
type ValueToPrimitive<T extends any> = T extends string 
  ? string 
  : T extends number 
    ? number
    : T extends boolean 
      ? boolean
      : T extends undefined 
        ? undefined
        : T extends null 
          ? null
          : never;
export type ToPrimitive<T extends Record<PropertyKey, any>> = {
  [Key in keyof T]: T[Key] extends any[] 
                      ? ArrayToPrimitive<T[Key]> 
                      : T[Key] extends object 
                        ? ObjectToPrimitive<T[Key]>
                        : ValueToPrimitive<T[Key]>
}
