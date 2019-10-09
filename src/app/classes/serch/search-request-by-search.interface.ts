export interface SearchRequestBySearchInterface {
  s: string;
  type?: 'movie'|'series'|'episode';
  y?: string;
  r: 'json';
  page?: number;
  callback?: string;
  v?: 1;
}
