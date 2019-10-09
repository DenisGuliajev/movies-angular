import { TestBed } from '@angular/core/testing';

import { MovieDetailResolverService } from './movie-detail-resolver.service';

describe('Movie.Detail.ResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieDetailResolverService = TestBed.get(MovieDetailResolverService);
    expect(service).toBeTruthy();
  });
});
