import CashNormal from "./CashNormal";
import CashRebate from "./CashRebate";
import CashReturn from "./CashReturn";
import CashSuper from "./CashSuper";
import { CashType } from "./types";

export default class CashContext {
  private cash: CashSuper;
  constructor(cashType: CashType) {
    switch (cashType) {
      case "normal":
        this.cash = new CashNormal();
        break;
      case "rebate":
        this.cash = new CashRebate(0.8);
        break;
      case "return":
        this.cash = new CashReturn(300, 100);
        break;
    }
  }
  getResult(price: number, num: number) {
    return this.cash.acceptCash(price, num);
  }
}
