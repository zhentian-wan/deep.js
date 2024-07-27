import CashSuper from "./CashSuper";

export default class CashNormal extends CashSuper {
  acceptCash(price: number, num: number): number {
    return price * num;
  }
}
