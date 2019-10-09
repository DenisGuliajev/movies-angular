import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { MovieShort } from 'src/app/classes/movies/movie.short';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Subscription } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  @HostBinding('class.container') row1 = true;
  title = 'movies';
  movies: MovieShort[];
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MovieService,
  ) {
    this.subscription = new Subscription();
    // request
    this.subscription.add(this.moviesService.moviesList.subscribe(movies => this.movies = movies));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  loadMoreMovies = () => {
    this.subscription.add(this.moviesService.nextPage().pipe(mapTo(true)).subscribe(gotIt => console.log('resolved')));

  }

}
