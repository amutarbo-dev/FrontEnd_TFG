import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@services/local-storage.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getItem('token');

    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });

      return next.handle(clonedRequest);
    }

    const clonedRequest = request.clone({
      setHeaders: {},
    });

    return next.handle(clonedRequest);
  }
}
