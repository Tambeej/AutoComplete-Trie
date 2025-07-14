//  saveContacts
import fs from "fs";

export function loadContacts(filePath) {
  console.log(`Loading contacts from ${filePath}...`);
  let data = null;
  try {
    let file = fs.openSync(filePath, "r");
  } catch (err) {
    if (err.code === "EISDIR") {
      return(`✗ Path is a directory, not a file: ${filePath}`);
    }
    if (err.code === "ENOENT") {
      console.log("✗ File not found - creating new contact list");
      const emptyJsonContent = "[]";
      fs.writeFileSync(
        filePath,
        emptyJsonContent,
        "utf8"
      );
      return([]);
    }
  }
  try {
    const data = fs.readFileSync(filePath, "utf8");
    console.log(`✓ Loaded ${data.length} contacts`)
    return(JSON.parse(data));
  } catch {
    return("Its not a JSON");
  }
}

export function saveContacts(contactsFile, contacts) {
  try {
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
    console.log("✓ Contacts saved to contacts.json")
  } catch (err) {
    console.error("Error saving contacts:", err.message);
  }
}

