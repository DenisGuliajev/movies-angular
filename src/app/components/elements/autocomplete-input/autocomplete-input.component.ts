import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription, Observable, BehaviorSubject} from 'rxjs';
import {MovieService} from 'src/app/services/movie/movie.service';
import {mergeMap, debounceTime, filter} from 'rxjs/operators';
import { SearchRequestBySearchInterface } from 'src/app/classes/serch/search-request-by-search.interface';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit, OnDestroy {
  @Input() searchString: SearchRequestBySearchInterface;
  @Output() selectedOther: EventEmitter<string>;
  searchOptions: Observable<string[]>;
  searchControl: FormControl;
  autoCompleteForm: FormGroup;
  private subscription: Subscription;
  private _searchOptions: BehaviorSubject<string[]>;

  constructor(
    private movieService: MovieService,
  ) {
    this.selectedOther = new EventEmitter<string>();
    this.subscription = new Subscription();
    this._searchOptions = new BehaviorSubject([]);
    this.searchOptions = this._searchOptions.asObservable();
  }
  formSubmission() {
    console.log('autoCompleteForm this.searchControl.value', this.searchControl.value);
    console.log('autoCompleteForm  ', this.autoCompleteForm);
    this.selectedOther.emit(this.searchControl.value);
  }
  updateSearchQueryName
    : (inp) => void
    = (inp) => {
    console.log(inp);
    console.log('updateSearchQueryName this.searchControl.value', this.searchControl.value);
    this.selectedOther.emit(this.searchControl.value);
  }

  ngOnInit() {
    this.searchControl = new FormControl(this.searchString.s);
    this.autoCompleteForm = new FormGroup({
      search: this.searchControl
    });
    this.subscription.add(this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      mergeMap((newVal: string) => this.movieService
        .preSearchByTitle({s: newVal})),
      filter((nv) => nv.length > 0)
    ).subscribe(
      (newOptions) => this._searchOptions.next(newOptions),
      (error) => console.error(error)
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this._searchOptions.complete();
  }
}
