/**
 * Big integer sum
 * Using strings to represent big integers
 * 
 *  const res = sum("1354523252442512423", "999999239");
 */
export function bigIntSum(a: string, b: string): string {
    const maxLength = Math.max(a.length, b.length);
    const aStr = a.padStart(maxLength, "0");
    const bStr = b.padStart(maxLength, "0");
    let carry = 0;
    let result = "";
    for (let i = maxLength - 1; i >= 0; i--) {
      const sum = Number(aStr[i]) + Number(bStr[i]) + carry;
      const digit = sum % 10;
      result = `${digit}${result}`;
      carry = Math.floor(sum / 10);
    }
  
    if (carry === 1) {
      result = `${carry}${result}`;
    }
  
    return result;
  }
  
 
  