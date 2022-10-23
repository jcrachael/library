// Define library array and bookList
let myLibrary = [];


// Define the Book constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    // return book info
    this.info = function() {
        return title + ' by ' + author + ', ' + pages + ' pages, ' + read;
    }
    
}

function updateDisplay(newBook) {
     // update the display
     let bookList = document.getElementById('book-list');
     // set newBook indexNumber property to equal the index
     newBook.indexNumber = myLibrary.length - 1
     bookList.innerHTML += 
         `<li class="card" data-index-number="` + newBook.indexNumber + `">
             <span class="card-info">` + 
                 newBook.info() + 
             `</span>
             <span class="delete-book" >
                 <img 
                     src="remove.png" 
                     alt="Remove book" 
                     class="delete-book-icon" 
                     data-index-number="` + newBook.indexNumber + `" id="` + newBook.indexNumber + `">
             </span>
         </li>`;
}

function addBook() {
    // set variables for book properties
    let newTitle = document.getElementById('book-title').value;
    let newAuthor = document.getElementById('book-author').value;
    let newPages = document.getElementById('book-pages').value;
    // set read status depending on option selected
    let readYet = displayRadioValue();
    // create a new Book object with this new book's properties
    let newBook = new Book(newTitle, newAuthor, newPages, readYet);
    // add the new Book object to the myLibrary array
    myLibrary.push(newBook);
   
    // update display
    updateDisplay(newBook);


  
    
};

function deleteBook(book) {
     // get delete button
    
   
 
}

function displayRadioValue() {
    let ele = document.getElementsByName('read-yet');
    for (let i = 0; i < ele.length; i++) {
        if(ele[i].checked) {
            let readYet = ele[i].value;
            return readYet;
        }
    }
}


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
        modal.style.display = "none";
    }
    form.addEventListener('submit', handleForm);


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
