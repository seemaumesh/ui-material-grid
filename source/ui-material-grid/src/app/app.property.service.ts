import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {Property} from './Property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  baseUrl = 'some/';

  constructor(private http: HttpClient) {

  }

  get(url): Observable<Property[]> {
    const entireUrl = this.baseUrl.concat(url);
    return this.http.get<Property[]>(entireUrl).pipe(
      tap(response => this.refreshToken(response)),
      catchError(this.handleError()));
  }

  refreshToken(res: any) {
    console.log(res);
  }

  private handleError() {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure

      if (error instanceof HttpErrorResponse) {
        console.group(`API Error: (${error.status}) ${error.statusText}`);
        console.log(`At url: ${error.url}`);
        console.log(error);
        console.groupEnd();

        // Strongly type the error object to the standard ApiErrorResponse if possible
        if (error.error != null) {
          // Throw the ApiErrorResponse so it can be handled in other catches/subscribes
          throw Object.assign(error.error);
        }
      }

      // Rethrow the error so it can be handled in other catches/subscribes
      console.error(error);
      throw error;
    };
  }
}
