import CashNormal from "./CashNormal";
import CashRebate from "./CashRebate";
import CashReturn from "./CashReturn";
import { ISale } from "./types";

export default class CashContext {
  private cash: ISale;
  constructor(cashType: string) {
    switch (cashType) {
      case "normal":
        this.cash = new CashNormal();
        break;
      case "returnThenRebate": {
        const cn = new CashNormal();
        const cr1 = new CashReturn(300, 100);
        const cr2 = new CashRebate(0.8);

        cr1.decorate(cn);
        cr2.decorate(cr1);
        this.cash = cr2;
        break;
      }
      case "rebateThenReturn": {
        const cn = new CashNormal();
        const cr1 = new CashRebate(0.7);
        const cr2 = new CashReturn(200, 50);
        cr1.decorate(cn);
        cr2.decorate(cr1);
        this.cash = cr2;
        break;
      }
    }
  }
  getResult(price: number, num: number) {
    return this.cash.acceptCash(price, num);
  }
}
