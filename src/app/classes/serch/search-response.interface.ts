import { MovieShort } from '../movies/movie.short';

export interface SearchResponseInterface {
  Response: 'True'|'False';
  totalResults: number;
  Search: Array<MovieShort>;
}
