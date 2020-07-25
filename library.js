

const addBookBtn = document.querySelector("#add-new-book");
const booksContainer = document.querySelector("#books-container");
const addBookForm = document.querySelector("#add-new-book-form");

addBookBtn.addEventListener("click", bringNewbookForm);

class Book {
    constructor(title, author, numpages, read) {
        this.title = title;
        this.author = author;
        this.numpages = numpages;
        this.read = read;
    }
    info() {
        let info = title + " by " + author + ", " + numpages + ", " + read;
        return info

    }

}
bookardo = new Book("An title", "anAuthor", "220", "Yes");

let books = [bookardo]


function addBooks(book) {
    books.push(book);
    render();
}

function render() {

    booksContainer.innerHTML = '';
    books.forEach((book, index) => {
        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("data", `${index}`);
        bookDiv.classList.add("book-card");
        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = book.title;
        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = "Author: " + book.author;
        const numpages = document.createElement("p");
        numpages.classList.add("numpages");
        numpages.textContent = "Num Of pages: " + book.numpages;
        const read = document.createElement("p");
        read.classList.add("read");
        read.textContent = "Read: " + book.read;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.setAttribute("type", "button");
        removeBtn.classList.add("remove-btn");

        let readBtn = document.createElement("button");

        book.read === "Yes" ? readBtn.textContent = "Mark as unread" : readBtn.textContent = "Mark as read";
        readBtn.setAttribute("type", "button");
        readBtn.classList.add("read-btn");



        removeBtn.addEventListener("click", removeCard);
        readBtn.addEventListener("click", () => {
            book.read === "Yes" ? book.read = "No" : book.read = "Yes";
            render();

        });

        bookDiv.appendChild(removeBtn);
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(numpages);
        bookDiv.appendChild(read);
        bookDiv.appendChild(readBtn);

        booksContainer.appendChild(bookDiv);

    });
}

function removeCard() {
    books.splice(this.parentElement.getAttribute("data"), 1);
    render();

}

function bringNewbookForm() {

    addBookBtn.disabled = true;
    addBookForm.style.display = "flex";


}

function addNewBook() {
    const titleElement = addBookForm.elements["title-input"]
    const authorElement = addBookForm.elements["author-input"]
    const pagesElement = addBookForm.elements["pages-input"]
    const readElement = addBookForm.elements["read-input-yes"]
    let title = titleElement.value
    let author = authorElement.value
    let pages = pagesElement.value
    if (title == "" || author == "" || pages == "") {
        document.getElementById("alert").style.display = "flex"
        document.querySelector("#finishBtn").disabled = true;
    }
    else {
        let readValue;
        readElement.checked ? readValue = "Yes" :
            readValue = "No";
        titleElement.value = ""
        authorElement.value = ""
        pagesElement.value = ""
        readElement.checked = true;
        let aBook = new Book(title, author, pages, readValue)
        addBooks(aBook);
    }


}

function removeForm() {
    addBookForm.style.display = "none";
    addBookBtn.disabled = false;


}
document.querySelector("#addBtn").addEventListener("click", addNewBook);
document.querySelector("#finishBtn").addEventListener("click", removeForm);
document.querySelector("#alertBtn").addEventListener("click", (e) => {

    document.getElementById("alert").style.display = "none";
    document.querySelector("#finishBtn").disabled = false;
});

render();

