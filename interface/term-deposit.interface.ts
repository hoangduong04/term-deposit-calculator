export enum InterestPaidType {
  MONTHLY = "monthly",
  QUARTERLY = "quaterly",
  YEARLY = "yearly",
  AT_MATURITY = "maturity",
}

export interface InvestmentTerm {
  months?: number;
  years?: number;
}
