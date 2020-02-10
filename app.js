class Book {
    constructor(title, author, booktype) {
        this.title = title;
        this.author = author;
        this.booktype = booktype;
    }
}

class UI {
    static displayBooks() {
        const storedBooks = [{
                title: 'Hola',
                author: 'Hiram',
                booktype: 'anime'
            },
            {
                title: 'Cuentos',
                author: 'Alexandra',
                booktype: 'Infantil'
            }
        ];

        const books = storedBooks;

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

        //Clear fields
        UI.clearFields();
    }
});

//Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)
});