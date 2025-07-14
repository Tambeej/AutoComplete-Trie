// V addContact 
// V listContacts
// V searchContacts
// V deleteContact

const fs = require('fs');
const path = require('path');

const contactsFile = path.join(__dirname, 'contacts.json');

// Ensure file exists; if not, create it with empty array
function ensureContactsFile() {
  if (!fs.existsSync(contactsFile)) {
    fs.writeFileSync(contactsFile, '[]');
  }
}

// Load contacts from file
function loadContacts() {
  ensureContactsFile();
  try {
    const data = fs.readFileSync(contactsFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading contacts file:', err.message);
    return [];
  }
}

const contacts = loadContacts();


// Save contacts to file
function saveContacts(contacts) {
  try {
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.error('Error saving contacts:', err.message);
  }
}



// Add a new contact

function addContact(name, email, phone) {
//   const contacts = loadContacts();

  // Validate email contains @ symbol
  if (!email.includes('@')) {
    console.log(`Email must contain @ symbol`);
    return;
  }

  // Check for duplicate email
  if (contacts.some(contact => contact.email === email)) {
    console.log(`A contact with email "${email}" already exists.`);
    return;
  }
// Check for duplicate name, I think it's better to check by email

  if (contacts.some(contact => contact.name === name)) {
    console.log(`Contact with name "${name}" already exists.`);
    return;
  }

  // Validate phone (only numbers and dashes)
  const phoneRegex = /^[0-9\-]+$/;
  if (!phoneRegex.test(phone)) {
    console.log(`Invalid phone number: "${phone}". Only digits and "-" allowed.`);
    return;
  }

  contacts.push({ name, email, phone });
  saveContacts(contacts);
  console.log('Contact added successfully.');
}

 addContact('john', 'john@mail.com', '3210545545');


// List all contacts
function listContacts() {
  //const contacts = loadContacts();

  if (contacts.length === 0) {
    console.log('No contacts found.');
    return;
  }

  console.log('Contacts:');
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name} - ${contact.email} - ${contact.phone}`);
  });
}

listContacts();


// Search contacts
function searchContacts(query) {
  //const contacts = loadContacts();
  const results = contacts.filter(contact =>
    contact.name.toLowerCase().includes(query.toLowerCase()) ||
    contact.email.toLowerCase().includes(query.toLowerCase()) ||
    contact.phone.includes(query)
  );

  if (results.length === 0) {
    console.log(`No contacts found matching "${query}".`);
    return;
  }

  console.log(`Found ${results.length} contact(s):`);
  results.forEach(contact => {
    console.log(`${contact.name} - ${contact.email} - ${contact.phone}`);
  });
}

searchContacts('john');


// Delete contact by name
function deleteContact(name) {
  //const contacts = loadContacts();
  const updated = contacts.filter(contact => contact.name !== name);

  if (updated.length === contacts.length) {
    console.log(`Contact with name "${name}" not found.`);
    return;
  }

  saveContacts(updated);
  console.log(`Contact "${name}" deleted.`);
}

deleteContact('john');

module.exports = {
  addContact,
  listContacts,
  searchContacts,
  deleteContact
};