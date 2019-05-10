import { BookResponse } from '../api/books-api';
import { ROUTES } from '../api/routes';

export enum ImageSizes {
    Small = 'S',
    Medium = 'M',
    Large = 'L'
}

export class BookModel {
    private readonly isbn: number;
    readonly title: string;
    readonly authors: string;
    readonly languages: string;

    constructor (book: BookResponse) {
        this.title = book.title;
        this.authors = book.author_name.join(', ');
        this.languages = book.language? book.language.join(', ') : '';
        this.isbn = book.isbn[0];
    }

    buildImageUrl (size: ImageSizes) {
        return `${ROUTES.image}/${this.isbn}-${size}.jpg`;
    }
}
