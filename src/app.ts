import { defineComponents } from './components';
import { store } from './store';
import { map } from 'rxjs/operators';

export class App {
    searchResults$ = store.initSearch$.pipe(
        map(() => {
            fetch('https://openlibrary.org/search.json?q=the+lord+of+the+rings')
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(JSON.stringify(myJson));
                });
        })
    );

    constructor () {
        defineComponents();
        this.searchResults$.subscribe();
        console.log('app started');
    }
}
