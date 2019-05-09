import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BooksApi } from './api/books-api';
import { BookModel } from './models/book.model';

export class Store {
    readonly initSearch$ = new Subject<string>();
    readonly lastSearchTime$: Observable<Date> = this.initSearch$.pipe(
        map(() => new Date()),
        shareReplay(1)
    );
    readonly books$ = new BehaviorSubject<BookModel[]>([]);

    constructor (private booksApi: BooksApi) {
        this.initSearch$.subscribe(query => {
            this.booksApi.search(query)
                .then(list => list.map(book => new BookModel(book)))
                .then(list => this.books$.next(list))
        });
    }

}

export const store = new Store(new BooksApi());
