const { spawnSync } = require("child_process");
const path = require("path");

function runTypesScript() {
  const scriptPath = path.join(__dirname, "../types.js");
  const result = spawnSync("node", [scriptPath], { encoding: "utf8" });

  const output = result.stdout.trim();
  const errorOutput = result.stderr.trim();

  return { output, errorOutput };
}

describe("types.js CLI", () => {
  test("should correctly identify and log all primitive types", () => {
    const { output } = runTypesScript();

    const expectedOutput = [
      "1 (number)",
      '"hello" (string)',
      "true (boolean)",
      "null (object)",
      "undefined (undefined)",
      "123123 (bigint)",
    ].join("\n");

    expect(output).toBe(expectedOutput);
  });
});
