import CashSuper from "./CashSuper";

export default class CashRebate extends CashSuper {
  private moneyRebate: number = 1;
  constructor(moneyRebate: number) {
    super();
    this.moneyRebate = moneyRebate;
  }
  acceptCash(price: number, num: number): number {
    const result = price * num * this.moneyRebate;
    return super.acceptCash(result, 1);
  }
}
