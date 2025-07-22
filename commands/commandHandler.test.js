const { handleCommand } = require("./commandHandler");
const { readContacts, listContacts } = require("../services/contactService");

describe("Get handel user input", () => {
  it("should return user data correctly", () => {
    const result = handleCommand(["add", "josh"]);
    expect(result).toEqual(`✓ Word "josh" added successfully`);
  });

  it("should return message if there is more less 2 values", () => {
    const result = handleCommand(["add"]);
    expect(result).toEqual(
      `✗ Error: Missing argument for add command\nUsage: add <word>`
    );
  });

  it("should find the word Tamar", () => {
    const addedWord = handleCommand(["add","tamar"]);
    const result = handleCommand(["find","Tamar"])
    expect(result).toEqual( `✓ Word "Tamar" found.`);
  });
  it("should return message that the word is not found", () => {
    const result = handleCommand(["find","Tamar"])
    expect(result).toEqual( `✓ Word "Tamar" found.`);
  });

  // search tests
  it("should return the contact if found by any field ", () => {
    const resultByName = handleCommand(["search", "Josh"]);
    expect(Array.isArray(resultByName)).toBeTruthy();
    expect(resultByName.length).toBeGreaterThan(0);
    expect(resultByName[0].name.toLowerCase()).toContain("josh");

    const resultByEmail = handleCommand(["search", "josh@mail.co"]);
    expect(Array.isArray(resultByEmail)).toBeTruthy();
    expect(resultByEmail.length).toBeGreaterThan(0);
    expect(resultByEmail[0].email).toBe("josh@mail.co");

    const resultByPhone = handleCommand(["search", "123-456-0789"]);
    expect(Array.isArray(resultByPhone)).toBeTruthy();
    expect(resultByPhone.length).toBeGreaterThan(0);
    expect(resultByPhone[0].phone).toBe("123-456-0789");
  });
  it("should  return a value (array of matching contacts)", () => {
    const result = handleCommand(["search", "josh@mail.co"]);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].email).toBe("josh@mail.co");
  });
  it("should return an empty array if no matches", () => {
    const result = handleCommand(["search", "nonexistent@email.com"]);
    expect(result).toEqual([]);
  });

  // list tests
  it("should return the list, or message if the list is empty", () => {
    const result = handleCommand(["list"]);

    if (Array.isArray(result)) {
      expect(result.length).toBeGreaterThan(0);

      result.forEach((line, index) => {
        expect(line).toMatch(
          new RegExp(`^${index + 1}\\. .+ - .+@.+\\..+ - .+$`)
        );
      });
    } else {
      expect(result).toEqual("✗ No contacts found.");
    }
  });
});
