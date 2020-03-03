import { Child01Component } from '../components/child01/child01.component';
import { Child02Component } from '../components/child02/child02.component';
import { IChild03 } from '../components/child03/child03.component';


export abstract class Parent {
  name: string;
  child01: Child01Component;
  child02: Child02Component;
  child03: IChild03;

}


export abstract class ServiceBase {
  abstract getList(): string[];
}
