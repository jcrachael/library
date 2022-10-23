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

// Display books
function displayBooks() {
    let bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    // for each book in the length of my library 
    for (let i = 0; i < myLibrary.length; i++) {
        // print that book
        bookList.innerHTML += 
        `<li class="card" data-index-number="` + i + `">
            <span class="card-info">` + 
                myLibrary[i].info() + 
            `</span>
            <span class="delete-book" >
                <img 
                    src="remove.png" 
                    alt="Remove book" 
                    class="delete-book-icon" 
                    data-index-number="` + i + `" id="` + i + `">
            </span>
        </li>`;
    } 
}

function addBook() {
    // set variables for book properties
    let newTitle = document.getElementById('book-title').value;
    let newAuthor = document.getElementById('book-author').value;
    let newPages = document.getElementById('book-pages').value;
    let readYet = document.getElementById('read-yet');
    // set read status depending on option selected
    let readStatus;
    if (readYet.value === 'read') {
        readStatus = 'read';
    } else if (readYet.value === 'not-read') {
        readStatus = 'not read yet';
    }
    // create a new Book object with this new book's properties
    let newBook = new Book(newTitle, newAuthor, newPages, readStatus);
    // add the new Book object to the myLibrary array
    myLibrary.push(newBook);
    // update the display
    displayBooks();
};


// DOMContentLoaded

document.addEventListener('DOMContentLoaded', (event) => {

    // get variables 
    const modal = document.getElementById('myModal');
    const newBookBtn = document.getElementById('new-book-btn');
    const span = document.getElementById('close-modal');
    const addBookBtn = document.getElementById('add-book-btn');
    const form = document.getElementById('form');

    // prevent form submission refreshing page
    function handleForm(event) {
        event.preventDefault();
    }
    form.addEventListener('submit', handleForm);

    // print books to page
    displayBooks();

    // Open modal when "New book" button clicked
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
    addBookBtn.addEventListener("click", addBook);

 

});
