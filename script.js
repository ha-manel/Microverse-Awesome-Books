function Book(title, author) {
  this.title = title;
  this.author = author;
}

let booksArray = [];
const storage = window.localStorage;
const booksDiv = document.querySelector('.books');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const addBook = document.querySelector('#add-book');

function displayBooks() {
  booksArray = JSON.parse(storage.getItem('books'));
  if (booksArray) {
    booksArray.forEach((book) => {
      const bookContainer = document.createElement('div');
      bookContainer.className = 'book-container';
      bookContainer.innerHTML = `<p>${book.title}</p><p>${book.author}</p><button id="remove-book" onclick="removeBook(this)">Remove</button><hr>`;
      booksDiv.appendChild(bookContainer);
    });
  }
}

displayBooks();

function removeBook(element) {
  booksArray = JSON.parse(storage.getItem('books'));
  booksArray.splice(booksArray.findIndex((x) => x.author === element.previousSibling.innerText
    && x.title === element.previousSibling.previousSibling.innerText), 1);
  storage.setItem('books', JSON.stringify(booksArray));
  booksDiv.innerHTML = '';

  displayBooks();
}

addBook.addEventListener('click', (e) => {
  e.preventDefault();
  const newBook = new Book(titleInput.value, authorInput.value);
  booksArray = JSON.parse(storage.getItem('books'));
  if (!booksArray) {
    booksArray = [];
  }
  booksArray.push(newBook);
  storage.setItem('books', JSON.stringify(booksArray));
  const bookContainer = document.createElement('div');
  bookContainer.className = 'book-container';
  bookContainer.innerHTML = `<p>${newBook.title}</p><p>${newBook.author}</p><button id="remove-book" onclick="removeBook(this)">Remove</button><hr>`;
  booksDiv.appendChild(bookContainer);

  titleInput.value = '';
  authorInput.value = '';
});