const myLibrary = [];

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return read === 0 ? `${this.title} by ${this.author}, ${this.pages} pages, not read yet` : `${this.title} by ${this.author}, ${this.pages} pages, already read`; 
    }
}

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const readBinary = read === 'yes' ? 1 : 0;
    const newBook = new Book(id, title, author, pages, readBinary);
    myLibrary.unshift(newBook);
    updateCards();
}

function updateCards() {
    myLibrary.forEach(book => {
        let select = document.querySelector(`[data-uuid="${book.id}"]`);

        if (select === null) {
            let card = document.createElement('div');
            let title = document.createElement('p');
            let author = document.createElement('p');
            let pages = document.createElement('p');
            let read = document.createElement('p');
            let removeBtn = document.createElement('button');
            let readBtn = document.createElement('button');


            title.textContent = `Title: ${book.title}`;
            author.textContent = `Author: ${book.author}`;
            pages.textContent = `Pages: ${book.pages}`;
            read.textContent = book.read === 0 ? 'not read' : 'read';
            read.className = "read";
            removeBtn.textContent = 'Remove';
            removeBtn.dataset.bookId = book.id;
            removeBtn.className = "removeBtn";
            readBtn.textContent = book.read === 0 ? 'read' : 'not read';
            readBtn.className = "readBtn";

            removeBtn.addEventListener('click', (e) => {
                const id = e.target.dataset.bookId;
                e.target.parentElement.remove();
                removeBook(id);
            });

            readBtn.addEventListener('click', (e) => {
                    updateRead(e);
            });
            
            card.className = "card";
            card.dataset.uuid = book.id;
            card.appendChild(title);
            card.appendChild(author);
            card.appendChild(pages);
            card.appendChild(read);
            card.appendChild(removeBtn);
            card.appendChild(readBtn);

            containerCards.prepend(card);       
            
        }   
    });
}

function removeBook(id) {
    myLibrary.forEach((book, index) => {
        if (book.id === id) myLibrary.splice(index, 1);
    });
}

function updateRead(e) {
    const readP = e.target.parentElement.querySelector('.read');
    const readBtn = e.target.parentElement.querySelector('.readBtn');
    
    readP.textContent = readP.textContent === 'read' ? 'not read' : 'read';
    readBtn.textContent = readBtn.textContent === 'read' ? 'not read' : 'read';
    
    let id = e.target.parentElement.dataset.uuid;
    const bookToUpdate = myLibrary.find(book => book.id === id);
    if (bookToUpdate) {
        bookToUpdate.read = bookToUpdate.read === 0 ? 1 : 0;
    } else {
        console.log("book not found");
    }
    
}


const testBook1 = new Book(crypto.randomUUID(), 'Puchatek', 'Anders', 54, 0);
const testBook2 = new Book(crypto.randomUUID(), 'Pony', 'Henry', 150, 1);
const testBook3 = new Book(crypto.randomUUID(), 'Bajki robotow', 'Lem', 454, 1);
const testBook4 = new Book(crypto.randomUUID(), 'Toy Story', 'Kate', 99, 0);

myLibrary.push(testBook1);
myLibrary.push(testBook2);
myLibrary.push(testBook3);
myLibrary.push(testBook4);

const containerCards = document.querySelector('.container');

updateCards();

const showBtn = document.querySelector(`#newBook`);
const dialog = document.querySelector(`#dialog`);
const closeBtn = document.querySelector(`#cancel`);
const submitBtn = document.querySelector('#add');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

showBtn.addEventListener('click', () => {
    dialog.showModal();
});

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close("");
});

dialog.addEventListener('close', (e) => {
    console.log(dialog.returnValue);
    if (dialog.returnValue == 'submit') {
        addBookToLibrary(title.value, author.value, pages.value, read.value);
        title.value="";
        author.value="";
        pages.value="";
        read.value="";
    }
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close('submit');
});