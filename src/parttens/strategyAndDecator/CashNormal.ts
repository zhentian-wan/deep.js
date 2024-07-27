import { ISale } from "./types";

export default class CashNormal implements ISale {
  acceptCash(price: number, num: number): number {
    return price * num;
  }
}
