// Book class: represents a book
class Book {
    // set constructor
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// UI class: handle UI tasks
class UI {
    // define static method
    static displayBooks() {
        // hard-coded array of stored books for pre-storage display
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                pages: '275',
                read: 'read'
            },
            {
                title: 'Book Two',
                author: 'Celery Smith',
                pages: '369',
                read: 'notread'
            }
        ];

        const books = StoredBooks;

        // loop through all the books in the array, then call addBookToList method
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        // get book-list 
        const list = document.getElementById('book-list');
        // add a row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read}</td>
            <td><a href="#" class="btn-delete delete">x</a></td>
        `;
        // append row to our book-list
        list.appendChild(row);
    }

    // delete book
    static deleteBook(el) {
        // if the element clicked on contains the class 'delete'
        if (el.classList.contains('delete')) {
            // delete parent row
            el.parentElement.parentElement.remove();
        }
    }


    // clear form fields
    static clearFields() {
        document.getElementById('book-title').value = '';
        document.getElementById('book-author').value = '';
        document.getElementById('book-pages').value = '';
        clearRadioValue();
    }
}

// check radio input
function displayRadioValue() {
    let ele = document.getElementsByName('read-yet');
    for (let i = 0; i < ele.length; i++) {
        if(ele[i].checked) {
            let read = ele[i].value;
            return read;
        }
    }
}

function clearRadioValue() {
    let ele = document.getElementsByName('read-yet');
    for (let i = 0; i < ele.length; i++) {
        ele[i].checked = false;
    }
}

// Store class: handles storage >>> for later

// Event: Display Books as soon as DOM loaded
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a book
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    // prevent default action
    e.preventDefault();
    modal.style.display = "none";
    // get form values
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = document.getElementById('book-pages').value;
    const read = displayRadioValue();

    // instantiate a book
    const book = new Book(title, author, pages, read);

    // add book to list
    UI.addBookToList(book);

    // Clear fields
    UI.clearFields();
});

// Open modal when "New book" button clicked
const modal = document.getElementById('myModal');
const newBookBtn = document.getElementById('new-book-btn');
const span = document.getElementById('close-modal');

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

// Event: Delete a book
// use event propagation to select a parent element and target a child inside
document.getElementById('book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
})









