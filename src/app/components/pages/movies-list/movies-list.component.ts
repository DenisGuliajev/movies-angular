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
  title = 'movies';
  movies: MovieShort[];
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
  ) {
    this.subscription = new Subscription();
    // request
    this.subscription.add(this.movieService.moviesList.subscribe(movies => this.movies = movies));
  }

  ngOnInit(): void {
  }

  ngOnDestroy
    : () => void
    = () => this.subscription.unsubscribe()
  loadMoreMovies
    : () => void
    = () => this.movieService.scrollDown()
}
