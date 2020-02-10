class Book {
    constructor(title, author, booktype) {
        this.title = title;
        this.author = author;
        this.booktype = booktype;
    }
}

class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }   else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
     }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(booktype){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.booktype === booktype){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

class UI {
    static displayBooks() {

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));

    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.booktype}</td>
        <td><a href="#" class="btn btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //3 sec alert remove
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#booktype').value = '';
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const booktype = document.querySelector('#booktype').value;

    //validate
    if (title === '' || author === '' || booktype === '') {
        UI.showAlert('Please Fill Fields', 'danger');
    } else {

        const book = new Book(title, author, booktype);

        //Add book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        //Success msg
        UI.showAlert('Book Added', 'success')

        //Clear fields
        UI.clearFields();
    }
});

//Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // remove from UI
    UI.deleteBook(e.target)

    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book Removed', 'success')
});