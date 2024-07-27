import CashSuper from "./CashSuper";

export default class CashReturn extends CashSuper {
  private moneyCondition: number = 0;
  private moneyReturn: number = 0;
  constructor(moneyCondition: number, moneyReturn: number) {
    super();
    this.moneyCondition = moneyCondition;
    this.moneyReturn = moneyReturn;
  }
  acceptCash(price: number, num: number): number {
    let result = price * num;
    if (this.moneyCondition > 0 && result >= this.moneyCondition) {
      result =
        result - Math.floor(result / this.moneyCondition) * this.moneyReturn;
    }
    return super.acceptCash(result, 1);
  }
}
