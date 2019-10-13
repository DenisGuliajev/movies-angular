import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MovieService } from './services/movie/movie.service';
import { SearchRequestBySearchInterface } from './classes/serch/search-request-by-search.interface';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  searchParameters: Observable<SearchRequestBySearchInterface>;
  subscription: Subscription;
  constructor(
    fb: FormBuilder,
    private movieService: MovieService,
  ) {
    this.subscription = new Subscription();
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.searchParameters = this.movieService.searchParams;
  }

  title = 'movies';
  options: FormGroup;
  panelOpenState = true;

  changePanelOpenState() {
    this.panelOpenState = !this.panelOpenState;
  }
  searchAnotherQuery(newQuery) {
    console.log('searchAnotherQuery(newQuery): ', newQuery);
    this.subscription
      .add(this.movieService.newSearchByQuery$(newQuery)
        .subscribe(() => console.log('Updated from newSearchByQuery$')));
  }
  searchAnotherName(newName) {
    console.log('searchAnotherName(newName): ', newName);
    this.subscription
      .add(this.movieService.newSearchByTitle$({s: newName})
        .subscribe(() => console.log('Updated from newSearchByTitle$')));
  }
  resetParameters() {
    this.movieService.resetParams();
  }
  loadMoreMovies
    : () => void
    = () => this.movieService.scrollDown()
}
