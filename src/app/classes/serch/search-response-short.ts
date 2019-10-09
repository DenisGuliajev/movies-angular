import { MovieShort } from '../movies/movie.short';
import { SearchResponseInterface } from './search-response.interface';

export class SearchResponseShort implements SearchResponseInterface {
  Response: boolean;
  totalResults: number;
  Search: Array<MovieShort>;
}
