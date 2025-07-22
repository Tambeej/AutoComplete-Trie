const { handleCommand } = require("./commandHandler");
const { readContacts, listContacts } = require("../services/trieService");

describe("Get handel user input", () => {
  it("should return user data correctly", () => {
    const result = handleCommand(["add", "josh"]);
    expect(result).toEqual(`✓ Added 'josh' to dictionary`);
  });

  it("should return message if there is more less 2 values", () => {
    const result = handleCommand(["add"]);
    expect(result).toEqual(
      `✗ Error: Missing argument for add command\nUsage: add <word>`
    );
  });
  it("should return message that the word is not found", () => {
    const result = handleCommand(["find", "Tamar"]);
    expect(result).toEqual(`✗ 'Tamar' not found in dictionary`);
  });

  it("should find the word Tamar", () => {
    handleCommand(["add", "Tamar"]);
    const result = handleCommand(["find", "Tamar"]);
    expect(result).toEqual(`✓ 'Tamar' exists in dictionary`);
  });
  it("should show completions for prefix 'tam'", () => {
    handleCommand(["add", "tamar"]);
    handleCommand(["add", "tamir"]);
    const result = handleCommand(["complete", "tam"]);
    expect(result).toContain(`Suggestions for 'tam'`);
    expect(result).toContain("tamar");
    expect(result).toContain("tamir");
  });

  it("should show error for missing add argument", () => {
    const result = handleCommand(["add"]);
    expect(result).toMatch(/Missing argument for add command/);
  });

  it("should show error for missing find argument", () => {
    const result = handleCommand(["find"]);
    expect(result).toMatch(/Missing argument for find command/);
  });

  it("should show error for missing complete argument", () => {
    const result = handleCommand(["complete"]);
    expect(result).toMatch(/Missing argument for complete command/);
  });

  it("should show help message", () => {
    const result = handleCommand(["help"]);
    expect(result).toMatch(/add <word>/);
    expect(result).toMatch(/find <word>/);
    expect(result).toMatch(/complete <prefix>/);
  });

  it("should show error on too many arguments for exit", () => {
    const result = handleCommand(["exit", "now"]);
    expect(result).toMatch(/Too many argument for exit command/);
  });

  it("should return nothing or undefined for clean exit", () => {
    const result = handleCommand(["exit"]);
    expect(result).toBeUndefined();
  });

  it("should handle unknown command", () => {
    const result = handleCommand(["foobar"]);
    expect(result).toMatch(/Unknown command/);
  });
});
