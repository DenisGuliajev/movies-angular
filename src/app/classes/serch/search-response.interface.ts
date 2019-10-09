import { MovieShort } from '../movies/movie.short';

export interface SearchResponseInterface {
  Response: boolean;
  totalResults: number;
  Search: Array<MovieShort>;
}
