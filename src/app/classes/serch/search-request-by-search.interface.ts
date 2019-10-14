import { MovieTypes } from '../movie-types';

export interface SearchRequestBySearchInterface {
  s: string;
  type?: MovieTypes;
  y?: string;
  r?: 'json'|'';
  page?: number;
  callback?: string;
  v?: 1;
}
