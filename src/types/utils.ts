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
