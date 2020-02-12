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