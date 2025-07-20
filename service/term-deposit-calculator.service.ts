import { InterestPaidType, InvestmentTerm, TimeInterval } from "../interface";
import { Utils } from "../utils";

export class TermDepositCalculatorService {
  constructor() {}

  /**
   * Calculate term deposit returns
   * @param startingAmount amount deposited at the start
   * @param interestRate annual interest rate
   * @param investmentTerm term of investment, made up of months and years
   * @param interestPaid frequency of which interest if paid
   * @returns
   */
  public calculate(
    startingAmount: number,
    interestRate: number,
    investmentTerm: InvestmentTerm,
    interestPaid: InterestPaidType
  ): number {
    if (isNaN(startingAmount)) {
      console.error("Please enter numeric starting amount");
      return -1;
    }

    if (isNaN(interestRate)) {
      console.error("Please enter numeric interest rate");
      return -1;
    }

    if (startingAmount === 0) return 0;

    // If interest rate is 0 or if investment term is 0
    if (interestRate === 0 || (!investmentTerm.months && !investmentTerm.years))
      return startingAmount;

    // Special case to calculate interest rate at maturity
    if (interestPaid === InterestPaidType.AT_MATURITY) {
      const numberOfYears = Utils.termToIntervals(
        investmentTerm,
        TimeInterval.YEAR
      );
      const combinedInterestRate = interestRate * numberOfYears;

      return Math.round(
        this.compound(startingAmount, combinedInterestRate, 1, 0)
      );
    }

    // Default - divide term into intervals based on interest payment frequency, then recursively compound the amount
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
   * @param amount starting amount
   * @param interestRate interest rate
   * @param totalCount total number of times that the amount needs compounding
   * @param currentCount variable to keep track of how many compounding has happened
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
