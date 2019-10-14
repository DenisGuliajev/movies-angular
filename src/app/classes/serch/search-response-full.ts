import { Movie } from '../movies/movie';
import { SearchResponseInterface } from './search-response.interface';

export class SearchResponseFull implements SearchResponseInterface {
  Response: 'True'|'False';
  totalResults: number;
  Search: Array<Movie>;
}
