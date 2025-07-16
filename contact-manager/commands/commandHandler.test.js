const { handleCommand } = require("./commandHandler");
const { readContacts, listContacts } = require("../services/contactService");

describe("Get handel user input", () => {
  // add tests
  it("should return user data correctly", () => {
    const result = handleCommand([
      "add",
      "josh",
      "josh@mail.co",
      "123-456-0789",
    ]);
    expect(result).toEqual("user added");
  });
  it("should return message if the Email is not unique", () => {
    const result = handleCommand([
      "add",
      "josh",
      "josh@mail.co",
      "123-456-0789",
    ]);
    expect(result).toEqual("✗ Email must be unique");
  });

  it("should return message if there is less than 3 values", () => {
    const result = handleCommand(["add", "josh"]);
    expect(result).toEqual(
      "✗ Error: Missing arguments for add command\nUsage: node contacts.js add <name> <email> <phone>"
    );
  });

  // delete tests
  it("should delete the contact by email", () => {
    const result = handleCommand(["delete"]);
    expect(result).toEqual("Usage: delete <name>");
  });
  it("should return message if the obj deleted and to check it", () => {
    const result = handleCommand(["delete", "josh@mail.co"]);
    const contactsAfter = readContacts();
    expect(result).toEqual("user deleted");
    expect(
      contactsAfter.find((c) => c.email === "josh@mail.co")
    ).toBeUndefined();
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
