export type CashType = "normal" | "rebate" | "return";

export interface ISale {
  acceptCash(price: number, num: number): number;
}
