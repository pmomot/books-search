import { interval } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { getTimeDiffString } from '../../utils/time';
import { store} from '../../store';

export class TimeAgoComponent extends HTMLElement {
    timeAgo$ = interval(1000).pipe(
        switchMap(() => store.lastSearchTime$),
        filter(time => !!time),
        map(time => getTimeDiffString(new Date(), time)),
        filter(time => !!time)
    );

    constructor() {
        super();
    }

    connectedCallback () {
        this.timeAgo$.subscribe(timeAgo => this.innerText = `Last search performed: ${timeAgo}`);
    }
}
