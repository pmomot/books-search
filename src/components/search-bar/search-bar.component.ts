import { fromEvent } from 'rxjs';
import { store} from '../../store';
// import { speechRecognition } from '../../utils/speech-recognition'

export class SearchBarComponent extends HTMLElement {
    private inputElement;

    constructor () {
        super();
    }

    private addEventListeners () {
        // fromEvent(this.querySelector('.btn-btn-mic'), 'click')
        //     .subscribe(() => {
        //         store.initSearch$.next(this.inputElement.value.trim())
        //     });
        fromEvent(this.querySelector('.btn-submit'), 'click')
            .subscribe(() => store.initSearch$.next(this.inputElement.value.trim()));
    }

    connectedCallback () {
        this.innerHTML = `
            <div class="search-bar-inner">
                <input type="text" placeholder="Search"/>
                <button class="btn-mic">Mic</button>
                <button class="btn-submit">Search</button>
            </div.search-bar-inner>
        `;
        this.inputElement = this.querySelector('input');
        this.addEventListeners();
    }
}
