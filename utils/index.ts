import { InvestmentTerm, TimeInterval } from "../interface";

export abstract class Utils {
  static convertTermToIntervals(
    investmentTerm: InvestmentTerm,
    intervalType: TimeInterval
  ): number {
    switch (intervalType) {
      case TimeInterval.MONTH:
        return (
          (investmentTerm?.years ?? 0) * 12 + (investmentTerm?.months ?? 0)
        );
      default:
        return (
          (investmentTerm?.years ?? 0) + (investmentTerm?.months ?? 0) / 12
        );
    }
  }
}
