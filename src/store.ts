import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export class Store {
    initSearch$ = new Subject<void>();
    lastSearchTime$: Observable<Date> = this.initSearch$.pipe(
        map(() => new Date()),
        shareReplay(1)
    );
}

export const store = new Store();
