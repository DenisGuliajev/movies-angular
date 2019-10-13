import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { SearchRequestBySearchInterface } from 'src/app/classes/serch/search-request-by-search.interface';
import { MovieTypes } from 'src/app/classes/movie-types';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent {
  @Output() search: EventEmitter<SearchRequestBySearchInterface>;
  @Output() reset: EventEmitter<boolean>;
  @HostBinding('class.highlighted') public highlighted: boolean = true;
  movieTypes: typeof MovieTypes;
  years: string[];
  subscription: Subscription;
  searchQuery: SearchRequestBySearchInterface;
  constructor(
    private movieService: MovieService,
  ) {
    this.subscription = new Subscription();
    this.subscription.add(this.movieService.searchParams.subscribe((nv) => this.searchQuery = nv));
    this.movieTypes = MovieTypes;
    this.search = new EventEmitter<SearchRequestBySearchInterface>();
    this.reset = new EventEmitter<boolean>();
    let startYear = 1900;
    const currentYear = (new Date()).getUTCFullYear();
    this.years = [''];
    while (startYear <= currentYear) {
      this.years.push('' + (startYear++));
    }
    // create local copy
    console.log(this.years);
  }
  resetSearch() {
    this.reset.emit(true);
  }

  searchResults() {
    this.search.emit(this.searchQuery);
  }
}
