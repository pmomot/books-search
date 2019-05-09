import { defineComponents } from './components';
import { store } from './store';

export class App {
    readonly booksElement = document.getElementById('books');

    constructor () {
        defineComponents();
        console.log('app started');

        // TODO temp
        store.books$.subscribe(books => {
            const elements = document.createElement('div');
            this.booksElement.innerHTML = '';
            books.forEach(book => {
                const element = document.createElement('div');
                element.classList.add('card');
                element.innerHTML += `<div class="card__image" style="background-image: url(${book.imageUrl})"></div>`;
                element.innerHTML += `<div><span class="card__label">Title</span>: <span class="card__value">${book.title}</span></div>`;
                element.innerHTML += `<div><span class="card__label">Authors</span>: <span class="card__value">${book.authors}</span></div>`;
                element.innerHTML += `<div><span class="card__label">Languages</span>: <span class="card__value">${book.languages}</span></div>`;
                elements.appendChild(element);
            });
            this.booksElement.appendChild(elements);
        });
    }
}
