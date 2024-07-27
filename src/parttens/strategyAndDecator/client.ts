import CashContext from "./CashContext";

const cc: CashContext = new CashContext("rebate");
const totalPrice = cc.getResult(100, 2);

console.log("totalPrice: ", totalPrice); // 160
