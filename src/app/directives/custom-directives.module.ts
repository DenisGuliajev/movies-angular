import { NgModule } from '@angular/core';
import { PositionReporterDirective } from './position-reporter.directive';
import { MoviePosterDirective } from './movie-poster.directive';



@NgModule({
  declarations: [
    PositionReporterDirective,
    MoviePosterDirective,
  ],
  exports: [
    PositionReporterDirective
  ]
})
export class CustomDirectivesModule { }
