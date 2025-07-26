import trie from "./services/trieService.js";

const wordInput = document.getElementById("wordInput");
const addWordBtn = document.getElementById("addWordBtn");
const feedbackMessage = document.getElementById("feedbackMessage");
const wordCountDisplay = document.getElementById("wordCount");

const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestionsList");
let wordCount = 0;

addWordBtn.addEventListener("click", () => {
  const word = wordInput.value.trim();
  if (!word) return;

  const result = trie.addWord(word);
  if (result == true) {
    showFeedback(`"${word}" added successfully.`, true);
    wordInput.value = "";
    updateWordCount();
  } else {
    showFeedback(result, false);
  }
});

searchInput.addEventListener("input", () => {
  const prefix = searchInput.value.trim();
  const suggestions = trie.predictWords(prefix);
  updateSuggestions(suggestions);
});

function updateWordCount() {
  wordCount += 1;
  wordCountDisplay.textContent = wordCount;
}

function showFeedback(message, isSuccess) {
  feedbackMessage.textContent = message;
  feedbackMessage.className = isSuccess ? "success" : "error";
  feedbackMessage.classList.remove("hidden");
  setTimeout(() => feedbackMessage.classList.add("hidden"), 3000);
}

function updateSuggestions(suggestions) {
  suggestionsList.innerHTML = "";

  const input = searchInput.value.trim();

  if (suggestions.length === 0 || input === "") {
    suggestionsList.classList.add("hidden");
    return;
  }

  suggestions.forEach((word) => {
    const li = document.createElement("li");

    const index = word.toLowerCase().indexOf(input.toLowerCase());
    if (index !== -1) {
      const before = word.slice(0, index);
      const match = word.slice(index, index + input.length);
      const after = word.slice(index + input.length);

      li.innerHTML = `${before}<span class="highlight">${match}</span>${after}`;
    } else {
      li.textContent = word; 
    }

    li.addEventListener("click", () => {
      searchInput.value = word;
      suggestionsList.classList.add("hidden");
    });

    suggestionsList.appendChild(li);
  });

  suggestionsList.classList.remove("hidden");
}

