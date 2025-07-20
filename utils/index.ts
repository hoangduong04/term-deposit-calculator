import { InvestmentTerm, TimeInterval } from "../interface";

export abstract class Utils {
  static termToIntervals(
    investmentTerm: InvestmentTerm,
    intervalType: TimeInterval
  ): number {
    switch (intervalType) {
      case TimeInterval.MONTH:
        return (
          (investmentTerm?.years ?? 0) * 12 + (investmentTerm?.months ?? 0)
        );
      case TimeInterval.QUARTER:
        return (
          ((investmentTerm?.years ?? 0) * 12 + (investmentTerm?.months ?? 0)) /
          3
        );
      default:
        return (
          (investmentTerm?.years ?? 0) + (investmentTerm?.months ?? 0) / 12
        );
    }
  }
}
