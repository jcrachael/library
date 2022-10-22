// Define library array
let myLibrary = [];

// Define the Book constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return title + ' by ' + author + ', ' + pages + ' pages, ' + read;
    }
}

// Add book to library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Display books
function displayBooks() {
    let bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        bookList.innerHTML += '<li class="card">' + myLibrary[i].info() + '</li>';
    }
}


// testing books
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', 295, 'not read yet');

addBookToLibrary(theHobbit);





// DOMContentLoaded

document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById('myModal');
    const newBookBtn = document.getElementById('new-book-btn');
    const span = document.getElementById('close-modal');
    const addBookBtn = document.getElementById('add-book-btn');
    const form = document.getElementById('form');
    function handleForm(event) {
        event.preventDefault();
    }
    form.addEventListener('submit', handleForm);
    // print books to page
    displayBooks();

    // Open model when "New book" button clicked
    newBookBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });
    span.addEventListener("click", function() {
        modal.style.display = "none";
    });
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Add new book to library when "Add book" button clicked
    addBookBtn.addEventListener("click", function() {
        let newTitle = document.getElementById('book-title').value;
        let newAuthor = document.getElementById('book-author').value;
        let newPages = document.getElementById('book-pages').value;
        let readYet = document.getElementById('book-read').value;
        let newBook = new Book(newTitle, newAuthor, newPages, readYet);
        addBookToLibrary(newBook);
  
        displayBooks();
    });

});
