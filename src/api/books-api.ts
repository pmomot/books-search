import { ROUTES } from './routes';

export interface BookResponse {
    cover_i: number;
    has_fulltext: boolean;
    edition_count: number;
    title: string;
    first_publish_year: number;
    key: string;
    ia: string[];
    author_key: string[];
    public_scan_b: boolean;
    isbn: number[];
    author_name?: string[];
    language?: string[];
}

export class BooksApi {
    search (query: string) {
        return fetch(`${ROUTES.search}?q=${encodeURI(query)}`)
            .then(response => response.json())
            .then(({docs}) => docs.filter(doc => doc.author_name && doc.isbn));
    }
}
