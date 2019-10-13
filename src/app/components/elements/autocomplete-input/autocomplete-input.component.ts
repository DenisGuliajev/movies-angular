import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription, Observable, BehaviorSubject} from 'rxjs';
import {MovieService} from 'src/app/services/movie/movie.service';
import {mergeMap, debounceTime, filter, tap, distinct, map, switchMap} from 'rxjs/operators';
import {SearchRequestBySearchInterface} from 'src/app/classes/serch/search-request-by-search.interface';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MovieShort} from 'src/app/classes/movies/movie.short';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit, OnDestroy {
  @Output() selectedOther: EventEmitter<string>;
  searchOptions: Observable<MovieShort[]>;
  searchControl: FormControl;
  searchString: SearchRequestBySearchInterface;
  private subscription: Subscription;
  private _searchOptions: BehaviorSubject<MovieShort[]>;

  constructor(
    private movieService: MovieService,
  ) {
    this._searchOptions = new BehaviorSubject([]);
    this.searchOptions = this._searchOptions.asObservable();
    this.selectedOther = new EventEmitter<string>();
    this.subscription = new Subscription();
    this.searchControl = new FormControl();
    this.subscription.add(this.searchControl.valueChanges.pipe(
      distinct(),
      debounceTime(1000),
      filter((nv) => {
        return nv.length > 1;
      }),
      switchMap((newVal: string) => this.movieService
        .preSearchByTitle({s: newVal})),
    ).subscribe(
      (newOptions) => {
        this._searchOptions.next(newOptions);
      },
      (error) => console.error(error)
    ));
    this.subscription.add(
      this.movieService.searchParams
        .subscribe((nv) => {
          return this.searchControl.setValue(nv.s);
        }));
    // this.subscription.add(this.searchControl.);
  }

  formSubmission(e: Event) {
    console.log('formSubmission this.searchControl.value', this.searchControl.value);
    console.log('formSubmission e  ', e);
    e.preventDefault();
    // this.movieService.newSearchByQuery$({s: e.})
    this.selectedOther.emit(this.searchControl.value);
  }

  updateSearchQueryName
    : (event: MatAutocompleteSelectedEvent) => void
    = (event) => {
    console.log(event);
    // this.searchControl.setValue(event.option.value);
    // this.movieService.newSearchByTitle$({s: event.option.value}).subscribe(() => 0);
    // this.selectedOther.emit(this.searchControl.value);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._searchOptions.complete();
    this.subscription.unsubscribe();
  }
}
