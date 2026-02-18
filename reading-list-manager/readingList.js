const fs = require("fs");
const chalk = require("chalk");

const FILE = "books.json";

function loadBooks() {
  try {
    const text = fs.readFileSync(FILE, "utf8");
    const books = JSON.parse(text);
    if (!Array.isArray(books)) {
      console.log(chalk.yellow("Error: books.json is not an array."));
      return [];
    }
    return books;
  } catch (error) {
    if (error.code === "ENOENT") {
      fs.writeFileSync(FILE, "[]\n", "utf8");
      return [];
    }
    if (error.name === "SyntaxError") {
      console.log(chalk.yellow("Invalid books.json."));
      return [];
    }
    throw error;
  }
}

function saveBooks(books) {
  try {
    fs.writeFileSync(FILE, JSON.stringify(books, null, 2) + "\n", "utf8");
  } catch (error) {
    console.log(chalk.red("Error: Could not save books.json"));
    throw error;
  }
}

function addBook(book) {
  const books = loadBooks();
  let maxId = 0;
  books.forEach((book) => {
    if (typeof book.id === "number" && book.id > maxId) maxId = book.id;
  });
  const newBook = {
    id: maxId + 1,
    title: book.title,
    author: book.author,
    genre: book.genre,
    read: false,
  };
  books.push(newBook);
  saveBooks(books);
  return newBook;
}

function getUnreadBooks() {
  const books = loadBooks();
  return books.filter((book) => book.read === false);
}

function getBooksByGenre(genre) {
  const books = loadBooks();
  const genreLowCase = String(genre).toLowerCase();
  return books.filter(
    (book) => String(book.genre).toLowerCase() === genreLowCase,
  );
}

function markAsRead(id) {
  const books = loadBooks();
  const targetId = Number(id);
  let found = false;
  const updated = books.map((book) => {
    if (Number(book.id) === targetId) {
      found = true;
      return { ...book, read: true };
    }
    return book;
  });
  if (found) saveBooks(updated);
  return found;
}

function getTotalBooks() {
  return loadBooks().length;
}

function hasUnreadBooks() {
  return loadBooks().some((book) => book.read === false);
}

function printAllBooks() {
  const books = loadBooks();
  console.log("\nAll Books:");
  books.forEach((book) => {
    const color = book.read ? chalk.green : chalk.yellow;
    const status = book.read ? "READ" : "UNREAD";
    console.log(
      color(`${book.id}. `) +
        chalk.cyan(book.title) +
        color(` by ${book.author} (${book.genre}) ${status}`),
    );
  });
}

function printSummary() {
  const books = loadBooks();
  const total = books.length;
  const readCount = books.filter((book) => book.read === true).length;
  const unreadCount = total - readCount;
  console.log(chalk.bold("\n📊 SUMMARY 📊"));
  console.log(chalk.bold(`Total Books: ${total}`));
  console.log(chalk.bold(`Read: ${readCount}`));
  console.log(chalk.bold(`Unread: ${unreadCount}`));
}
module.exports = {
  loadBooks,
  saveBooks,
  addBook,
  getUnreadBooks,
  getBooksByGenre,
  markAsRead,
  getTotalBooks,
  hasUnreadBooks,
  printAllBooks,
  printSummary,
};

function printAllBooks() {
  const books = loadBooks();

  console.log("\nAll Books:");
  books.forEach((b) => {
    const color = b.read ? chalk.green : chalk.yellow;
    const status = b.read ? "✓ Read" : "⚠ Unread";

    console.log(
      color(`${b.id}. `) +
        chalk.cyan(b.title) +
        color(` by ${b.author} (${b.genre}) ${status}`),
    );
  });
}

function printSummary() {
  const books = loadBooks();
  const total = books.length;
  const readCount = books.filter((b) => b.read === true).length;
  const unreadCount = total - readCount;

  console.log(chalk.bold("\n📊 SUMMARY 📊"));
  console.log(chalk.bold(`Total Books: ${total}`));
  console.log(chalk.bold(`Read: ${readCount}`));
  console.log(chalk.bold(`Unread: ${unreadCount}`));
}

module.exports = {
  loadBooks,
  saveBooks,
  addBook,
  getUnreadBooks,
  getBooksByGenre,
  markAsRead,
  getTotalBooks,
  hasUnreadBooks,
  printAllBooks,
  printSummary,
};
