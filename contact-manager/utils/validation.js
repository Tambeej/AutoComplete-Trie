// functions isValidEmail/isValidEmail
export function isValidEmail (email) {
  return email.includes("@");
};

export function isEmailInList(contacts,email){
    return contacts.some((contact) => contact.email === email);
}

export function isValidPhone(phone) {
  return /^\d{3}-\d{3}-\d{4}$/.test(phone);
};


