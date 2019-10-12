import { Component, OnInit } from '@angular/core';
import { SearchRequestBySearchInterface } from 'src/app/classes/serch/search-request-by-search.interface';
import { SearchService } from 'src/app/services/movie/search.service';
import { MovieTypes } from 'src/app/classes/movie-types';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent {
  searchQuery: SearchRequestBySearchInterface;
  movieTypes: typeof MovieTypes;
  years: string[];
  constructor(
    private searchService: SearchService,
  ) {
    this.movieTypes = MovieTypes;
    let startYear = 1900;
    const currentYear = (new Date()).getUTCFullYear();
    this.years = [];
    while (startYear <= currentYear) {
      this.years.push('' + (startYear++));
    }
    this.searchQuery = this.searchService.searchParams;
    console.log(this.searchQuery);
    console.log(this.years);
  }
  search
  : () => void
  = () => {}
  reset
  : () => void
  = () => this.searchService.searchParams = {
      s: 'green',
      type: MovieTypes.Movie,
      y: '2010',
      r: 'json',
      page: 0,
      v: 1
    }
}
