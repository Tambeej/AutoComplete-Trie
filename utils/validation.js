// functions isValidEmail/isValidEmail
 function isValidEmail (email) {
  return email.includes("@");
};

 function isEmailInList(contacts,email){
    return contacts.some((contact) => contact.email === email);
}

 function isValidPhone(phone) {
  return /^\d{3}-\d{3}-\d{4}$/.test(phone);
};


module.exports = {isValidEmail,isEmailInList,isValidPhone}