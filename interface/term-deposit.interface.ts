export enum InterestPaidType {
  MONTHLY = "monthly",
  QUARTERLY = "quaterly",
  ANNUALLY = "annualy",
  AT_MATURITY = "maturity",
}

export interface InvestmentTerm {
  months?: number;
  years?: number;
}

export enum TimeInterval {
  MONTH = "month",
  YEAR = "year",
  QUARTER = "quarter",
}
