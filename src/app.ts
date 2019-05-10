import { defineComponents } from './components';
import { store } from './store';
import { Slider } from './utils/slider';
import { BookSlideComponent } from './components';
import { BookModel } from './models/book.model';

export class App {
    private readonly booksElement = document.getElementById('books');
    private slider: Slider;

    constructor () {
        defineComponents();
        console.log('app started');

        store.books$.subscribe(books => this.booksListUpdated(books));
    }

    private booksListUpdated (books: BookModel[]) {
        if (this.slider) {
            this.slider.destroy();
            this.slider = null;
        }

        this.booksElement.innerHTML = '';
        books.forEach(book => {
            const slide = new BookSlideComponent(book);
            this.booksElement.appendChild(slide);
        });

        this.slider = new Slider();
    }
}
