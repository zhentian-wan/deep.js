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
