import { BookResponse } from '../api/books-api';
import { ROUTES } from '../api/routes';

export class BookModel {
    readonly title: string;
    readonly authors: string;
    readonly languages: string;
    readonly imageUrl: string;

    constructor (book: BookResponse) {
        this.title = book.title;
        this.authors = book.author_name.join(', ');
        this.languages = book.language? book.language.join(', ') : '';
        const isbn = book.isbn[0];
        this.imageUrl = `${ROUTES.image}/${isbn}-L.jpg`;
    }
}
