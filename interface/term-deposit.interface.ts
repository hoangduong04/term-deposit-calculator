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
