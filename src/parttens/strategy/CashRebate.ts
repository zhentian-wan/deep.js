import CashSuper from "./CashSuper";

export default class CashRebate extends CashSuper {
  private moneyRebate: number = 1;
  constructor(moneyRebate: number) {
    super();
    this.moneyRebate = moneyRebate;
  }
  acceptCash(price: number, num: number): number {
    return price * num * this.moneyRebate;
  }
}
