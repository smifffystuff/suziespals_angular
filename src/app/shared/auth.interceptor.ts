import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInerceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getToken().pipe(
      mergeMap((token: string) => {
        const modifiedReq = token
          ? req.clone({
              headers: req.headers.set('Authorization', token)
            })
          : req.clone();
        return next.handle(modifiedReq);
      })
    );
  }

  getToken(): Observable<string> {
    return from(this.authService.getToken());
  }
}
