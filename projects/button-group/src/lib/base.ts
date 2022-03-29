import { QueryList } from "@angular/core";
import { IButton } from "./interfaces";


export abstract class ButtonGroupBase {
  abstract parent: ButtonGroupBase;

  abstract max: number;
  abstract listOfButton: QueryList<IButton>;

  get buttons() {
    return this.listOfButton.filter((item, index) => index < this.max)
  }

  get menuItems() {
    return this.listOfButton.filter((item, index) => index >= this.max)
  }

}
