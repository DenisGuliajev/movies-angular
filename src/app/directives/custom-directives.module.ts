import { NgModule } from '@angular/core';
import { PositionReporterDirective } from './position-reporter.directive';



@NgModule({
  declarations: [
    PositionReporterDirective
  ],
  exports: [
    PositionReporterDirective
  ]
})
export class CustomDirectivesModule { }
