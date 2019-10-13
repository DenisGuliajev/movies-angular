import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription, Observable, BehaviorSubject} from 'rxjs';
import {MovieService} from 'src/app/services/movie/movie.service';
import {mergeMap, debounceTime, filter, tap} from 'rxjs/operators';
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
  autoCompleteForm: FormGroup;
  searchString: SearchRequestBySearchInterface;
  private subscription: Subscription;
  private _searchOptions: BehaviorSubject<MovieShort[]>;

  constructor(
    private movieService: MovieService,
  ) {
    this.selectedOther = new EventEmitter<string>();
    this.subscription = new Subscription();
    this.searchControl = new FormControl('');
    this.autoCompleteForm = new FormGroup({
      search: this.searchControl
    });
    this.subscription.add(
      this.movieService.searchParams
        .subscribe((nv) => this.autoCompleteForm.controls.search.setValue({search: nv.s})));
    // this.subscription.add(this.searchControl.);
    this._searchOptions = new BehaviorSubject([]);
    this.searchOptions = this._searchOptions.asObservable();
  }

  formSubmission(e: Event) {
    console.log('formSubmission this.searchControl.value', this.searchControl.value);
    console.log('formSubmission e  ', e);
    e.preventDefault();
    this.selectedOther.emit(this.searchControl.value);
  }

  updateSearchQueryName
    : (event: MatAutocompleteSelectedEvent) => void
    = (event) => {
    console.log(event);
    this.autoCompleteForm.controls.search.setValue({search: event.option.value.s});
    console.log('updateSearchQueryName this.searchControl.value', this.searchControl.value);
    // this.selectedOther.emit(this.searchControl.value);
  }

  ngOnInit() {
    this.subscription.add(this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      mergeMap((newVal: string) => this.movieService
        .preSearchByTitle({s: newVal})
        .pipe(
          filter((nv) => nv.length > 0),
          tap()
        )),
    ).subscribe(
      (newOptions) => {
        this._searchOptions.next(newOptions);

      },
      (error) => console.error(error)
    ));
  }

  ngOnDestroy(): void {
    this._searchOptions.complete();
    this.subscription.unsubscribe();
  }
}
