import { Movie } from '../movies/movie';
import { SearchResponseInterface } from './search-response.interface';

export class SearchResponseFull implements SearchResponseInterface {
  Response: boolean;
  totalResults: number;
  Search: Array<Movie>;
}
