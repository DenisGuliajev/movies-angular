import { Component, OnInit, Input } from '@angular/core';
import { MovieShort } from 'src/app/classes/movies/movie.short';

@Component({
  selector: 'app-movie-grid-tile',
  templateUrl: './movie-grid-tile.component.html',
  styleUrls: ['./movie-grid-tile.component.scss']
})
export class MovieGridTileComponent implements OnInit {
  @Input() movie: MovieShort;
  // tslint:disable-next-line:no-input-rename

  _movie: MovieShort;
  constructor() { }

  ngOnInit() {
    this._movie = this.movie;
  }

}
