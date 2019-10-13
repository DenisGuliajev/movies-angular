import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {map, mergeMap} from 'rxjs/operators';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.url === AuthService.url) {
      return next.handle(req).pipe(
        mergeMap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse &&
            event.hasOwnProperty('body') &&
            event.body.hasOwnProperty('Response') &&
            event.body.Response === 'False') {
            console.log('event--->>>', event);
            return throwError(event);
          }
          return of(event);
        }));
    }
    return next.handle(req);
  }
}
