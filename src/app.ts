import { defineComponents } from './components';
import { store } from './store';
import { Slider } from './utils/slider';

export class App {
    private readonly booksElement = document.getElementById('books');
    private slider: Slider;

    constructor () {
        defineComponents();
        console.log('app started');

        // TODO temp
        store.books$.subscribe(books => {
            if (this.slider) {
                this.slider.destroy();
                this.slider = null;
            }

            this.booksElement.innerHTML = '';
            books.forEach(book => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                slide.style.backgroundImage = `url(${book.imageUrl})`;
                const details = document.createElement('div');
                details.classList.add('slide__details');
                details.innerHTML += `<div><span class="slide__label">Title</span>: <span class="slide__value">${book.title}</span></div>`;
                details.innerHTML += `<div><span class="slide__label">Authors</span>: <span class="slide__value">${book.authors}</span></div>`;
                details.innerHTML += `<div><span class="slide__label">Languages</span>: <span class="slide__value">${book.languages}</span></div>`;
                slide.appendChild(details);
                this.booksElement.appendChild(slide);
            });

            this.slider = new Slider();
        });
    }
}
