import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Movie } from 'src/app/classes/movies/movie';
import { Observable } from 'rxjs';
import { MovieService } from './movie.service';
import { mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailResolverService implements Resolve<Movie> {

  constructor(
    private movieService: MovieService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie> {
    const id = route.paramMap.get('id');
    return this.movieService.getById(id);
  }
}
