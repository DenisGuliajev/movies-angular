import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subscription, pipe, merge} from 'rxjs';
import {mergeMap, mapTo, map, catchError, tap} from 'rxjs/operators';
import {MovieShort} from 'src/app/classes/movies/movie.short';
import {SearchResponseShort} from 'src/app/classes/serch/search-response-short';
import {Movie} from 'src/app/classes/movies/movie';
import {SearchRequestBySearchInterface} from 'src/app/classes/serch/search-request-by-search.interface';
import { MovieTypes } from 'src/app/classes/movie-types';


let cnt = 0;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // object passed by reference, so do not overwrite it.
  // Only modify
  /*set searchParams(newVal: SearchRequestBySearchInterface) {
    for (const [key, value] of Object.entries(newVal)) {
      if (this._searchParams.hasOwnProperty(key)) {
        this._searchParams[key] = value;
      }
    }
  }*/
  get searchParams(): Observable<SearchRequestBySearchInterface> {
    return this._searchParams.asObservable();
  }
  get moviesList(): Observable<Array<MovieShort>> {
    console.log(this._moviesList);
    if (this._moviesList.getValue().length === 0) {
      return this.nextPage()
        .pipe(
          mergeMap((movies) => this._moviesList.asObservable()
          )
        );
    }
    return this._moviesList.asObservable();
  }

  constructor(
    private http: HttpClient,
  ) {
    cnt++;
    console.log('cnt ', cnt);
    this.resetParams();
    this._moviesList = new BehaviorSubject<Array<MovieShort>>([]);
  }

  private static apiUrl = 'http://www.omdbapi.com/';
  private static posterUrl = 'http://img.omdbapi.com/';
  private _searchParams
    : BehaviorSubject<SearchRequestBySearchInterface>
    = new BehaviorSubject({
    s: 'green',
    type: MovieTypes.Movie,
    y: '',
    r: '',
    page: 0,
    v: 1
  });
  // private searchParams: SearchRequestBySearchInterface;
  // tslint:disable-next-line:variable-name
  private _moviesList: BehaviorSubject<Array<MovieShort>>;
  private static defaultSearch
    : () => SearchRequestBySearchInterface
    = () => {
    return {
      s: 'green',
      type: MovieTypes.Any,
      y: '',
      r: '',
      page: 0,
      v: 1
    };
  }
  resetParams
    : () => void
    = () => {
    this._searchParams.next({
      s: 'green',
      type: MovieTypes.Any,
      y: '',
      r: '',
      page: 0,
      v: 1
    });
  }

  // increment page by 1 and return SearchResponse
  nextPage
    : () => Observable<SearchResponseShort>
    = () => {
    this._searchParams.getValue().page += 1;
    return this.http.get<SearchResponseShort>(MovieService.apiUrl, {
      params: this.getHttpParams(this._searchParams.getValue())
    }).pipe(
      mergeMap((movies) => {
        this._moviesList.next(this._moviesList.getValue().concat(movies.Search));
        return of(movies);
      }),
      catchError(
        (err) => {
          this._searchParams.getValue().page -= 1;
          const flatError: SearchResponseShort = {
            Response: 'False',
            totalResults: 0,
            Search: []
          };
          return of(flatError);
        })
    );
  }

  scrollDown
    : () => void
    = () => {
    const tmpSubscription = new Subscription();
    tmpSubscription.add(this.nextPage().subscribe(() => tmpSubscription.unsubscribe()));
  }

  newSearchByTitle$
    : (req: SearchRequestBySearchInterface) => Observable<Array<MovieShort>>
    = (req) => {
    const tmp = MovieService.defaultSearch();
    for (const [key, value] of Object.entries(tmp)) {
      // strip empty values
      if (req.hasOwnProperty(key) && req[key] !== '') {
        tmp[key] = req[key];
      }
    }
    tmp.page = 1;
    return this.http.get<SearchResponseShort>(MovieService.apiUrl, {
      params: this.getHttpParams(tmp)
    }).pipe(
      mergeMap((res: SearchResponseShort) => {
        this._searchParams.next(tmp);
        this._moviesList.next(res.Search);
        return of(res.Search);
      }),
      catchError((err) => {
        const _tmp: MovieShort[] = [];
        return of(_tmp);
      })
    );
  }
  newSearchByQuery$
    : (req: SearchRequestBySearchInterface) => Observable<Array<MovieShort>>
    = (req) => {
    const tmp = MovieService.defaultSearch();
    for (const [key, value] of Object.entries(tmp)) {
      // strip empty values
      if (req.hasOwnProperty(key) && req[key] !== '') {
        tmp[key] = req[key];
      }
    }
    tmp.page = 1;
    return this.http.get<SearchResponseShort>(MovieService.apiUrl, {
      params: this.getHttpParams(tmp)
    }).pipe(
      mergeMap((res: SearchResponseShort) => {
        this._searchParams.next(tmp);
        this._moviesList.next(res.Search);
        return of(res.Search);
      }),
      catchError((err) => of([]))
    );
  }

  preSearchByTitle
    : (req: SearchRequestBySearchInterface) => Observable<MovieShort[]>
    = (req) => this.http.get<SearchResponseShort>(MovieService.apiUrl, {
    params: this.getHttpParams(req)
  }).pipe(
    mergeMap((resp) => of(resp.Search)),
    catchError((err) => of([]))
  )

  getHttpParams
    : (params: SearchRequestBySearchInterface) => HttpParams
    = (searchParams) => {
    let newParams = new HttpParams();
    for (const [key, value] of Object.entries(searchParams)) {
      // strip empty values
      if (value !== '') {
        newParams = newParams.set(key, value);
      }
    }
    return newParams;
  }

  getById
    : (id: string) => Observable<Movie>
    = (id) => this.http.get<Movie>(MovieService.apiUrl, {params: new HttpParams().set('i', id).set('plot', 'full')})
}
