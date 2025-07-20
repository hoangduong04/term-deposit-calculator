import { InterestPaidType, InvestmentTerm, TimeInterval } from "../interface";
import { Utils } from "../utils";

export class TermDepositCalculatorService {
  constructor() {}

  public calculate(
    startingAmount: number,
    interestRate: number,
    investmentTerm: InvestmentTerm,
    interestPaid: InterestPaidType
  ): number {
    const intervalInterest = Utils.interestByInterval(
      interestRate,
      interestPaid
    );

    const intervals = this.getCompoundingIntervals(
      investmentTerm,
      interestPaid
    );

    return Math.round(
      this.compound(startingAmount, intervalInterest, intervals, 0)
    );
  }

  /**
   * Recursive function to calculate compounded amount based on number of interest paid
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

  /**
   * Convert deposit term into number of intervals of interest payment
   */
  private getCompoundingIntervals(
    investmentTerm: InvestmentTerm,
    interestPaid: InterestPaidType
  ): number {
    switch (interestPaid) {
      case InterestPaidType.AT_MATURITY:
        return 1;
      case InterestPaidType.MONTHLY:
        return Utils.termToIntervals(investmentTerm, TimeInterval.MONTH);
      case InterestPaidType.QUARTERLY:
        return Utils.termToIntervals(investmentTerm, TimeInterval.QUARTER);
      case InterestPaidType.ANNUALLY:
        return Utils.termToIntervals(investmentTerm, TimeInterval.YEAR);
      default:
        return -1;
    }
  }
}
