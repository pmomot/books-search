export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback () {
        this.innerHTML = `<header><div class="header-inner">Books search</div></header>`;
    }
}
