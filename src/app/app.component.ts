import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MovieService } from './services/movie/movie.service';
import { SearchRequestBySearchInterface } from './classes/serch/search-request-by-search.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  searchParameters: SearchRequestBySearchInterface;
  subscription: Subscription;
  constructor(
    fb: FormBuilder,
    private movieService: MovieService,
  ) {
    this.subscription = new Subscription();
    this.subscription.add(this.movieService.searchParams.subscribe((nv) => this.searchParameters = nv));
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  title = 'movies';
  options: FormGroup;
  panelOpenState = false;

  changePanelOpenState() {
    this.panelOpenState = !this.panelOpenState;
  }
  searchAnotherQuery(newQuery) {
    console.log('searchAnotherQuery(newQuery): ', newQuery);
    this.subscription
      .add(this.movieService.newSearchByQuery$(newQuery)
        .subscribe(() => console.log('Updated from newSearchByQuery$')));
  }
  searchByTitle(newName) {
    this.subscription
      .add(this.movieService.newSearchByTitle$({s: newName})
        .subscribe(() => console.log('Updated from newSearchByTitle$')));
  }
  resetParameters() {
    this.movieService.resetParams();
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
