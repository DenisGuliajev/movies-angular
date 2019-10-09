import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Movie} from 'src/app/classes/movies/movie';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
  ) {
  }

  subscription: Subscription;
  movie: Movie;

  ngOnDestroy(): void {
    // cleanup
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(
      ((data: { movie: Movie }) => this.movie = data.movie)
    );
  }

}
