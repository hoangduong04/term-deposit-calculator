import { InterestPaidType } from "../interface";
import { TermDepositCalculatorService } from "./term-deposit-calculator.service";

describe("TermDepositCalculatorService#calculate", () => {
  it("calculate returns correctly at maturity", () => {
    const service = new TermDepositCalculatorService();

    expect(
      service.calculate(10000, 1.1, { years: 3 }, InterestPaidType.AT_MATURITY)
    ).toEqual(10330);
  });

  it("calculate returns correctly for interest paid monthly", () => {
    const service = new TermDepositCalculatorService();

    expect(
      service.calculate(10000, 1.1, { years: 3 }, InterestPaidType.MONTHLY)
    ).toEqual(10335);
  });

  it("calculate returns correctly for interest paid quaterly", () => {
    const service = new TermDepositCalculatorService();

    expect(
      service.calculate(10000, 1.1, { years: 3 }, InterestPaidType.QUARTERLY)
    ).toEqual(10335);
  });

  it("calculate returns correctly for interest paid yearly", () => {
    const service = new TermDepositCalculatorService();

    expect(
      service.calculate(10000, 1.1, { years: 3 }, InterestPaidType.ANNUALLY)
    ).toEqual(10334);
  });
});
