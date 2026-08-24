/**
 * Borrowing Power Calculator Test Suite
 */

const assert = require("assert");
const {
  calculateBorrowingPower,
  createBorrowCalculator,
} = require("./borrowingCalculator");

describe("Term Deposit Calculator Tests", () => {
  it("should calculate borrowing power for standard values", async () => {
    const calculator = createBorrowCalculator();
    const result = await calculator.calculateBorrowingPower(
      120000,
      2,
      3000,
      10000,
      7.5,
    );
    assert.ok(
      result.maxLoanAmount > 0,
      "Should yield a positive borrowing power amount",
    );
    assert.strictEqual(result.monthlyRepayment, 4600);
  });

  it("should return 0 for invalid negative inputs", async () => {
    const calculator = createBorrowCalculator();
    
    const result = await calculator.calculateBorrowingPower(
      -30000,
      -3,
      -4000,
      -5000,
      -7.5,
    );
    assert.strictEqual(result.maxLoanAmount, 0);
    assert.strictEqual(result.monthlyRepayment, 0);
  });

  it("should accept number values for calculator input", async () => {
    const calculator = createBorrowCalculator();

    const result = await calculator.calculateBorrowingPower(
      150000.5,
      1,
      1500.8,
      1000,
      7.5,
    );
    assert.strictEqual(typeof 150000.5, "number");
    assert.strictEqual(typeof 1, "number");
    assert.strictEqual(typeof 1500.8, "number");
    assert.strictEqual(typeof 1000, "number");
    assert.strictEqual(typeof 7.5, "number");

    assert.ok(result.maxLoanAmount > 0);
  });

  it("should reduce borrowing power when there is a credit card limit", async () => {
    const calculator = createBorrowCalculator();

    const withoutCreditCard = await calculator.calculateBorrowingPower(
      120000,
      2,
      3000,
      0,
      7.5,
    );

    const withCreditCard = await calculator.calculateBorrowingPower(
      120000,
      2,
      3000,
      10000,
      7.5,
    );

    assert.ok(
      withCreditCard.maxLoanAmount < withoutCreditCard.maxLoanAmount,
      "borrowing power should be lower with a credit card limit",
    );
  });

  it("should reduce borrowing power when expenses are higher", async () => {
    const calculator = createBorrowCalculator();

    const lowerExpenses = await calculator.calculateBorrowingPower(
      120000,
      2,
      2000,
      0,
      7.5,
    );

    const higherExpenses = await calculator.calculateBorrowingPower(
      120000,
      2,
      4000,
      0,
      7.5,
    );

    assert.ok(
      higherExpenses.maxLoanAmount < lowerExpenses.maxLoanAmount,
      "borrowing power should be lower when expenses are higher",
    );
  });
});
