const axios = require("axios");
const path = require("path");

// Mock axios at the top of the file
jest.mock("axios");

test("myfetch.js should log the joke returned by the API", async () => {
  // Mock the axios.get method to return a predictable joke
  const mockJoke = { data: { value: "Chuck Norris can divide by zero." } };
  axios.get.mockResolvedValue(mockJoke);

  // Spy on console.log to capture the output
  const consoleSpy = jest.spyOn(console, "log");

  // Require the script, which will execute it
  require(path.join(__dirname, "../myfetch.js"));

  // Wait for the promise to resolve
  await new Promise(setImmediate);

  // Check if the output matches the mocked joke
  expect(consoleSpy).toHaveBeenCalledWith(mockJoke.data.value);

  // Restore the original console.log
  consoleSpy.mockRestore();
});
