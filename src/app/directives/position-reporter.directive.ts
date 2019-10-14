import {Directive, ElementRef, OnDestroy, OnInit, EventEmitter, Output} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appPositionReporter]',
})
export class PositionReporterDirective implements OnInit, OnDestroy {
  get domRect(): DOMRect {
    return this._domRect;
  }

  set domRect(value: DOMRect) {
    this._domRect = value;
  }
  constructor(
    el: ElementRef,
  ) {
    this.subscription = new Subscription();
    this.loadMore = new EventEmitter<boolean>();
    this.wrapper = el.nativeElement;
    // @ts-ignore
    this._domRect = this.wrapper.getBoundingClientRect();
  }

  private static events: string[] = [
    'scroll',
    'touchmove',
    'resize'
  ];
  subscription: Subscription;
  @Output() loadMore: EventEmitter<boolean>;
  private _domRect: DOMRect;
  private wrapper: HTMLElement;
  private lastImDbId = '';

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    /*this.subscription.add(fromEvent(window, 'scroll touchmove resize')
      .pipe(throttleTime(1000)).subscribe((e) => this.recalculate(e)));*/
    /*const evnts: Event[] = [];
    PositionReporterDirective.events.forEach(evName =>
      this.subscription.add(fromEvent(window, evName)
        .pipe(throttleTime(1000)).subscribe((e) => this.recalculate(e))));*/
    PositionReporterDirective.events.forEach(evName =>
      this.subscription.add(fromEvent(window, evName)
        .pipe(throttleTime(1000)).subscribe((e) => this.recalculate())));
  }

  // if we have more than 2 cols height left from the bottom - fire loadMore emitter
  recalculate = (): void => {
    switch (true) {
      case !this.wrapper.hasChildNodes() || this.wrapper.childNodes.length === 0:
        this.loadMore.emit(true);
        break;
      case (
        this.wrapper.hasChildNodes() &&
        this.wrapper.childNodes.length > 1
      ):
        const lastNode: HTMLElement =
          this.wrapper.childNodes[
          this.wrapper.childNodes.length - 1
            ] as HTMLElement;
        // if (lastNode.attributes.getNamedItem('imdb-id').value !== this.lastImDbId) {
        //   break;
        // }
        // this.lastImDbId = lastNode.attributes.getNamedItem('imdb-id').value;
        // @ts-ignore
        this.domRect = this.wrapper.getBoundingClientRect();
        const lastNodeRect = lastNode.getBoundingClientRect();
        const lastNodeHeight = lastNodeRect.bottom - lastNodeRect.top;
        if ((window.scrollY + window.innerHeight) >
          lastNodeRect.top + (window.pageYOffset || document.documentElement.scrollTop) - lastNodeHeight) {
          this.lastImDbId = lastNode.dataset.imdbId;
          this.loadMore.emit(true);
        }
        break;
      default:
        break;
    }
  }
}
