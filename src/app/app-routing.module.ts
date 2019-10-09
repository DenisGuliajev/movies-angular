import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {AppComponent} from './app.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies-list',
    pathMatch: 'full'
  },
  { path: 'movie-details', loadChildren: () => import('./components/movie-details/movie-details.module').then(m => m.MovieDetailsModule) },
  { path: 'movies-list', loadChildren: () => import('./components/movies-list/movies-list.module').then(m => m.MoviesListModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        // enableTracing: true,  <-- debugging purposes only
        // preloadingStrategy: PreloadAllModules
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
