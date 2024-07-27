import { ISale } from "./types";

export default class CashSuper implements ISale {
  protected component: ISale;
  decorate(component: ISale) {
    this.component = component;
  }

  acceptCash(price: number, num: number): number {
    let result = 0;
    if (this.component !== null) {
      result = this.component.acceptCash(price, num);
    }
    return result;
  }
}
