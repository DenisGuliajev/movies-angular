import { NgModule } from '@angular/core';
import { PositionReporterDirective } from './position-reporter.directive';
import { MoviePosterDirective } from './movie-poster.directive';
import { WindowWidthObservableDirective } from './window-width-observable.directive';



@NgModule({
  declarations: [
    PositionReporterDirective,
    MoviePosterDirective,
    WindowWidthObservableDirective,
  ],
  exports: [
    PositionReporterDirective,
    WindowWidthObservableDirective
  ]
})
export class CustomDirectivesModule { }
