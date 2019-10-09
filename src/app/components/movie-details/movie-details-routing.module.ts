import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MovieDetailsComponent} from './movie-details.component';
import { MovieDetailResolverService } from 'src/app/services/movie/movie-detail-resolver.service';

const routes: Routes = [
  {
    path: ':id',
    component: MovieDetailsComponent,
    resolve: {
      movie: MovieDetailResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieDetailsRoutingModule {
}
