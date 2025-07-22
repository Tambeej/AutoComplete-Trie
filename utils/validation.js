const trie = require("../services/trieService.js");

function isValidWord(word) {
  return typeof word === "string" && /^[a-zA-Z]+$/.test(word);
}


module.exports = {
  isValidWord,
};
