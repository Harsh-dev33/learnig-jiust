// Store all books here
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add method to toggle read status
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

// Add new book to the array
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

// Display all books on the page
function displayBooks() {
  const library = document.querySelector("#library");
  library.innerHTML = ""; // clear old content

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.setAttribute("data-id", book.id);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "✅ Read" : "❌ Not Read"}</p>
      <button class="toggle">Toggle Read</button>
      <button class="remove">Remove</button>
    `;

    library.appendChild(card);
  });
}

// Remove book
function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) myLibrary.splice(index, 1);
  displayBooks();
}

// Toggle read status
function toggleBookRead(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) book.toggleRead();
  displayBooks();
}

// --- FORM & EVENT HANDLERS ---

const form = document.querySelector("#bookForm");
const newBookBtn = document.querySelector("#newBookBtn");

// Show/Hide form
newBookBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  addBookToLibrary(title, author, pages, read);
  form.reset();
  form.classList.add("hidden");
});

// Handle remove and toggle buttons
document.querySelector("#library").addEventListener("click", (e) => {
  const id = e.target.parentNode.getAttribute("data-id");
  if (e.target.classList.contains("remove")) removeBook(id);
  if (e.target.classList.contains("toggle")) toggleBookRead(id);
});

// Add some sample books to see the display
addBookToLibrary("Harry Potter", "J.K. Rowling", 320, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
