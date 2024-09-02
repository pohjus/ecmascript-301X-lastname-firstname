const { spawnSync } = require("child_process");
const path = require("path");

function runCalculatorWithArgs(args) {
  const scriptPath = path.join(__dirname, "../calculator.js");
  const result = spawnSync("node", [scriptPath, ...args], { encoding: "utf8" });

  const output = result.stdout.trim();
  const errorOutput = result.stderr.trim();

  return { output, errorOutput };
}

describe("calculator.js CLI", () => {
  test("should print an error when no arguments are provided", () => {
    const { output } = runCalculatorWithArgs([]);
    expect(output).toBe(
      "Error: No calculation provided. Please provide a calculation in the format: <number> <operator> <number>. For example: 1 + 1.",
    );
  });

  test("should print an error for invalid first operand", () => {
    const { output } = runCalculatorWithArgs(["abc", "+", "2"]);
    expect(output).toBe(
      "Error: Invalid input. The first operand must be a number.",
    );
  });

  test("should print an error for invalid second operand", () => {
    const { output } = runCalculatorWithArgs(["1", "+", "xyz"]);
    expect(output).toBe(
      "Error: Invalid input. The second operand must be a number.",
    );
  });

  test("should print an error for both operands being invalid", () => {
    const { output } = runCalculatorWithArgs(["abc", "+", "xyz"]);
    expect(output).toBe("Error: Invalid input. Both operands must be numbers.");
  });

  test("should perform addition correctly", () => {
    const { output } = runCalculatorWithArgs(["2", "+", "3"]);
    expect(output).toBe("5");
  });

  test("should perform subtraction correctly", () => {
    const { output } = runCalculatorWithArgs(["5", "-", "3"]);
    expect(output).toBe("2");
  });

  test("should perform multiplication correctly", () => {
    const { output } = runCalculatorWithArgs(["4", "x", "2"]);
    expect(output).toBe("8");
  });

  test("should perform division correctly", () => {
    const { output } = runCalculatorWithArgs(["10", "/", "2"]);
    expect(output).toBe("5");
  });

  test("should print an error for division by zero", () => {
    const { output } = runCalculatorWithArgs(["10", "/", "0"]);
    expect(output).toBe(
      "Error: Division by zero is undefined. Please provide a non-zero divisor.",
    );
  });

  test("should print an error for invalid operator", () => {
    const { output } = runCalculatorWithArgs(["4", "%", "2"]);
    expect(output).toBe(
      "Error: Invalid operator. Please use one of the following operators: +, -, x, /.",
    );
  });
});
