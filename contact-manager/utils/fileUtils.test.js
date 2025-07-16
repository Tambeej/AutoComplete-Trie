const { saveContacts, loadContacts } = require("./fileUtils");

describe("Get files functions", () => {
  it("should return a list of contacts correctly", () => {
    const result = loadContacts("contacts.json");
    expect(result.sort()).toEqual(
      [
        { email: "john@example.com", name: "John Doe", phone: "555-123-4567" },
        {
          email: "jane@example.com",
          name: "Jane Smith",
          phone: "555-987-6543",
        },
      ].sort()
    );
  });

  it("should return we entered a folder name", () => {
    const filePath = "utils";
    const result = loadContacts(filePath);
    expect(result).toEqual(`✗ Path is a directory, not a file: ${filePath}`);
  });

  it("should return we entered a folder name", () => {
    const filePath = "contacts.json";
    const result = loadContacts(filePath);
    expect(result).toEqual(`✗ Path is a directory, not a file: ${filePath}`);
  });
});
