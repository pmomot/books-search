import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BookSlideComponent } from '..';
import { BookModel } from '../../models/book.model';
import { Slider } from '../../utils/slider';
import { store } from '../../store';

export class BooksComponent extends HTMLElement {
    private readonly componentDestroy$ = new Subject();
    private sliderInner: HTMLElement;
    private slider: Slider;

    constructor () {
        super();
    }

    private booksListUpdated (books: BookModel[]) {
        if (this.slider) {
            this.slider.destroy();
            this.slider = null;
        }

        this.sliderInner.innerHTML = '';
        books.forEach(book => {
            const slide = new BookSlideComponent(book);
            this.sliderInner.appendChild(slide);
        });

        if (books.length > 2) {
            this.slider = new Slider();
        }
    }

    connectedCallback () {
        this.sliderInner = this.querySelector('.slider-inner');
        store.books$.pipe(
            takeUntil(this.componentDestroy$)
        )
            .subscribe(books => this.booksListUpdated(books));
    }

    disconnectedCallback () {
        this.componentDestroy$.next();
        this.componentDestroy$.complete();
    }
}
