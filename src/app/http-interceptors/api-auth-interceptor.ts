import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

/** Add api key parameter to api url requests. */
@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.url === AuthService.url) {
      return next.handle(req.clone({params: req.params.append('apikey', AuthService.token)}));
    }
    return next.handle(req);
  }
}
