/*
Example
class Person {
  static addPerson() {}
  name: string;
  age: number;
}
Properties<typeof Person> // 'name' | 'age'
*/
export type Properties<T extends {new (...args: any[]): any}> = keyof InstanceType<T>

/* 
Example
class A {
  public str: string
  protected num: number
  private bool: boolean
  constructor() {
    this.str = 'naive'
    this.num = 19260917
    this.bool = true
  }

  getNum() {
    return Math.random()
  }
}

type cases = [
  Expect<Equal<ClassPublicKeys<A>, 'str' | 'getNum'>>,
]
*/
export type ClassPublicKeys<C> = keyof C;