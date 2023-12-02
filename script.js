const popup = document.getElementById("popup-container");
const form = document.getElementById("form");
const addButton = document.getElementById("addButton");
const overlay = document.getElementById("overlay");
const bookShelf = document.getElementById("bookShelf");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function getBook() {
  const getTitle = document.getElementById("title").value;
  const getAuthor = document.getElementById("author").value;
  const getPage = document.getElementById("page").value;
  const getRead = document.getElementById("isRead").checked;

  return new Book(getTitle, getAuthor, getPage, getRead);
}

function addBook(book) {
  myLibrary.push(book);
}

function bookCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("h1");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readStatus = document.createElement("button");
  const deleteButton = document.createElement("button");

  bookCard.classList.add("bookCard");
  readStatus.classList.add("readStatus");

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  readStatus.textContent = book.read;
  deleteButton.textContent = "Delete Book";

  if (book.read) {
    readStatus.textContent = "finished";
    readStatus.classList.add("read");
  } else {
    readStatus.textContent = "in progress";
    readStatus.classList.add("notRead");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readStatus);
  bookCard.appendChild(deleteButton);
  bookShelf.appendChild(bookCard);

  readStatus.addEventListener("click", function () {
    book.read = !book.read;

    if (book.read) {
      readStatus.textContent = "finished";
      readStatus.classList.add("read");
      readStatus.classList.remove("notRead");
    } else {
      readStatus.textContent = "in progress";
      readStatus.classList.add("notRead");
      readStatus.classList.remove("read");
    }
  });

  deleteButton.addEventListener("click", function () {
    bookShelf.removeChild(bookCard);
    myLibrary.splice(myLibrary.indexOf(book), 1);
    console.log(myLibrary);
  });

  console.log(myLibrary);
}

function sampleBook() {
  const atomicHabits = new Book("Atomic Habits", "James Clear", 320, true);
  addBook(atomicHabits);
  bookCard(atomicHabits);
}

window.addEventListener("load", sampleBook);

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("page").value = "";
  document.getElementById("isRead").checked = false;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const newBook = getBook();
  addBook(newBook);
  bookCard(newBook);
  clearForm();
  popup.classList.remove("active");
  overlay.classList.remove("active");
});

addButton.addEventListener("click", function () {
  popup.classList.add("active");
  overlay.classList.add("active");
});

window.onclick = function (event) {
  if (event.target == overlay) {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  }
};

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  }
});
