// const {
//   isValidEmail,
//   isValidPhone,
//   isEmailInList,
// } = require("../utils/validation.js");


class TrieNode {
  constructor(value = "") {
    this.value = value;
    this.children = new Set(); 
    this.endOfWord = false;
  }

  getChild(char) {
    for (let child of this.children) {
      if (child.value === char) {
        return child;
      }
    }
    return null;
  }
}

class AutoCompleteTrie {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let currentNode = this.root;

    for (const char of word) {
      let childNode = currentNode.getChild(char);
      if (!childNode) {
        childNode = new TrieNode(char);
        currentNode.children.add(childNode);
      }
      currentNode = childNode;
    }

    currentNode.endOfWord = true;
  }

  findWord(word) {
    let currentNode = this.root;

    for (const char of word) {
      currentNode = currentNode.getChild(char);
      if (!currentNode) {
        return false;
      }
    }

    return currentNode.endOfWord;
  }

  predictWords(prefix) {
    let currentNode = this._getRemainingTree(prefix, this);
    let allWords = [];
    this._allWordsHelper(prefix, currentNode, allWords);
    return allWords;
  }

  _getRemainingTree(prefix, node) {
    let currentNode = this.root;
    let lastNode;
    for (const char of prefix) {
      lastNode = currentNode;
      currentNode = currentNode.getChild(char);
      if (!currentNode) {
        return lastNode;
      }
    }
    return currentNode;
  }

  _allWordsHelper(prefix, node, allWords) {
    if (node.endOfWord) {
      allWords.push(prefix);
    }

    for (let child of node.children) {
      this._allWordsHelper(prefix + child.value, child, allWords);
    }
  }
}

const trie = new AutoCompleteTrie();
module.exports = trie;
