const { handleCommand } = require("./commandHandler");

describe("Get handel user input", () => {
  it("should return user data correctly", () => {
    const result = handleCommand(["add", "josh", "josh@mail.co", "123-456-0789"]);
    expect(result).toEqual("user added");
  });
    it("should return message if the Email is not unique", () => {
    const result = handleCommand(["add", "josh", "josh@mail.co", "123-456-0789"]);
    expect(result).toEqual("✗ Email must be unique");
  });
});
