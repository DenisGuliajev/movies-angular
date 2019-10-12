import { Injectable } from '@angular/core';
import { SearchRequestBySearchInterface } from 'src/app/classes/serch/search-request-by-search.interface';
import { MovieTypes } from 'src/app/classes/movie-types';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // object passed by reference, so do not overwrite it.
  // Only modify
  set searchParams(newVal: SearchRequestBySearchInterface) {
    for (const [key, value] of Object.entries(newVal)) {
      if (this._searchParams.hasOwnProperty(key)) {
        this._searchParams[key] = value;
      }
    }
  }
  get searchParams(): SearchRequestBySearchInterface {
    return this._searchParams;
  }

  private _searchParams: SearchRequestBySearchInterface = {
    s: 'green',
    type: MovieTypes.Movie,
    y: '2010',
    r: 'json',
    page: 0,
    v: 1
  };
  constructor() { }
}
