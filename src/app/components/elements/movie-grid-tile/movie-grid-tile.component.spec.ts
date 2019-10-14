import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGridTileComponent } from './movie-grid-tile.component';

describe('MovieGridTileComponent', () => {
  let component: MovieGridTileComponent;
  let fixture: ComponentFixture<MovieGridTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieGridTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieGridTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
