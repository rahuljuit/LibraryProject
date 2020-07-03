console.log('This is the Index.js file');
showBooks();

let table = document.getElementById('table');
table.style.overflow = 'auto';
table.style.height = '350px';

// implementing the showbooks function
function showBooks() {

    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }

    let addRow = "";
    bookObj.forEach(function (element, index) {
        addRow += `<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                  </tr>`;
    });
    let tableBody = document.getElementById('tableBody');
    if (bookObj.length == 0) {
        tableBody.innerHTML = "";
    } else {
        tableBody.innerHTML = addRow;
    }
}

// implementing the deletebook function
function deleteBook(index) {
    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }
    let array = JSON.stringify(bookObj);
    console.log(`array: ` + array[index]['author']);
    bookObj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookObj));
    let message = document.getElementById('message');
    let boldText = 'Deleted';
    message.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>${boldText}: </strong> Your book has been deleted
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(() => {
        message.innerHTML = "";
    }, 3000);
    showBooks();
}

// constructor

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}


function Display() {

}

// implementing the adding function
Display.prototype.add = function (book) {
    console.log("Book has been added to library");

    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }

    bookObj.push(book);
    localStorage.setItem('books', JSON.stringify(bookObj));
    let tableBody = document.getElementById('tableBody');
    showBooks();

}

// implementing the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

// implementing the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 3 || book.author.length < 3) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type, displaymsg) {
    let message = document.getElementById('message');
    if (type === 'success') {
        boldText = 'Success';
    } else {
        boldText = 'Error';

    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
   <strong>${boldText}:</strong> ${displaymsg}
   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
     <span aria-hidden="true">&times;</span>
   </button>
 </div>`;

    setTimeout(() => {
        message.innerHTML = '';
    }, 2500);

}


//add submit event listener to library form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You have submitted library form");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let biography = document.getElementById('biography');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (biography.checked) {
        type = biography.value;
    }

    book = new Book(name, author, type);
    console.log(book);



    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', "Your book has been successfully added!!");
    }
    else {
        display.show('danger', "Sorry, You cannot add your book!!");
    }


    e.preventDefault();
}