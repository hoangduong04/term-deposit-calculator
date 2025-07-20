import * as readline from "readline/promises";
import { InterestPaidType } from "../interface";
import { TermDepositCalculatorService } from "../service";

export class App {
  constructor() {}

  public async start() {
    const termCalculatorService = new TermDepositCalculatorService();
    let amountStr = "";
    const inputConfig = {
      signal: AbortSignal.timeout(300_000), // 5 minutes timeout
    };

    // TODO: add error handling and retry upon incorrect entries
    while (amountStr !== "-1") {
      console.log(`====================================`);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      try {
        // starting amount
        amountStr = await rl.question("Enter starting amount: ", inputConfig);

        const amount = parseInt(amountStr);

        // interest rate
        let interestRateStr = await rl.question(
          "Enter interest rate: ",
          inputConfig
        );

        const interestRate = parseFloat(interestRateStr);

        // interest paid interval
        const interestPaidQ =
          "Enter number corresponding to frequency of interest payment\n" +
          "1. Monthly\n" +
          "2. Quarterly\n" +
          "3. Yearly\n" +
          "4. At maturity\n" +
          "Your selection: ";

        let interestPaidIntervalStr = await rl.question(
          interestPaidQ,
          inputConfig
        );

        let interestPaid;
        switch (interestPaidIntervalStr) {
          case "1":
            interestPaid = InterestPaidType.MONTHLY;
            break;
          case "2":
            interestPaid = InterestPaidType.QUARTERLY;
            break;
          case "3":
            interestPaid = InterestPaidType.ANNUALLY;
            break;
          case "4":
            interestPaid = InterestPaidType.AT_MATURITY;
            break;
          default:
            console.error("Interest paid not supported");
        }

        // deposit term

        let termYearStr = await rl.question(
          "Enter years of deposit term: ",
          inputConfig
        );

        const termYear = parseInt(termYearStr);

        let termMonthStr = await rl.question(
          "Enter months of deposit term: ",
          inputConfig
        );

        const termMonth = parseInt(termMonthStr);

        // Calculate returns
        const returns = termCalculatorService.calculate(
          amount,
          interestRate,
          { years: termYear, months: termMonth },
          interestPaid
        );

        console.log(`Your return is $${returns}`);
      } finally {
        rl.close();
      }
    }
  }
}
