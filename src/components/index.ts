import { BookSlideComponent } from './book-slide/book-slide.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TimeAgoComponent } from './time-ago/time-ago.component';

export function defineComponents () {
    customElements.define('app-book-slide', BookSlideComponent);
    customElements.define('app-header', HeaderComponent);
    customElements.define('app-search-bar', SearchBarComponent);
    customElements.define('app-time-ago', TimeAgoComponent);
}

export {
    BookSlideComponent
};