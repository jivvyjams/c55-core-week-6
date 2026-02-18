const chalk = require("chalk");
const {
  printAllBooks,
  printSummary,
  getUnreadBooks,
  getBooksByGenre,
  addBook,
  markAsRead,
} = require("./readingList");
const command = process.argv[2];

printAllBooks();
printSummary();

// Example: filter unread
const unread = getUnreadBooks();
console.log("\nUnread Books:");
unread.forEach((book) => console.log(`${book.id}. ${book.title}`));

// Example: filter by genre
const fiction = getBooksByGenre("Fiction");
console.log("\nFiction Books:");
fiction.forEach((book) => console.log(`${book.id}. ${book.title}`));

// Example: add new book
if (command === "add") {
  const title = process.argv[3];
  const author = process.argv[4];
  const genre = process.argv[5];
  addBook({
    title: "Nudge",
    author: "Richard Thaler",
    genre: "Pyschology",
  });
}

// Example: mark a book as read
markAsRead(2);

console.log("\nRead books:");
printAllBooks();
printSummary();
