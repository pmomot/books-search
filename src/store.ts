import { Observable, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { BooksApi } from './api/books-api';
import { BookModel } from './models/book.model';

export class Store {
    readonly initSearch$ = new Subject<string>();
    readonly lastSearchTime$: Observable<Date> = this.initSearch$.pipe(
        map(() => new Date()),
        shareReplay(1)
    );
    readonly books$ = this.initSearch$.pipe(
        switchMap(query => this.booksApi.search(query)),
        map(list => list.map(book => new BookModel(book))),
    );

    constructor (private booksApi: BooksApi) {}

}

export const store = new Store(new BooksApi());
