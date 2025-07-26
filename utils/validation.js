import  trie  from "../services/trieService.js";


export function isValidWord(word) {
  return typeof word === "string" && /^[a-zA-Z]+$/.test(word);
}


// module.exports = {
//   isValidWord,
// };
