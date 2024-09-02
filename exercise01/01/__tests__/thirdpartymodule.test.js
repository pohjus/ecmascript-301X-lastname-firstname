const path = require("path");
const oneLinerJoke = require("one-liner-joke");

// Mock the one-liner-joke module
jest.mock("one-liner-joke");

test("thirdpartymodule.js should log the joke returned by the module", () => {
  // Mocked joke
  const mockJoke = {
    body: "A diplomat is a man who always remembers a woman's birthday but never remembers her age.",
  };
  oneLinerJoke.getRandomJoke.mockReturnValue(mockJoke);

  // Spy on console.log to capture the output
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  // Require the module (this will execute the code)
  require(path.join(__dirname, "../thirdpartymodule.js"));

  // Check if the correct outputs were logged
  expect(consoleSpy).toHaveBeenCalledWith("Here's a random joke for you:");
  expect(consoleSpy).toHaveBeenCalledWith(mockJoke.body);

  // Restore the original console.log
  consoleSpy.mockRestore();
});
