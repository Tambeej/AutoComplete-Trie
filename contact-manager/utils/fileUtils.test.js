const { saveContacts, loadContacts } = require("./fileUtils");

describe("Get load files functions", () => {
  it("should return a list of contacts correctly", () => {
    const expectedContacts = [
      { email: "john@example.com", name: "John Doe", phone: "555-123-4567" },
      { email: "jane@example.com", name: "Jane Smith", phone: "555-987-6543" },
    ];
    const result = loadContacts("contacts.json");
    expect(result).toEqual(expect.arrayContaining(expectedContacts));
  });

  it("should return we entered a folder name", () => {
    const filePath = "utils";
    const result = loadContacts(filePath);
    expect(result).toEqual(`✗ Path is a directory, not a file: ${filePath}`);
  });

  it("should return it's not a json file", () => {
    const filePath = "not-a-json.txt";
    const result = loadContacts(filePath);
    expect(result).toEqual(`Its not a JSON`);
  });

  it("should throw that the path is invalid", () => {
    const filePath = "";
    expect(() => loadContacts(filePath)).toThrow("Invalid file path provided");
  });
});

describe("Get save files functions", () => {
  it("should create a new emtpy file for contacts and save contacts in it", () => {
    const filePath = "contact-empty.json";
    const contacts = [];
    const result = saveContacts(filePath, contacts);
    expect(result).toEqual(`✓ Contacts saved to contacts.json`);
  });
  it("should return undefined because file path is undefind", () => {
    const filePath = "";
    const contacts = [];
    const result = saveContacts(filePath, contacts);
    expect(result).toBeUndefined();
  });
});
