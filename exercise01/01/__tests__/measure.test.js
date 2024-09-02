const { execFile } = require("child_process");
const path = require("path");

test("measure.js should correctly sum numbers and report execution time", (done) => {
  // Execute measure.js using execFile
  execFile(
    "node",
    [path.join(__dirname, "../measure.js")],
    (error, stdout, stderr) => {
      if (error) {
        done(error);
        return;
      }

      // Split the output by lines
      const outputLines = stdout.trim().split("\n");

      // Check the correctness of the sum
      expect(outputLines[0]).toBe(
        "The sum of numbers from 1 to 10 million is: 50000005000000",
      );

      // Check the execution time format
      const timeOutput = outputLines[1];
      const timeRegex = /Execution time: \d+\.\d{2} milliseconds/;
      expect(timeOutput).toMatch(timeRegex);

      done();
    },
  );
});
