import { InterestPaidType, InvestmentTerm } from "../interface";

export class TermDepositCalculatorService {
  constructor() {}

  public calculateInterest(
    startingAmount: number,
    interestRate: number,
    investmentTerm: InvestmentTerm,
    interestPaid: InterestPaidType
  ): number {
    return -1;
  }
}
