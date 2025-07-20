import { Utils } from ".";
import { InterestPaidType, InvestmentTerm, TimeInterval } from "../interface";

describe("Utils#termToIntervals", () => {
  it("convert terms to interval correctly when interval set to month", () => {
    const term: InvestmentTerm = {
      months: 5,
      years: 3,
    };

    expect(Utils.termToIntervals(term, TimeInterval.MONTH)).toEqual(41);
  });

  it("convert terms to interval correctly when interval set to year", () => {
    const term: InvestmentTerm = {
      months: 6,
      years: 3,
    };

    expect(Utils.termToIntervals(term, TimeInterval.YEAR)).toEqual(3.5);
  });

  it("convert terms to interval correctly when interval set to quarter", () => {
    const term: InvestmentTerm = {
      months: 6,
      years: 3,
    };

    expect(Utils.termToIntervals(term, TimeInterval.QUARTER)).toEqual(14);
  });
});

describe("Utils#interestByInterval", () => {
  it("returns correct interest value for each interval, based on interval", () => {
    expect(Utils.interestByInterval(12, InterestPaidType.MONTHLY)).toEqual(1);
    expect(Utils.interestByInterval(12, InterestPaidType.QUARTERLY)).toEqual(3);
    expect(Utils.interestByInterval(12, InterestPaidType.ANNUALLY)).toEqual(12);
  });
});
