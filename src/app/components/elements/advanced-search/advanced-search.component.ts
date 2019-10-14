import { Component, Output, EventEmitter} from '@angular/core';
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
  @Output() resetForm: EventEmitter<boolean>;
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
    this.resetForm = new EventEmitter<boolean>();
    let startYear = 1900;
    const currentYear = (new Date()).getUTCFullYear();
    this.years = [''];
    while (startYear <= currentYear) {
      this.years.push('' + (startYear++));
    }
  }
  resetSearch() {
    this.resetForm.emit(true);
  }

  searchResults() {
    this.search.emit(this.searchQuery);
  }
}
