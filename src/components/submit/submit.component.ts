import { fromEvent } from 'rxjs';
import { store} from '../../store';

export class SubmitComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback () {
        this.innerHTML = `<button>test</button>`;
        fromEvent(this.firstChild, 'click').subscribe(() => store.initSearch$.next('the lord of the rings'));
    }
}
