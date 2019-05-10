import { BookModel } from '../../models/book.model';

export class BookSlideComponent extends HTMLElement {

    constructor (private book: BookModel) {
        super();
    }

    connectedCallback () {
        if (!this.book) {
            return;
        }
        this.classList.add('slide');
        this.style.backgroundImage = `url(${this.book.imageUrl})`;
        this.innerHTML = `
            <div class="slide__details">
                <div><span class="slide__label">Title</span>: <span class="slide__value">${this.book.title}</span></div>
                <div><span class="slide__label">Authors</span>: <span class="slide__value">${this.book.authors}</span></div>
                <div><span class="slide__label">Languages</span>: <span class="slide__value">${this.book.languages}</span></div>
            </div>
        `;
    }
}
