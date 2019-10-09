import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static get url(): string {
    return this._url;
  }
  static get token(): string {
    return this._token;
  }
  private static _token = '236f6cc5';
  private static _url = 'http://www.omdbapi.com/';

  constructor() { }
}
