import { InterestPaidType, InvestmentTerm } from "../interface";

export class TermDepositCalculatorService {
  constructor() {}

  public calculate(
    startingAmount: number,
    interestRate: number,
    investmentTerm: InvestmentTerm,
    interestPaid: InterestPaidType
  ): number {
    return -1;
  }

  /**
   * Recursive functions to calculate compounded amount based on number of interest paid
   * @param amount
   * @param interestRate
   * @param totalCount
   * @param currentCount
   * @returns
   */
  private compound(
    amount: number,
    interestRate: number,
    totalCount: number,
    currentCount: number
  ): number {
    if (totalCount === currentCount) return amount;

    const compoundedAmount = amount * (1 + interestRate / 100);

    return this.compound(
      compoundedAmount,
      interestRate,
      totalCount,
      currentCount + 1
    );
  }
}
