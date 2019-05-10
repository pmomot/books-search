import { fromEvent, Subject } from 'rxjs';
import { BookModel, ImageSizes } from '../../models/book.model';
import { filter, map, takeUntil } from 'rxjs/operators';

export class BookSlideComponent extends HTMLElement {
    private readonly componentDestroy$ = new Subject();
    private lastImageSize: ImageSizes;
    private imageElement: HTMLElement;

    constructor (private book: BookModel) {
        super();
    }

    private getImageSize (windowSize) {
        if (windowSize < 320) {
            return ImageSizes.Small;
        } else if (windowSize < 600) {
            return ImageSizes.Medium;
        } else {
            return ImageSizes.Large;
        }
    }

    private addResizeListener () {
        console.log('add');
        fromEvent(window, 'resize').pipe(
            map(({target}) => this.getImageSize(target['innerWidth'])),
            filter(imageSize => imageSize !== this.lastImageSize),
            takeUntil(this.componentDestroy$)
        )
            .subscribe(imageSize => {
                console.log(imageSize);
                this.lastImageSize = imageSize;
                this.imageElement['src'] = this.book.buildImageUrl(imageSize);
            });
    }

    connectedCallback () {
        if (!this.book) {
            return;
        }
        this.classList.add('slide');
        this.lastImageSize = this.getImageSize(window.innerWidth);
        this.innerHTML = `
            <img src="${this.book.buildImageUrl(this.lastImageSize)}" alt="${this.book.title} cover">
            <div class="slide__details">
                <div><span class="slide__label">Title</span>: <span class="slide__value">${this.book.title}</span></div>
                <div><span class="slide__label">Authors</span>: <span class="slide__value">${this.book.authors}</span></div>
                <div><span class="slide__label">Languages</span>: <span class="slide__value">${this.book.languages}</span></div>
            </div>
        `;
        this.imageElement = this.querySelector('img');
        this.addResizeListener();
    }

    disconnectedCallback () {
        this.componentDestroy$.next();
        this.componentDestroy$.complete();
    }
}
