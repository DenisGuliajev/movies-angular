import {Rating} from '../rating';
import { MovieShort } from './movie.short';
import { MovieTypes } from '../movie-types';

export class Movie extends MovieShort {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: Array<Rating>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    Type: MovieTypes;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}
