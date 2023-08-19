import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  urlProducts = `${environment.backUrl}/product`;
  constructor(private http: HttpClient) {}

  getProducts(limit: number, skip: number, query?: any) {
    let params = new HttpParams().set('limit', limit).set('skip', skip);

    if (query && query?.name !== '') {
      params = params.set('name', query.name);
    }

    if (query && query?.allergens_tags.length > 0) {
      params = params.set('allergens_tags', query.allergens_tags.join());
    }

    return this.http
      .get<any>(this.urlProducts, { params })
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
