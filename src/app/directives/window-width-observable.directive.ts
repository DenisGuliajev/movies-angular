import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, throttleTime} from 'rxjs/operators';

@Directive({
  selector: '[appWindowWidthObservable]'
})
export class WindowWidthObservableDirective {
  constructor(
    el: ElementRef,
  ) {
    this.newValue = new EventEmitter<number>();
    this.subscription = new Subscription();
    WindowWidthObservableDirective.events.forEach(evName =>
      this.subscription.add(fromEvent(window, evName)
        .pipe(debounceTime(100)).subscribe((e) => this.newValue.emit(window.screen.width))));
  }

  private static events: string[] = [
    'scroll',
    'touchmove',
    'resize'
  ];

  @Output() newValue: EventEmitter<number>;
  subscription: Subscription;
}
