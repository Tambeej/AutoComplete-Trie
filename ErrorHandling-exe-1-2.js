
// Exercise 1
// Create a JSON parser that handles invalid JSON gracefully.

// Take a string input (could be valid or invalid JSON)
// Use try-catch to handle JSON.parse() errors
// Return parsed object on success, or error message on failure
// Test with both valid and invalid JSON strings

function safeJsonParse(input) {
  try {
    return JSON.parse(input);
  } catch (error) {
    return "Invalid JSON format";
  }
}

// Test cases
console.log(safeJsonParse('{"name": "John"}')); 
// Output: { name: "John" }

console.log(safeJsonParse('invalid json')); 
// Output: "Invalid JSON format"



// Exercise 2

// Create a file reader function readFileWithErrorHandling that handles different file system errors.
// Use fs.readFile() with callback pattern
// Make sure to handle at least the following: existing file, non-existing file, directory instead of file
// Provide specific error messages for each error type
// Return success message with file size on successful read
// Example:

// readFileWithErrorHandling('existing.txt', (result) => {
//   console.log(result);
//   // Success: "File read successfully. Size: 150 bytes"
//   // Or error: "File not found: existing.txt"
// });

const fs = require('fs');
const path = require('path');
    
function readFileWithErrorHandling(filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        callback(`File not found: ${filePath}`);
      } else if (err.code === 'EISDIR') {
        callback(`Path is a directory, not a file: ${filePath}`);
      } else {
        callback(`Error reading file: ${err.message}`);
      }
    } else {
      callback(`File read successfully. Size: ${data.length} bytes`);
    }
  });
}


readFileWithErrorHandling('existing.txt', (result) => {
  console.log(result);
});

readFileWithErrorHandling('nonexistent.txt', (result) => {
  console.log(result); // File not found: nonexistent.txt
});

readFileWithErrorHandling('.', (result) => {
  console.log(result); // Path is a directory, not a file: .
});