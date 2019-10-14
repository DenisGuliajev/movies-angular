import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiAuthInterceptor } from './api-auth-interceptor';
import { ApiErrorInterceptor } from './api-error-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiAuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
];
