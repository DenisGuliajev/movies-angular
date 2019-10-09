import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesListRoutingModule } from './movies-list-routing.module';
import { MoviesListComponent } from './movies-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { CustomDirectivesModule } from 'src/app/directives/custom-directives.module';


@NgModule({
  declarations: [
    MoviesListComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    CustomDirectivesModule,
    MoviesListRoutingModule,
  ]
})
export class MoviesListModule { }
