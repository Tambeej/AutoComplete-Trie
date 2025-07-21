const trie = require("../services/trieService.js");

function isValidWord(word) {
  return /^[a-zA-Z]+$/.test(word);
}

function isUnique(word) {
  if (trie.findWord(word)) {
    return false;
  }
  return true;
}

module.exports = {
  isValidWord,
  hasMinimumLength,
};
