import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

import { getFirebaseConfig } from "./firebase-config";
import "/src/index.css";
import logo from "./logo.png";

// This  app's Firebase configuration
const firebaseConfig = getFirebaseConfig(getFirebaseConfig);

// Initialise Firebase
const app = initializeApp(firebaseConfig);

// Initialise analytics
const analytics = getAnalytics(app);

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
        title: "The Hobbit",
        author: "J.R.R. Tolkein",
        pages: "310",
        read: "read",
      },
      {
        title: "Before They Are Hanged",
        author: "Joe Abercrombie",
        pages: "441",
        read: "not-read",
      },
    ];

    const books = StoredBooks;

    // loop through all the books in the array, then call addBookToList method
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    // get book-list
    const list = document.getElementById("book-list");
    // add a row
    const row = document.createElement("tr");

    // if book has been read, append row with 'read' class
    if (book.read === "read") {
      row.classList.add("read");
    }

    if (row.classList.contains("read")) {
      row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>
                <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                </label>
            </td> 
            <td><a href="#" class="btn-delete delete">x</a></td>`;
    } else {
      row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td>
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </td> 
                <td><a href="#" class="btn-delete delete">x</a></td>`;
    }

    // append row to our book-list
    list.appendChild(row);
  }

  // delete book
  static deleteBook(el) {
    // if the element clicked on contains the class 'delete'
    if (el.classList.contains("delete")) {
      // delete parent row
      el.parentElement.parentElement.remove();
    }
  }

  // toggle book class
  static toggleBookClass(el) {
    // define table row parent element
    let parentElement = el.parentElement.parentElement.parentElement;

    if (el.checked) {
      parentElement.classList.add("read");
      // add read class to parent element
    } else {
      // remove read class from parent element
      parentElement.classList.remove("read");
    }
  }

  // clear form fields
  static clearFields() {
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-pages").value = "";
    clearRadioValue();
  }
}

// check radio input
function displayRadioValue() {
  let ele = document.getElementsByName("read-yet");
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      let read = ele[i].value;
      return read;
    }
  }
}

// clear radio input
function clearRadioValue() {
  let ele = document.getElementsByName("read-yet");
  for (let i = 0; i < ele.length; i++) {
    ele[i].checked = false;
  }
}

// Store class: handles storage >>> for later

// Event: Display Books as soon as DOM loaded
document.getElementById("logo").setAttribute("src", logo);
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a book
// First, open modal when "New book" button clicked
const modal = document.getElementById("myModal");
const newBookBtn = document.getElementById("new-book-btn");
const span = document.getElementById("close-modal");
newBookBtn.addEventListener("click", function () {
  modal.style.display = "block";
});
span.addEventListener("click", function () {
  modal.style.display = "none";
});
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Then, listen for form submission and on submit, create new book with the form
// inputs, and add it to the book list, then clear the form fields
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();
  modal.style.display = "none";
  // get form values
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = document.getElementById("book-pages").value;
  const read = displayRadioValue();
  // instantiate a book
  const book = new Book(title, author, pages, read);
  // add book to list
  UI.addBookToList(book);
  // Clear fields
  UI.clearFields();
});

// Event: Delete a book
// use event propagation to select a parent element of the child target
document.getElementById("book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});

// Event: Toggle 'read' Class slider
document.getElementById("book-list").addEventListener("click", (e) => {
  // toggle book class with slider
  UI.toggleBookClass(e.target);
});
