import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SubmitComponent } from './submit/submit.component';
import { TimeAgoComponent } from './time-ago/time-ago.component';

export function defineComponents () {
    customElements.define('app-header', HeaderComponent);
    customElements.define('app-search-bar', SearchBarComponent);
    customElements.define('app-submit', SubmitComponent);
    customElements.define('app-time-ago', TimeAgoComponent);
}
