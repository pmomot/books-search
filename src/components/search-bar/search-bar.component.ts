import { fromEvent, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { store} from '../../store';
import { speechRecognition } from '../../utils/speech-recognition'

export class SearchBarComponent extends HTMLElement {
    private componentDestroy$ = new Subject();
    private inputElement;
    private submitButton;

    constructor () {
        super();
    }

    private speechRecognitionHandler () {
        fromEvent(this.querySelector('.btn-mic'), 'click').pipe(
            switchMap(() => speechRecognition()),
            takeUntil(this.componentDestroy$)
        )
            .subscribe(text => {
                this.inputElement.value = text;
                this.submitButton.click();
            });
    }

    private submitEventHandler () {
        fromEvent(this.submitButton, 'click').pipe(
            takeUntil(this.componentDestroy$)
        )
            .subscribe(() => store.initSearch$.next(this.inputElement.value.trim()));
    }

    private addEventListeners () {
        this.speechRecognitionHandler();
        this.submitEventHandler();
    }

    connectedCallback () {
        // TODO remove hardcoded value
        this.innerHTML = `
            <div class="search-bar-inner">
                <input type="text" placeholder="Search" value="lord of the rings"/>
                <button class="btn-mic">Mic</button>
                <button class="btn-submit">Search</button>
            </div.search-bar-inner>
        `;
        this.inputElement = this.querySelector('input');
        this.submitButton = this.querySelector('.btn-submit');
        this.addEventListeners();
    }

    disconnectedCallback () {
        this.componentDestroy$.next();
        this.componentDestroy$.complete();
    }
}
