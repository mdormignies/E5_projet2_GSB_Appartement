export class Person {
  public name: string ;
  public age: number ;

  constructor(name: string = '', age: number = 18) {
    this.name = name;
    this.age = age;
  }
}