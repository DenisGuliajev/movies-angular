import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [MovieDetailsComponent],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class MovieDetailsModule { }
