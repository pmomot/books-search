import { defineComponents } from './components';

export class App {
    constructor () {
        defineComponents();
        console.log('app started');
    }
}
