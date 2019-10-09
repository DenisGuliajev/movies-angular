import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {mergeMap, mapTo} from 'rxjs/operators';
import {MovieShort} from 'src/app/classes/movies/movie.short';
import {SearchResponseShort} from 'src/app/classes/serch/search-response-short';
import {Movie} from 'src/app/classes/movies/movie';
import { SearchRequestBySearchInterface } from 'src/app/classes/serch/search-request-by-search.interface';


let cnt = 0;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  get moviesList(): Observable<Array<MovieShort>> {
    console.log(this._moviesList);
    if (this._moviesList.getValue().length === 0) {
      return this.init().pipe(
        mergeMap((movies) => {
          this._moviesList.next(movies.Search);
          return this._moviesList.asObservable();
        })
      );
    }
    return this._moviesList.asObservable();
  }

  private static apiUrl = 'http://www.omdbapi.com/';
  private static posterUrl = 'http://img.omdbapi.com/';
  private static searchParams: SearchRequestBySearchInterface = {
    s: 'green',
    type: 'movie',
    y: '2010',
    r: 'json',
    page: 0,
    v: 1
  };
  // tslint:disable-next-line:variable-name
  private _moviesList: BehaviorSubject<Array<MovieShort>>;
  getCnt = () => cnt;

  constructor(
    private http: HttpClient
  ) {
    cnt++;
    console.log('cnt ', cnt);
    this._moviesList = new BehaviorSubject<Array<MovieShort>>([]);
  }
  // increment page by 1 and return SearchResponse
  nextPage
  : () => Observable<SearchResponseShort>
  = () => {
    MovieService.searchParams.page += 1;
    let newParams = new HttpParams();
    for (const [key, value] of Object.entries(MovieService.searchParams)) {
      newParams = newParams.set(key, value);
    }
    return this.http.get<SearchResponseShort>(MovieService.apiUrl, {
      params: newParams
    }).pipe(
      mergeMap((movies) => {
        this._moviesList.next(this._moviesList.getValue().concat(movies.Search));
        return of(movies);
      })
    );
  }
  init
    : () => Observable<SearchResponseShort>
    = () => {
    MovieService.searchParams.page += 1;
    let newParams = new HttpParams();
    for (const [key, value] of Object.entries(MovieService.searchParams)) {
      newParams = newParams.set(key, value);
    }
    return this.http.get<SearchResponseShort>(MovieService.apiUrl, {
      params: newParams
    });
  }
  // reset static searchParams and pipe from next page
  searchMore
    : (searchParameters: SearchRequestBySearchInterface) => Observable<boolean>
    = (searchParameters) => {
    for (const [key, value] of Object.entries(searchParameters)) {
      MovieService.searchParams[key] = value;
    }
    return this.nextPage().pipe(
      mapTo(true)
    );
  }


  getById
    : (id: string) => Observable<Movie>
    = (id) => this.http.get<Movie>(MovieService.apiUrl, {params: new HttpParams().set('i', id).set('plot', 'full')})
}
